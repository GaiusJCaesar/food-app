data "aws_s3_object" "user_lambda" {
  bucket = var.s3_bucket
  key    = "lambdas/${var.lambda_configs["user-lambda"].filename}"
}