resource "aws_dynamodb_table" "users" {
  name         = "${var.project_name}-${var.env}-users-table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "email"
    type = "S"
  }

  global_secondary_index {
    name            = "email-index"
    hash_key        = "email"
    projection_type = "KEYS_ONLY"
  }
}

resource "aws_dynamodb_table" "accounts" {
  name         = "${var.project_name}-${var.env}-accounts-table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "name"
    type = "S"
  }

  global_secondary_index {
    name            = "name-index"
    hash_key        = "name"
    projection_type = "KEYS_ONLY"
  }
}

resource "aws_dynamodb_table" "meals" {
  name         = "${var.project_name}-${var.env}-meals-table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "accountId"
    type = "S"
  }

  global_secondary_index {
    name            = "accountId-index"
    hash_key        = "accountId"
    projection_type = "ALL" # or "KEYS_ONLY" or "INCLUDE" if you want to limit
  }
}

resource "aws_dynamodb_table" "plans" {
  name         = "${var.project_name}-${var.env}-plans-table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "accountId"
  range_key    = "date"

  attribute {
    name = "accountId"
    type = "S"
  }

  attribute {
    name = "date"
    type = "S"
  }
}
