variable "ec2_security_group_id" {
  type        = string
  description = "EC2 security group ID"
}

variable "cluster_name" {
  type        = string
  description = "The name of the ECS cluster"
}

variable "key_name" {
  type        = string
  description = "The key-pair name to allow SSH into EC2 instances"
}

variable "subnet_ids" {
  type        = set(string)
  description = "A list of subnet IDs"
}

variable "iam_instance_profile_arn" {
  type        = string
  description = "IAM instance profile ARN"
}
