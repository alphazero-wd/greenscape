output "alb_tg_arn" {
  value       = aws_lb_target_group.ecs_tg.arn
  description = "The ARN of the ECS target group"
}
