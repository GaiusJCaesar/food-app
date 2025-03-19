variable "region" {
  description = "Name of the region of the resources"
  default     = "eu-west-2"
}

variable "project_name" {
  description = "Name of project"
}

variable "runtime" {
  description = "Run time of lambdas"
}

variable "env" {
  description = "Name of environment"
}

variable "web_domain" {
  description = "website domain"
}