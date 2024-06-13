variable "db_subnet_ids" {
  type        = set(string)
  description = "database subnet IDs"
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

variable "db_security_group_id" {
  type        = string
  description = "database security group ID"
}
