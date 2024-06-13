output "capacity_provider_name" {
  value       = aws_ecs_capacity_provider.greenscape_cp.name
  description = "The name of the ECS capacity provider"
}

output "cluster_id" {
  value       = aws_ecs_cluster.greenscape.id
  description = "The ID of the ECS cluster"
}
