resource "aws_security_group" "alb_sgr" {
  vpc_id      = var.vpc_id
  name        = "alb-sgr"
  description = "Security group for elastic load balancer"
}

resource "aws_security_group" "ec2_sgr" {
  vpc_id      = var.vpc_id
  name        = "ec2-sgr"
  description = "Security group for EC2 instances"
}

resource "aws_security_group" "db_sgr" {
  vpc_id      = var.vpc_id
  name        = "db-sgr"
  description = "Security group for RDS database"
}

resource "aws_security_group" "redis_sgr" {
  vpc_id      = var.vpc_id
  name        = "redis-sgr"
  description = "Security group for Redis"
}

resource "aws_security_group_rule" "alb_sgr_http_rule" {
  security_group_id = aws_security_group.alb_sgr.id
  type              = "ingress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "alb_sgr_https_rule" {
  security_group_id = aws_security_group.alb_sgr.id
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "alb_sgr_ec2_rule" {
  security_group_id        = aws_security_group.alb_sgr.id
  type                     = "egress"
  from_port                = 32768
  to_port                  = 65535
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.ec2_sgr.id
}

resource "aws_security_group_rule" "ec2_sgr_inbound_rule" {
  security_group_id        = aws_security_group.ec2_sgr.id
  type                     = "ingress"
  from_port                = 32768
  to_port                  = 65535
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.alb_sgr.id
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
  source_security_group_id = aws_security_group.redis_sgr.id
}

resource "aws_security_group_rule" "db_sgr_inbound_rule" {
  security_group_id        = aws_security_group.db_sgr.id
  type                     = "ingress"
  from_port                = 5432
  to_port                  = 5432
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.ec2_sgr.id
}

resource "aws_security_group_rule" "cache_sgr_inbound_rule" {
  security_group_id        = aws_security_group.redis_sgr.id
  type                     = "ingress"
  from_port                = 6379
  to_port                  = 6379
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.ec2_sgr.id
}
