variable "execution_role_arn" {
  type        = string
  description = "ARN role to execute ECS tasks"
}

variable "env" {
  type = set(object({
    name = string
    value = string
  }))
  description = "Container environment variables"
  sensitive = true
}
