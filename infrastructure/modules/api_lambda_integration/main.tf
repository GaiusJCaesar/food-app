resource "aws_apigatewayv2_integration" "lambda" {
  api_id                 = var.api_id
  integration_type       = "AWS_PROXY"
  integration_uri        = var.lambda_invoke_arn
  integration_method     = "POST"
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "lambda_routes" {
  for_each = {
    for r in var.routes :
    "${r.path}::${join(",", r.methods)}" => r
  }

  api_id    = var.api_id
  route_key = "${join(",", each.value.methods)} ${each.value.path}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke-${replace(var.lambda_function_name, ":", "-")}"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:*:*:${var.api_id}/*/*"
}
