resource "aws_dynamodb_table" "users" {
  name           = "${var.project_name}-${var.env}-users-table"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "email"
    type = "S"
  }

  global_secondary_index {
    name               = "email-index"
    hash_key           = "email" 
    projection_type    = "KEYS_ONLY"
  }
}
