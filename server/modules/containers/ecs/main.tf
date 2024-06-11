resource "aws_ecs_cluster" "greenscape" {
  name = var.cluster_name
}

resource "aws_ecs_capacity_provider" "greenscape_cp" {
  name = "greenscape-cp"

  auto_scaling_group_provider {
    auto_scaling_group_arn = var.asg_arn

    managed_scaling {
      maximum_scaling_step_size = 1000
      minimum_scaling_step_size = 1
      status                    = "ENABLED"
      target_capacity           = 2
    }
  }
}

resource "aws_ecs_cluster_capacity_providers" "greenscape_cp" {
  cluster_name = var.cluster_name

  capacity_providers = [aws_ecs_capacity_provider.greenscape_cp.name]

  default_capacity_provider_strategy {
    base              = 1
    weight            = 100
    capacity_provider = aws_ecs_capacity_provider.greenscape_cp.name
  }
}
