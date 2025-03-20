data "aws_iam_policy_document" "auth_lambda_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole", "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:UpdateItem"]

          resources = ["*"]
  }
}

resource "aws_iam_role" "auth_lambda_assume_role" {
  name               = "auth_lambda_assume_role"
  assume_role_policy = data.aws_iam_policy_document.auth_lambda_assume_role.json
}

resource "aws_iam_role_policy_attachment" "auth_lambda_logs" {
  role       = aws_iam_role.auth_lambda_assume_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}