import { Module } from '@nestjs/common';
import { BillboardsService } from './billboards.service';
import { BillboardsController } from './billboards.controller';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [FilesModule],
  controllers: [BillboardsController],
  providers: [BillboardsService],
})
export class BillboardsModule {}
