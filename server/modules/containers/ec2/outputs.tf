output "ecs_asg_arn" {
  value       = aws_autoscaling_group.ecs_asg.arn
  description = "The ARN of the auto-scaling group"
}
