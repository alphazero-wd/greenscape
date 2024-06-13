output "public_1a_id" {
  value       = aws_subnet.public_1a.id
  description = "The ID of public-1a subnet"
}

output "public_1b_id" {
  value       = aws_subnet.public_1b.id
  description = "The ID of public-1b subnet"
}

output "private_1a_id" {
  value       = aws_subnet.private_1a.id
  description = "The ID of private-1a subnet"
}

output "private_1b_id" {
  value       = aws_subnet.private_1b.id
  description = "The ID of private-1b subnet"
}
