locals {
  vpc_name                 = "greenscape"
  vpc_cidr_block           = "10.0.0.0/16"
  availability_zones       = ["us-east-1a", "us-east-1b", "us-east-1c"]
  cluster_name             = "greenscape"
  iam_instance_profile_arn = "arn:aws:iam::${var.aws_account_id}:instance-profile/ecsInstanceRole"
  task_execution_role_arn  = "arn:aws:iam::${var.aws_account_id}:role/ecsTaskExecutionRole"
  key_name                 = "cloud-labs-nv"
}
