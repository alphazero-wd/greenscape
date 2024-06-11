variable "vpc_id" {
  description = "The ID of the VPC to connect the subnets"
  type        = string
}

variable "public_subnets_metadata" {
  description = "Metadata of the subnets"
  type = map(object({
    name              = string
    cidr              = string
    availability_zone = string
  }))
  default = {
    "public_1a" = {
      name              = "Public 1A"
      cidr              = "10.10.1.0/24"
      availability_zone = "us-east-1a"
    },
    "public_1b" = {
      name              = "Public 1B"
      cidr              = "10.10.2.0/24"
      availability_zone = "us-east-1b"
    },
  }
}
