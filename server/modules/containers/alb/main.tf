resource "aws_lb" "ecs_alb" {
  name               = "greenscape-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [var.alb_security_group_id]
  subnets            = var.alb_subnet_ids
}

resource "aws_lb_listener" "ecs_alb_listener" {
  load_balancer_arn = aws_lb.ecs_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.ecs_tg.arn
  }
}

resource "aws_lb_target_group" "ecs_tg" {
  name     = "greenscape-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.tg_vpc_id

  health_check {
    path = "/products/store"
  }
}
