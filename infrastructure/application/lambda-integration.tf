module "users_routes" {
  source = "../modules/api_lambda_integration"

  api_id               = aws_apigatewayv2_api.shared_api.id
  lambda_function_name = aws_lambda_function.user_lambda.function_name
  lambda_invoke_arn    = aws_lambda_function.user_lambda.invoke_arn
  authorizer_id        = aws_apigatewayv2_authorizer.cognito.id

  routes = [
    {
      path    = "/users"
      methods = ["POST"] # Single POST method on /users path
    },
    {
      path    = "/users/{id}"
      methods = ["GET", "PUT", "DELETE"] # Multiple methods on /users/{id}
    }
  ]
}

module "accounts_routes" {
  source = "../modules/api_lambda_integration"

  api_id               = aws_apigatewayv2_api.shared_api.id
  lambda_function_name = aws_lambda_function.account_lambda.function_name
  lambda_invoke_arn    = aws_lambda_function.account_lambda.invoke_arn
  authorizer_id        = aws_apigatewayv2_authorizer.cognito.id

  routes = [
    {
      path    = "/accounts"
      methods = ["POST"] # Single POST method on /accounts path
    },
    {
      path    = "/accounts/{id}"
      methods = ["GET", "PUT", "DELETE"] # Multiple methods on /accounts/{id}
    }
  ]
}

module "accounts_routes" {
  source = "../modules/api_lambda_integration"

  api_id               = aws_apigatewayv2_api.shared_api.id
  lambda_function_name = aws_lambda_function.meal_lambda.function_name
  lambda_invoke_arn    = aws_lambda_function.meal_lambda.invoke_arn
  authorizer_id        = aws_apigatewayv2_authorizer.cognito.id

  routes = [
    {
      path    = "/meals"
      methods = ["POST"] # Single POST method on /meals path
    },
    {
      path    = "/meals/{id}"
      methods = ["GET", "PUT", "DELETE"] # Multiple methods on /meals/{id}
    }
  ]
}