resource "aws_apigatewayv2_api" "shared_api" {
  name          = "${var.project_name}-${var.env}-api"
  description   = "API Gateway for ${var.project_name}-${var.env}"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "POST", "OPTIONS", "PUT", "DELETE"]
    allow_headers = ["Content-Type", "Authorization"]
  }
}

resource "aws_apigatewayv2_authorizer" "cognito" {
  name             = "${var.project_name}-${var.env}-authorizer"
  api_id           = aws_apigatewayv2_api.shared_api.id
  authorizer_type  = "JWT"
  identity_sources = ["$request.header.Authorization"]

  jwt_configuration {
    audience = [aws_cognito_user_pool_client.userpool_client.id]
    issuer   = "https://cognito-idp.${var.region}.amazonaws.com/${aws_cognito_user_pool.default_pool.id}"
  }
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.shared_api.id
  name        = "$default"
  auto_deploy = true
}

output "api_url" {
  value = aws_apigatewayv2_api.shared_api.api_endpoint
}