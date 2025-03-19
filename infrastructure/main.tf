terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">=4.62.0"
    }
  }
  required_version = "~> 1.7.3"


  backend "s3" {
    bucket  = "438548768810-terraform-state-bucket"
    key     = "food-app/terraform.tfstate"
    region  = "eu-west-2"
    encrypt = true
  }
}

provider "aws" {
  region = var.region

  default_tags {
    tags = {
      Service      = "food-app"
      Service_Name = "food-app"
      Environment  = var.env
    }
  }
}

resource "aws_s3_bucket" "food_app" {
  bucket = "${var.project_name}-${var.env}-deployment-bucket"
}

module "application" {
  source         = "./application"
  env            = var.env
  project_name   = var.project_name
  lambda_configs = local.lambdas
  s3_bucket      = aws_s3_bucket.food_app.bucket
}