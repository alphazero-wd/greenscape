terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
  backend "s3" {
    bucket              = "greenscape-tfstate"
    key                 = "terraform.tfstate"
    region              = "us-east-1"
    allowed_account_ids = ["985071300720"]
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

module "alb" {
  source                = "./containers/alb"
  alb_security_group_id = module.security_groups.alb_security_group_id
  alb_subnet_ids        = [module.subnets.public_1a_id, module.subnets.public_1b_id]
  tg_vpc_id             = module.vpc.vpc_id
}

module "ecs_cluster" {
  source       = "./containers/ecs"
  asg_arn      = module.ec2.ecs_asg_arn
  cluster_name = local.cluster_name
}

module "database" {
  source               = "./database"
  db_name              = var.db_name
  db_password          = var.db_password
  db_username          = var.db_username
  db_security_group_id = module.security_groups.db_security_group_id
  db_subnet_ids        = [module.subnets.private_1a_id, module.subnets.private_1b_id]
}

module "redis_cache" {
  source                  = "./cache"
  redis_security_group_id = module.security_groups.redis_security_group_id
  redis_subnet_ids        = [module.subnets.private_1a_id, module.subnets.private_1b_id]
}

module "log" {
  source = "./log"
  log_group_name = local.log_group_name
}

module "s3" {
  source = "./s3"
}

module "ecs_service" {
  source                    = "./containers/service"
  alb_tg_arn                = module.alb.alb_tg_arn
  capacity_provider_name    = module.ecs_cluster.capacity_provider_name
  ecs_cluster_id            = module.ecs_cluster.cluster_id
  service_security_group_id = module.security_groups.ec2_security_group_id
  service_subnet_ids        = [module.subnets.public_1a_id, module.subnets.public_1b_id]
  task_definition_arn       = module.ecs_task_definition.task_definition_arn
  depends_on                = [module.log, module.ec2, module.database, module.redis_cache]
}
