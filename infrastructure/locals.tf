locals {
  lambdas = {
    "auth-lambda" = {
      filename      = "auth-lambda.zip"
      function_name = "auth-lambda"
    }
  }
}