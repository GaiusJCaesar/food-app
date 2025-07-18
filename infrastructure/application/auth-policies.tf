# Step 1: Create the IAM role to be assumed by Lambda
resource "aws_iam_role" "auth_lambda_assume_role" {
  name               = "auth_lambda_assume_role"
  assume_role_policy = data.aws_iam_policy_document.auth_lambda_assume_role.json
}

# Step 2: Create the AssumeRole Policy Document (For Lambda to assume the role)
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

# Step 3: Create the Inline Policy for DynamoDB permissions
resource "aws_iam_role_policy" "auth_lambda_dynamo_policy" {
  name = "auth_lambda_dynamo_policy"
  role = aws_iam_role.auth_lambda_assume_role.id

  policy = data.aws_iam_policy_document.auth_lambda_dynamo_policy.json
}

# Step 4: Create DynamoDB permissions policy document
data "aws_iam_policy_document" "auth_lambda_dynamo_policy" {
  statement {
    effect = "Allow"
    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:UpdateItem"
    ]
    resources = [aws_dynamodb_table.users.arn, aws_dynamodb_table.accounts.arn, aws_dynamodb_table.meals.arn, aws_dynamodb_table.plans.arn]
  }
}

# Step 5: Attach AWS Lambda Basic Execution Role for logging
resource "aws_iam_role_policy_attachment" "auth_lambda_logs" {
  role       = aws_iam_role.auth_lambda_assume_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
