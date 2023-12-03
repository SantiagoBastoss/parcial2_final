import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumFotoService } from './album-foto.service';
import { AlbumEntity } from 'src/album/album.entity/album.entity';
import { FotoEntity } from 'src/foto/foto.entity/foto.entity';
import { AlbumFotoController } from './album-foto.controller';

@Module({
  providers: [AlbumFotoService],
  imports: [TypeOrmModule.forFeature([AlbumEntity, FotoEntity])],
  controllers: [AlbumFotoController],
})
export class AlbumFotoModule {}
