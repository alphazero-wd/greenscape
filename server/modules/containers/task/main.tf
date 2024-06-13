resource "aws_ecs_task_definition" "ecs_task_definition" {
  family             = "greenscape-task"
  network_mode       = "bridge"
  execution_role_arn = var.execution_role_arn
  cpu                = 256
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
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          "awslogs-group"         = "greenscape-log-group",
          "awslogs-create-group"  = "true"
          "awslogs-region"        = "us-east-1",
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])
}
