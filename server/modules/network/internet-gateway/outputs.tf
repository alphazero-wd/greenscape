output "igw_id" {
  description = "The ID of the Internet gateway upon creation"
  value       = aws_internet_gateway.greenscape_igw.id
}
