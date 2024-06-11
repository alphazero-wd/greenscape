resource "aws_ecs_task_definition" "ecs_task_definition" {
  family             = "greenscape-task"
  network_mode       = "bridge"
  execution_role_arn = var.execution_role_arn
  cpu                = 256
  memory             = 512
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }
  container_definitions = jsonencode([
    {
      name      = "greenscape-api"
      image     = "public.ecr.aws/q4k2n2l9/greenscape-api"
      cpu       = 256
      memory    = 512
      essential = true
      portMappings = [
        {
          containerPort = 5000
          hostPort      = 0
          protocol      = "tcp"
        }
      ]
      environment = var.env
    }
  ])
}
