output "task_definition_arn" {
  value       = aws_ecs_task_definition.ecs_task_definition.arn
  description = "The ARN of the task definition"
}
