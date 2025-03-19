resource "aws_cognito_user_pool" "default_pool" {
  name = "${var.project_name}-${var.env}-user-pool"
  device_configuration {
    device_only_remembered_on_user_prompt = false
  }
  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]


  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
    email_message        = "Welcome! Here's your code: {####}."
    email_subject        = "Here's your veriffication code!"
  }
}

resource "aws_cognito_user_pool_client" "userpool_client" {
  name                                 = "${var.project_name}-${var.env}-client"
  user_pool_id                         = aws_cognito_user_pool.default_pool.id
  callback_urls                        = ["http://localhost:3000/"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code", "implicit"]
  allowed_oauth_scopes                 = ["email", "openid"]
  supported_identity_providers         = ["COGNITO"]
}

resource "aws_cognito_user_pool_domain" "domain" {
  domain       = "auth-${var.project_name}"
  user_pool_id = aws_cognito_user_pool.default_pool.id
}
