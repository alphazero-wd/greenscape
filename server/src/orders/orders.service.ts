import { Injectable } from '@nestjs/common';
import { CreateOrderDto, FindManyOrdersDto, UpdateOrderDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { removeWhiteSpaces } from '../common/utils';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  create({ cart, ...createOrderDto }: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        ...createOrderDto,
        products: {
          create: cart,
        },
      },
    });
  }

  async findAll({
    limit = 10,
    offset = 0,
    status,
    amountRange,
    startDate,
    endDate,
    q = '',
    shippingCost,
    countries,
  }: FindManyOrdersDto) {
    const where: Prisma.OrderWhereInput = {};
    const search: Prisma.StringFilter<'Order'> = q
      ? {
          search: removeWhiteSpaces(q).split(' ').join(' & '),
          mode: 'insensitive',
        }
      : undefined;
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
    where.createdAt = { gte: startDate, lt: endDate };
    where.shippingCost = { equals: shippingCost };
    if (amountRange) {
      where.amount = {};
      if (amountRange[0]) where.amount.gte = amountRange[0];
      if (amountRange[1]) where.amount.lte = amountRange[1];
    }
    if (status === 'delivered') where.deliveredAt = { not: null };
    if (status === 'pending') where.deliveredAt = null;

    const orders = await this.prisma.order.findMany({
      take: limit,
      skip: offset,
      where,
      orderBy: { createdAt: 'desc' },
    });
    const count = await this.prisma.order.count({ where });

    const whereWithoutStatus = { ...where };
    delete whereWithoutStatus.deliveredAt;
    const statusGroups = await this.prisma.order.groupBy({
      by: ['deliveredAt'],
      _count: { id: true },
      where: whereWithoutStatus,
    });

    const whereWithoutCountries = { ...where };
    delete whereWithoutCountries.country;
    const countryGroups = await this.prisma.order.groupBy({
      by: ['country'],
      _count: { id: true },
      where: whereWithoutCountries,
    });

    const whereWithoutShippingOptions = { ...where };
    delete whereWithoutShippingOptions.shippingCost;
    const shippingOptionGroups = await this.prisma.order.groupBy({
      by: ['shippingCost'],
      _count: { id: true },
      where: whereWithoutShippingOptions,
    });

    return {
      data: orders,
      count,
      statusGroups,
      countryGroups,
      shippingOptionGroups,
    };
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
                category: { select: { name: true } },
                images: { select: { id: true }, orderBy: { id: 'asc' } },
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
