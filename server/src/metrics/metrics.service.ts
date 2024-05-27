import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { startOfMonth, subMonths } from 'date-fns';

@Injectable()
export class MetricsService {
  constructor(private prisma: PrismaService) {}

  async getMonthKeyStats() {
    const today = new Date();
    const thisDayLastMonth = subMonths(today, 1);
    const [thisMonthRevenue, thisMonthAvgOrderValue] =
      await this.getMonthRevenuesAndAvgOrderValue(today);
    const [lastMonthRevenue, lastMonthAvgOrderValue] =
      await this.getMonthRevenuesAndAvgOrderValue(thisDayLastMonth);
    const thisMonthSales = await this.getMonthSales(today);
    const lastMonthSales = await this.getMonthSales(thisDayLastMonth);
    const thisMonthCustomers = await this.getMonthCustomers(today);
    const lastMonthCustomers = await this.getMonthCustomers(thisDayLastMonth);

    return {
      thisMonthRevenue,
      lastMonthRevenue,
      thisMonthAvgOrderValue,
      lastMonthAvgOrderValue,
      thisMonthSales,
      lastMonthSales,
      thisMonthCustomers,
      lastMonthCustomers,
    };
  }

  private async getMonthRevenuesAndAvgOrderValue(date: Date) {
    const startMonthDate = startOfMonth(date);
    const {
      _sum: { total: revenue },
      _avg: { total: avgOrderValue },
    } = await this.prisma.order.aggregate({
      _sum: { total: true },
      _avg: { total: true },
      where: { createdAt: { gte: startMonthDate, lte: date } },
    });
    return [+revenue, +avgOrderValue];
  }

  private async getMonthSales(date: Date) {
    const startMonthDate = startOfMonth(date);
    const {
      _sum: { qty: sales },
    } = await this.prisma.ordersOnProducts.aggregate({
      _sum: { qty: true },
      where: {
        order: { createdAt: { gte: startMonthDate, lte: date } },
      },
    });

    return +sales;
  }

  private async getMonthCustomers(date: Date) {
    const startMonthDate = startOfMonth(date);
    const [{ count }] = await this.prisma.$queryRaw<[{ count: BigInt }]>`
      SELECT COUNT(DISTINCT "customer")
      FROM "Order" o
      WHERE o."createdAt" >= ${startMonthDate} AND o."createdAt" <= ${date};
    `;

    return Number(count);
  }

  async getMonthsRevenuesInYear(year: number) {
    const {
      _min: { createdAt: firstOrderAt },
      _max: { createdAt: lastOrderAt },
    } = await this.prisma.order.aggregate({
      _min: { createdAt: true },
      _max: { createdAt: true },
    });

    const monthlyRevenues = await this.prisma.order.groupBy({
      by: ['createdAt'],
      _sum: { total: true },
      where: {
        createdAt: {
          gte: new Date(`1-1-${year}`),
          lt: new Date(`1-1-${year + 1}`),
        },
      },
    });

    const startYear = new Date(firstOrderAt).getTime()
      ? new Date(firstOrderAt).getFullYear()
      : new Date().getFullYear();
    const endYear = new Date(lastOrderAt).getTime()
      ? new Date(lastOrderAt).getFullYear()
      : new Date().getFullYear();

    return {
      startYear,
      endYear,
      monthlyRevenues: monthlyRevenues.map(({ _sum, ...group }) => ({
        total: _sum.total || 0,
        ...group,
      })),
    };
  }

  async groupSalesByCountries() {
    const countrySaleGroups = await this.prisma.order.groupBy({
      by: ['country'],
      _sum: { total: true },
    });

    return countrySaleGroups.map((group) => ({
      country: group.country,
      _sum: group._sum.total ?? 0,
    }));
  }
}
