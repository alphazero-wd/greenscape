variable "vpc_cidr_block" {
  description = "CIDR Block of the VPC"
  type        = string
}

variable "vpc_name" {
  description = "The name of the VPC"
  type        = string
  default     = ""
}
