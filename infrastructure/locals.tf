locals {
  lambdas = {
    "auth-lambda" = {
      filename      = "auth-lambda.zip"
      function_name = "auth-lambda"
    }
    "user-lambda" = {
      filename      = "user-lambda.zip"
      function_name = "user-lambda"
    }
  }
}