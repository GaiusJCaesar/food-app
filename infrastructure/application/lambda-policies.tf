data "aws_iam_policy_document" "auth_lambda_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "auth_lambda_assume_role" {
  name               = "auth_lambda_assume_role"
  assume_role_policy = data.aws_iam_policy_document.auth_lambda_assume_role.json
}