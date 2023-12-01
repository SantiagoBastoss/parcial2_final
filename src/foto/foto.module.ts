import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoService } from './foto.service';
import { FotoEntity } from './foto.entity/foto.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FotoEntity])],
    providers: [FotoService],
  })
  export class FotoModule {}