variable "aws_account_id" {
  type        = string
  description = "AWS account ID"
}

variable "db_username" {
  type        = string
  description = "database username"
  default     = "postgres"
}

variable "db_password" {
  type        = string
  description = "database password"
  sensitive   = true
}

variable "db_name" {
  type        = string
  description = "database name"
}
