# API Gateway
resource "aws_api_gateway_rest_api" "api" {
  name        = "${var.project_name}-${var.env}-api"
  description = "API Gateway for ${var.project_name}-${var.env}"

  body = data.template_file.api.rendered

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

data "template_file" "api" {
  template = file("${path.module}/api.yml")
  vars = {
    auth_scope            = aws_cognito_resource_server.resource.scope_identifiers[0]
    user_lambda           = "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/${aws_lambda_function.user_lambda.arn}/invocations"
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

data "aws_iam_policy_document" "api_policy_document" {
  statement {
    effect = "Allow"

    principals {
      type        = "*"
      identifiers = ["*"]
    }

    actions   = ["execute-api:Invoke"]
    resources = ["${aws_api_gateway_rest_api.api.execution_arn}/*"]
  }
}

resource "aws_api_gateway_rest_api_policy" "api_policy" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  policy      = data.aws_iam_policy_document.api_policy_document.json
}

resource "aws_api_gateway_authorizer" "cognito_auth" {
  name          = "${var.project_name}-${var.env}-authorizer"
  rest_api_id   = aws_api_gateway_rest_api.api.id
  type          = "COGNITO_USER_POOLS"
  provider_arns = [aws_cognito_user_pool.default_pool.arn]
  identity_source = "method.request.header.Authorization"
}