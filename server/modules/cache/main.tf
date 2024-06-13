resource "aws_elasticache_cluster" "redis_cluster" {
  apply_immediately    = true
  port                 = 6379
  cluster_id           = "redis"
  engine               = "redis"
  engine_version       = "7.1"
  num_cache_nodes      = 1
  node_type            = "cache.t2.micro"
  security_group_ids   = [var.redis_security_group_id]
  parameter_group_name = "default.redis7"
  subnet_group_name    = aws_elasticache_subnet_group.redis_subnet_group.name
}

resource "aws_elasticache_subnet_group" "redis_subnet_group" {
  name       = "redis-subnet-group"
  subnet_ids = var.redis_subnet_ids
}
