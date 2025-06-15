data "aws_apigatewayv2_api" "this" {
  api_id = var.api_id
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id                 = var.api_id
  integration_type       = "AWS_PROXY"
  integration_uri        = var.lambda_invoke_arn
  integration_method     = "POST"
  payload_format_version = "2.0"
}

locals {
  expanded_routes = flatten([
    for r in var.routes : [
      for m in r.methods : {
        method = m
        path   = r.path
      }
    ]
  ])
}

resource "aws_apigatewayv2_route" "lambda_routes" {
  for_each = {
    for r in local.expanded_routes :
    "${r.method} ${r.path}" => r
  }

  api_id    = var.api_id
  route_key = each.key
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"

  authorizer_id = var.authorizer_id
  authorization_type = "JWT"
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke-${replace(var.lambda_function_name, ":", "-")}"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_function_name
  principal     = "apigateway.amazonaws.com"
  source_arn = "${data.aws_apigatewayv2_api.this.execution_arn}/*/*"
}
