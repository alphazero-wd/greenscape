variable "redis_subnet_ids" {
  type        = set(string)
  description = "redis subnet ids"
}

variable "redis_security_group_id" {
  type        = string
  description = "redis security group ID"
}
