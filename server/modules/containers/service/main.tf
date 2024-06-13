resource "aws_ecs_service" "ecs_service" {
  name                 = "greenscape-service"
  cluster              = var.ecs_cluster_id
  task_definition      = var.task_definition_arn
  desired_count        = 2
  force_new_deployment = true

  capacity_provider_strategy {
    capacity_provider = var.capacity_provider_name
    weight            = 100
  }

  load_balancer {
    target_group_arn = var.alb_tg_arn
    container_name   = "greenscape-api"
    container_port   = 5000
  }
}
