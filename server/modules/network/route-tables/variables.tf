variable "vpc_id" {
  description = "The ID of the VPC to connect the route tables"
  type        = string
}

variable "igw_id" {
  description = "The ID of the internet gateway to connect the route tables"
  type        = string
}

variable "public_1a_subnet_id" {
  description = "public-1a subnet ID"
  type        = string
}

variable "public_1b_subnet_id" {
  description = "public-1b subnet ID"
  type        = string
}
