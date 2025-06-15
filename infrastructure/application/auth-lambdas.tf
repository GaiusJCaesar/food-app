data "aws_s3_object" "auth_lambda" {
  bucket = var.s3_bucket
  key    = "lambdas/${var.lambda_configs["auth-lambda"].filename}"
}

resource "aws_lambda_function" "auth_lambda" {
  s3_bucket        = data.aws_s3_object.auth_lambda.bucket
  s3_key           = data.aws_s3_object.auth_lambda.key
  function_name    = var.lambda_configs["auth-lambda"].function_name
  role             = aws_iam_role.auth_lambda_assume_role.arn
  source_code_hash = data.aws_s3_object.auth_lambda.etag

  handler = "index.handler"
  runtime = "nodejs20.x"

  environment {
    variables = {
      ACCOUNTS_TABLE = aws_dynamodb_table.accounts.name
      USERS_TABLE    = aws_dynamodb_table.users.name
    }
  }
}

resource "aws_lambda_permission" "auth_lambda" {
  statement_id  = "AllowExecutionFromCognito"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.auth_lambda.function_name
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = aws_cognito_user_pool.default_pool.arn
}