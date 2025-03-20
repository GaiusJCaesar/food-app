# API Gateway
resource "aws_api_gateway_rest_api" "api" {
  name        = "${var.project_name}-${var.env}-api"
  description = "API Gateway for ${var.project_name}-${var.env}"

  body = templatefile("${path.root}/openapi.yml", {
    auth_scope            = ""
    user_lambda           = ""
    cognito_user_pool_arn = ""
  })

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

data "template_file" "api" {
  template = file("${path.root}/api.yml")
  vars = {
    auth_scope            = aws_cognito_resource_server.resource.scope_identifiers
    user_lambda           = aws_lambda_function.user_lambda.arn
    cognito_user_pool_arn = aws_cognito_user_pool.default_pool.arn
  }
}

resource "aws_api_gateway_deployment" "env" {
  rest_api_id = aws_api_gateway_rest_api.api.id

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.api.body))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "env" {
  deployment_id = aws_api_gateway_deployment.env.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
  stage_name    = var.env
}