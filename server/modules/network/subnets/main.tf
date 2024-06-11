resource "aws_subnet" "public_1a" {
  vpc_id                  = var.vpc_id
  availability_zone       = "us-east-1a"
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  tags = {
    Name = "public-1a"
  }
}

resource "aws_subnet" "public_1b" {
  vpc_id                  = var.vpc_id
  availability_zone       = "us-east-1b"
  cidr_block              = "10.0.2.0/24"
  map_public_ip_on_launch = true

  tags = {
    Name = "public-1b"
  }
}

resource "aws_subnet" "private_1a" {
  vpc_id            = var.vpc_id
  availability_zone = "us-east-1a"
  cidr_block        = "10.0.3.0/24"
  tags = {
    Name = "private-1a"
  }
}

resource "aws_subnet" "private_1b" {
  vpc_id            = var.vpc_id
  availability_zone = "us-east-1b"
  cidr_block        = "10.0.4.0/24"
  tags = {
    Name = "private-1b"
  }
}
