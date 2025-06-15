data "aws_s3_object" "user_lambda" {
  bucket = var.s3_bucket
  key    = "lambdas/${var.lambda_configs["user-lambda"].filename}"
}

data "aws_s3_object" "account_lambda" {
  bucket = var.s3_bucket
  key    = "lambdas/${var.lambda_configs["account-lambda"].filename}"
}

data "aws_s3_object" "meal_lambda" {
  bucket = var.s3_bucket
  key    = "lambdas/${var.lambda_configs["meal-lambda"].filename}"
}