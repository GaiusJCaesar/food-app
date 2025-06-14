variable "api_id" {
  description = "The ID of the shared API Gateway"
  type        = string
}

variable "lambda_function_name" {
  description = "Name of the Lambda function"
  type        = string
}

variable "lambda_invoke_arn" {
  description = "Lambda invoke ARN"
  type        = string
}

variable "routes" {
  description = "List of route definitions for this lambda"
  type = list(object({
    path    = string
    methods = list(string)
  }))
}
