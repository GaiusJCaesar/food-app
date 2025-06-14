module "users_routes" {
  source = "../modules/api_lambda_integration"

  api_id               = aws_apigatewayv2_api.shared_api.id
  lambda_function_name = aws_lambda_function.user_lambda.function_name
  lambda_invoke_arn    = aws_lambda_function.user_lambda.invoke_arn

  routes = [
    {
      path    = "/users"
      methods = ["POST"]  # Single POST method on /users path
    },
    {
      path    = "/users/{id}"
      methods = ["GET", "PUT", "DELETE"]  # Multiple methods on /users/{id}
    }
  ]
}