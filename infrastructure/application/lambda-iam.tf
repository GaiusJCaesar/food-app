resource "aws_iam_role" "user_lambda_assume_role" {
  name               = "user_lambda_assume_role"
  assume_role_policy = data.aws_iam_policy_document.user_lambda_assume_role.json
}

data "aws_iam_policy_document" "user_lambda_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role_policy" "user_lambda_dynamo_policy" {
  name = "user_lambda_dynamo_policy"
  role = aws_iam_role.user_lambda_assume_role.id

  policy = data.aws_iam_policy_document.user_lambda_dynamo_policy.json
}

data "aws_iam_policy_document" "user_lambda_dynamo_policy" {
  statement {
    effect = "Allow"
    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:UpdateItem"
    ]
    resources = [aws_dynamodb_table.users.arn, aws_dynamodb_table.accounts.arn, aws_dynamodb_table.meals.arn, "${aws_dynamodb_table.meals.arn}/index/accountId-index", aws_dynamodb_table.plans.arn]
  }
}

resource "aws_iam_role_policy_attachment" "user_lambda_logs" {
  role       = aws_iam_role.user_lambda_assume_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# resource "aws_lambda_permission" "user_lambda" {
#   statement_id  = "AllowExecutionFromAPiGateway"
#   action        = "lambda:InvokeFunction"
#   function_name = aws_lambda_function.user_lambda.function_name
#   principal     = "apigateway.amazonaws.com"
#   source_arn    = "${aws_api_gateway_rest_api.api.execution_arn}/*/*"
# }