resource "aws_route_table" "public_rt" {
  vpc_id = var.vpc_id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = var.igw_id
  }

  tags = {
    Name = "public-rt"
  }
}

resource "aws_route_table_association" "public_1a" {
  subnet_id      = var.public_1a_subnet_id
  route_table_id = aws_route_table.public_rt.id
}
resource "aws_route_table_association" "public_1b" {
  subnet_id      = var.public_1b_subnet_id
  route_table_id = aws_route_table.public_rt.id
}
