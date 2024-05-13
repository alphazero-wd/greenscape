import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { RolesGuard } from '../auth/guards';
import { Role } from '@prisma/client';

@Controller('stats')
@UseGuards(RolesGuard(Role.Admin))
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('key')
  async getMonthKeyMetrics() {
    const stats = await this.metricsService.getMonthKeyStats();
    return { data: stats, success: true };
  }

  @Get('year/:year')
  async getMonthlyRevenues(@Param('year', ParseIntPipe) year: number) {
    const stats = await this.metricsService.getMonthsRevenuesInYear(
      year || new Date().getFullYear(),
    );
    return { data: stats, success: true };
  }

  @Get('countries')
  async getSalesByCountries() {
    const countrySaleGroups = await this.metricsService.groupSalesByCountries();
    return { data: countrySaleGroups, success: true };
  }
}
