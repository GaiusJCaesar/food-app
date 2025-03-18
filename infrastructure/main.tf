terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">=4.62.0"
    }
  }
  required_version = "~> 1.7.3"
}

provider "aws" {
  region = var.region

  default_tags {
    tags = {
        Service = "food-app"
        Service_Name = "food-app"
        Environment  = var.env
    }
  }
}
