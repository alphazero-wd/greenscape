resource "aws_db_instance" "greenscape_db" {
  instance_class         = "db.t3.micro"
  apply_immediately      = true
  multi_az               = false
  identifier             = "greenscape"
  db_subnet_group_name   = aws_db_subnet_group.db_subnet_group.name
  username               = var.db_username
  password               = var.db_password
  db_name                = var.db_name
  publicly_accessible    = false
  allocated_storage      = 20
  engine                 = "postgres"
  engine_version         = "16.2"
  vpc_security_group_ids = [var.db_security_group_id]
  skip_final_snapshot    = true
}

resource "aws_db_subnet_group" "db_subnet_group" {
  subnet_ids = var.db_subnet_ids
}
