variable "cluster_name" {
  type        = string
  description = "The name of the ECS cluster"
}

variable "asg_arn" {
  type        = string
  description = "The ARN of the auto scaling group"
}
