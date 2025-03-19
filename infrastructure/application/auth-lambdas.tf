resource "aws_lambda_function" "auth_lambda" {
  filename      = var.lambda_configs["auth-lambda"].filename
  function_name = var.lambda_configs["auth-lambda"].function_name
  role          = aws_iam_role.auth_lambda_assume_role.arn
  handler       = "index.js"
  runtime       = "nodejs20.x"
}

resource "aws_lambda_event_source_mapping" "auth_lambda" {
  event_source_arn = aws_cognito_user_pool.default_pool.arn
  function_name    = aws_lambda_function.auth_lambda.arn
}

resource "aws_lambda_permission" "auth_lambda" {
  statement_id  = "AllowExecutionFromCognito"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.auth_lambda.function_name
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = aws_cognito_user_pool.default_pool.arn
  depends_on    = [aws_lambda_function.auth_lambda]
}