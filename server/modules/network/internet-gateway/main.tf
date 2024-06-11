resource "aws_internet_gateway" "greenscape_igw" {
  vpc_id = var.vpc_id
}
