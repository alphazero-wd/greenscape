variable "alb_subnet_ids" {
  type        = set(string)
  description = "Subnet IDs for Application Load Balancer"
}

variable "alb_security_group_id" {
  type        = string
  description = "ALB security group ID"
}

variable "tg_vpc_id" {
  type        = string
  description = "Target group's VPC ID"
}
