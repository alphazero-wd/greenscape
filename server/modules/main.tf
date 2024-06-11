terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
  required_version = ">= 1.2.0"
}

module "vpc" {
  source = "./network/vpc"

  vpc_name       = local.vpc_name
  vpc_cidr_block = local.vpc_cidr_block
}

module "subnets" {
  source = "./network/subnets"
  vpc_id = module.vpc.vpc_id
}

module "internet_gateway" {
  source = "./network/internet-gateway"
  vpc_id = module.vpc.vpc_id
}

module "route_tables" {
  source              = "./network/route-tables"
  vpc_id              = module.vpc.vpc_id
  igw_id              = module.internet_gateway.igw_id
  public_1a_subnet_id = module.subnets.public_1a_id
  public_1b_subnet_id = module.subnets.public_1b_id
}

module "security_groups" {
  source = "./network/security-groups"
  vpc_id = module.vpc.vpc_id
}

module "ec2" {
  source                   = "./containers/ec2"
  ec2_security_group_id    = module.security_groups.ec2_security_group_id
  cluster_name             = local.cluster_name
  subnet_ids               = [module.subnets.public_1a_id, module.subnets.public_1b_id]
  iam_instance_profile_arn = local.iam_instance_profile_arn
  key_name                 = local.key_name
}

module "ecs_task_definition" {
  source             = "./containers/task"
  execution_role_arn = local.task_execution_role_arn
  env = [for tuple in regexall("(.*?)=(.*)", file("../.env.prod")) : {
    name  = tuple[0]
    value = tuple[1]
  }]
}

module "ecs_cluster" {
  source       = "./containers/ecs"
  asg_arn      = module.ec2.ecs_asg_arn
  cluster_name = local.cluster_name
}
