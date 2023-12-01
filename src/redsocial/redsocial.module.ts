import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedsocialService } from './redsocial.service';
import { RedsocialEntity } from './redsocial.entity/redsocial.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RedsocialEntity])],
    providers: [RedsocialService],
  })
  export class RedsocialModule {}