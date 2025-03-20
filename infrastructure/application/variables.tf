variable "env" {
  description = "Name of environment"
}

variable "region" {
  description = "Name of the region of the resources"
  default     = "eu-west-2"
}

variable "project_name" {
  description = "Name of project"
}

variable "lambda_configs" {}

variable "s3_bucket" {}

variable "web_domain" {
  description = "website domain"
}