variable "ecs_cluster_id" {
  type        = string
  description = "ECS cluster ID"
}

variable "task_definition_arn" {
  type        = string
  description = "The ARN of the task definition"
}

variable "service_subnet_ids" {
  type        = set(string)
  description = "ECS service subnet IDs"
}

variable "service_security_group_id" {
  type        = string
  description = "The security group ID of the ECS service"
}

variable "capacity_provider_name" {
  type        = string
  description = "The name of the capacity provider"
}

variable "alb_tg_arn" {
  type        = string
  description = "The ARN of the ALB target group"
}
