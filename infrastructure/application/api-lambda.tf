data "aws_s3_object" "user_lambda" {
  bucket = var.s3_bucket
  key    = "lambdas/${var.lambda_configs["user-lambda"].filename}"
}

resource "aws_lambda_function" "user_lambda" {
  s3_bucket        = data.aws_s3_object.user_lambda.bucket
  s3_key           = data.aws_s3_object.user_lambda.key
  function_name    = var.lambda_configs["user-lambda"].function_name
  role             = aws_iam_role.user_lambda_assume_role.arn
  source_code_hash = data.aws_s3_object.user_lambda.etag

  handler = "index.handler"
  runtime = "nodejs20.x"

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.users.name
    }
  }
}

