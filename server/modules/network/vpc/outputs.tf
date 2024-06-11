output "vpc_id" {
  description = "the ID of the VPC"
  value       = aws_vpc.greenscape_vpc.id
}
