import { Injectable } from '@nestjs/common';
import { CreateOrderDto, FindManyOrdersDto, UpdateOrderDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { endOfDay, startOfDay } from 'date-fns';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  create({ bag, ...createOrderDto }: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        ...createOrderDto,
        products: {
          create: bag,
        },
      },
    });
  }

  private formQueries({
    q,
    countries,
    from,
    to,
    status,
    shippingCost,
    totalRange,
  }: FindManyOrdersDto) {
    const where: Prisma.OrderWhereInput = {};
    const search: Prisma.StringFilter<'Order'> = {
      contains: q,
      mode: 'insensitive',
    };
    if (q) {
      where.OR = [
        { customer: search },
        { email: search },
        { phone: search },
        { line1: search },
        { line2: search },
        { city: search },
        { postalCode: search },
        { state: search },
      ];
    }
    if (countries) where.country = { in: countries };
    where.shippingCost = shippingCost;
    if (totalRange) {
      where.total = {};
      if (totalRange[0]) where.total.gte = totalRange[0];
      if (totalRange[1]) where.total.lte = totalRange[1];
    }
    let start: Date, end: Date;
    if (from) start = startOfDay(new Date(from));
    if (to) end = endOfDay(new Date(to));
    where.createdAt = { gte: start, lte: end };
    if (status === 'delivered') where.deliveredAt = { not: null };
    if (status === 'pending') where.deliveredAt = null;
    return where;
  }

  async findAll({
    limit = 10,
    offset = 0,
    ...findManyOrdersDto
  }: FindManyOrdersDto) {
    const where = this.formQueries(findManyOrdersDto);

    const orders = await this.prisma.order.findMany({
      take: limit,
      skip: offset,
      where,
      orderBy: { createdAt: 'desc' },
    });
    const count = await this.prisma.order.count({ where });

    return {
      data: orders,
      count,
    };
  }

  async aggregate(
    field: 'deliveredAt' | 'country' | 'shippingCost',
    findManyOrdersDto: FindManyOrdersDto,
  ) {
    const where = this.formQueries(findManyOrdersDto);
    delete where[field];
    return this.prisma.order.groupBy({
      by: field,
      _count: { id: true },
      where,
    });
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            product: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({ where: { id }, data: updateOrderDto });
  }
}
