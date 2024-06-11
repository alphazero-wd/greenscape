output "alb_security_group_id" {
  description = "Security group ID of the ALB"
  value       = aws_security_group.alb_sgr.id
}

output "ec2_security_group_id" {
  description = "Security group ID of EC2 instances"
  value       = aws_security_group.ec2_sgr.id
}

output "db_security_group_id" {
  description = "Security group ID of the database"
  value       = aws_security_group.db_sgr.id
}

output "redis_security_group_id" {
  description = "Security group ID of Redis cache"
  value       = aws_security_group.redis_sgr.id
}
