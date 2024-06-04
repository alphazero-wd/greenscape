terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-east-1"
}

variable "vpc_cidr_block" {
  description = "CIDR Block for Greenscape VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "db_name" {
  type      = string
  sensitive = true
}
variable "db_username" {
  type      = string
  sensitive = true
}
variable "db_password" {
  type      = string
  sensitive = true
}

# vpc
resource "aws_vpc" "greenscape_vpc" {
  cidr_block = var.vpc_cidr_block
  tags = {
    Name = "greenscape-vpc"
  }
}

# subnets
resource "aws_subnet" "public_1a" {
  vpc_id            = aws_vpc.greenscape_vpc.id
  availability_zone = "us-east-1a"
  cidr_block        = "10.0.1.0/24"
  tags = {
    Name = "public-1a"
  }
}

resource "aws_subnet" "public_1b" {
  vpc_id            = aws_vpc.greenscape_vpc.id
  availability_zone = "us-east-1b"
  cidr_block        = "10.0.2.0/24"

  tags = {
    Name = "public-1b"
  }
}

resource "aws_subnet" "private_1a" {
  vpc_id            = aws_vpc.greenscape_vpc.id
  availability_zone = "us-east-1a"
  cidr_block        = "10.0.3.0/24"
  tags = {
    Name = "private-1a"
  }
}

resource "aws_subnet" "private_1b" {
  vpc_id            = aws_vpc.greenscape_vpc.id
  availability_zone = "us-east-1b"
  cidr_block        = "10.0.4.0/24"
  tags = {
    Name = "private-1b"
  }
}

resource "aws_internet_gateway" "greenscape_igw" {
  vpc_id = aws_vpc.greenscape_vpc.id
  tags = {
    Name = "greenscape-igw"
  }
}

# route tables
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.greenscape_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.greenscape_igw.id
  }

  tags = {
    Name = "public-rt"
  }
}

resource "aws_route_table" "private_rt" {
  vpc_id = aws_vpc.greenscape_vpc.id
  tags = {
    Name = "private-rt"
  }
}

# route table association
resource "aws_route_table_association" "public_1a" {
  subnet_id      = aws_subnet.public_1a.id
  route_table_id = aws_route_table.public_rt.id
}
resource "aws_route_table_association" "public_1b" {
  subnet_id      = aws_subnet.public_1b.id
  route_table_id = aws_route_table.public_rt.id
}
resource "aws_route_table_association" "private_1a" {
  subnet_id      = aws_subnet.private_1a.id
  route_table_id = aws_route_table.private_rt.id
}
resource "aws_route_table_association" "private_1b" {
  subnet_id      = aws_subnet.private_1b.id
  route_table_id = aws_route_table.private_rt.id
}

# security groups
resource "aws_security_group" "elb_sgr" {
  vpc_id      = aws_vpc.greenscape_vpc.id
  name        = "elb-sgr"
  description = "Security group for elastic load balancer"
}

resource "aws_security_group" "ec2_sgr" {
  vpc_id      = aws_vpc.greenscape_vpc.id
  name        = "ec2-sgr"
  description = "Security group for EC2 instances"
}

resource "aws_security_group" "db_sgr" {
  vpc_id      = aws_vpc.greenscape_vpc.id
  name        = "db-sgr"
  description = "Security group for RDS database"
}

resource "aws_security_group" "cache_sgr" {
  vpc_id      = aws_vpc.greenscape_vpc.id
  name        = "cache-sgr"
  description = "Security group for Redis"
}

# elb security group rules
resource "aws_security_group_rule" "elb_sgr_http_rule" {
  security_group_id = aws_security_group.elb_sgr.id
  type              = "ingress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "elb_sgr_https_rule" {
  security_group_id = aws_security_group.elb_sgr.id
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "elb_sgr_ec2_rule" {
  security_group_id        = aws_security_group.elb_sgr.id
  type                     = "egress"
  from_port                = 32768
  to_port                  = 65535
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.ec2_sgr.id
}

# ec2 security group rules
resource "aws_security_group_rule" "ec2_sgr_inbound_rule" {
  security_group_id        = aws_security_group.ec2_sgr.id
  type                     = "ingress"
  from_port                = 5000
  to_port                  = 5000
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.elb_sgr.id
}

resource "aws_security_group_rule" "ec2_sgr_http_rule" {
  security_group_id = aws_security_group.ec2_sgr.id
  type              = "egress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "ec2_sgr_https_rule" {
  security_group_id = aws_security_group.ec2_sgr.id
  type              = "egress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "ec2_sgr_db_rule" {
  security_group_id        = aws_security_group.ec2_sgr.id
  type                     = "egress"
  from_port                = 5432
  to_port                  = 5432
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.db_sgr.id
}

resource "aws_security_group_rule" "ec2_sgr_redis_rule" {
  security_group_id        = aws_security_group.ec2_sgr.id
  type                     = "egress"
  from_port                = 6379
  to_port                  = 6379
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.cache_sgr.id
}

# database security group rules
resource "aws_security_group_rule" "db_sgr_inbound_rule" {
  security_group_id        = aws_security_group.db_sgr.id
  type                     = "ingress"
  from_port                = 5432
  to_port                  = 5432
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.ec2_sgr.id
}

# redis security group rules
resource "aws_security_group_rule" "cache_sgr_inbound_rule" {
  security_group_id        = aws_security_group.cache_sgr.id
  type                     = "ingress"
  from_port                = 6379
  to_port                  = 6379
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.ec2_sgr.id
}

# RDS
resource "aws_db_subnet_group" "postgres" {
  subnet_ids = [aws_subnet.private_1a.id, aws_subnet.private_1b.id]
}

resource "aws_elasticache_subnet_group" "redis" {
  name       = "greenscape"
  subnet_ids = [aws_subnet.private_1a.id, aws_subnet.private_1b.id]
}

resource "aws_db_instance" "greenscape_db" {
  allocated_storage         = 20
  db_name                   = var.db_name
  engine                    = "postgres"
  engine_version            = "16.2"
  instance_class            = "db.t3.micro"
  username                  = var.db_username
  password                  = var.db_password
  publicly_accessible       = false
  availability_zone         = "us-east-1a"
  vpc_security_group_ids    = [aws_security_group.db_sgr.id]
  customer_owned_ip_enabled = false
  apply_immediately         = true
  skip_final_snapshot       = true
  multi_az                  = false
  db_subnet_group_name      = aws_db_subnet_group.postgres.name
}

# ElastiCache
resource "aws_elasticache_cluster" "greenscape_cache" {
  cluster_id           = "greenscape"
  engine               = "redis"
  node_type            = "cache.t2.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  engine_version       = "7.1"
  port                 = 6379
  availability_zone    = "us-east-1a"
  apply_immediately    = true
  security_group_ids   = [aws_security_group.cache_sgr.id]
  subnet_group_name    = aws_elasticache_subnet_group.redis.name
}

# EC2 instances
resource "aws_launch_template" "ecs_lt" {
  name_prefix   = "ecs-template"
  image_id      = "ami-00beae93a2d981137"
  instance_type = "t2.micro"

  key_name               = "greenscape-ec2"
  vpc_security_group_ids = [aws_security_group.ec2_sgr.id]
  iam_instance_profile {
    name = "ecsInstanceRole"
  }

  block_device_mappings {
    device_name = "/dev/xvda"
    ebs {
      volume_size = 30
      volume_type = "gp2"
    }
  }

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "ecs-instance"
    }
  }

  user_data = filebase64("${path.module}/ecs.sh")
}

# Auto scaling
resource "aws_autoscaling_group" "ecs_asg" {
  vpc_zone_identifier = [aws_subnet.public_1a.id, aws_subnet.public_1b.id]
  desired_capacity    = 2
  max_size            = 2
  min_size            = 2

  launch_template {
    id      = aws_launch_template.ecs_lt.id
    version = "$Latest"
  }

  tag {
    key                 = "AmazonECSManaged"
    value               = true
    propagate_at_launch = true
  }
}

# Load balancer
resource "aws_lb" "ecs_alb" {
  name               = "ecs-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.elb_sgr.id]
  subnets            = [aws_subnet.public_1a.id, aws_subnet.public_1b.id]

  tags = {
    Name = "greenscape-alb"
  }
}

resource "aws_lb_listener" "ecs_alb_listener_http" {
  load_balancer_arn = aws_lb.ecs_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      port        = 443
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "ecs_alb_listener_https" {
  load_balancer_arn = aws_lb.ecs_alb.arn
  port              = 443
  protocol          = "HTTPS"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.ecs_tg.arn
  }
}

resource "aws_lb_target_group" "ecs_tg" {
  name        = "ecs-target-group"
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.greenscape_vpc.id

  health_check {
    path = "/products/store"
  }
}

resource "aws_ecs_cluster" "greenscape_cluster" {
  name = "greenscape"
}

variable "container_name" {
  type    = string
  default = "greenscape-api"
}

resource "aws_ecs_task_definition" "ecs_task_definition" {
  family             = "greenscape-task"
  network_mode       = "default"
  execution_role_arn = "arn:aws:iam::532199187081:role/ecsTaskExecutionRole"
  cpu                = 256
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }
  container_definitions = jsonencode([
    {
      name      = "greenscape-api"
      image     = "public.ecr.aws/q4k2n2l9/greenscape-api:latest"
      cpu       = 256
      memory    = 512
      essential = true
      portMappings = [
        {
          containerPort = 5000
          hostPort      = 0
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "ecs_service" {
  name            = "my-ecs-service"
  cluster         = aws_ecs_cluster.greenscape_cluster.id
  task_definition = aws_ecs_task_definition.ecs_task_definition.arn
  desired_count   = 2
  launch_type     = "EC2"

  force_new_deployment = true
  placement_constraints {
    type = "distinctInstance"
  }

  triggers = {
    redeployment = timestamp()
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.ecs_tg.arn
    container_name   = "greenscape-api"
    container_port   = 5000
  }

  depends_on = [aws_autoscaling_group.ecs_asg]
}
