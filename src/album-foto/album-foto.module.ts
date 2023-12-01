import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumFotoService } from './album-foto.service';
import { AlbumEntity } from 'src/album/album.entity/album.entity';
import { FotoEntity } from 'src/foto/foto.entity/foto.entity';

@Module({
  providers: [AlbumFotoService],
  imports: [TypeOrmModule.forFeature([AlbumEntity, FotoEntity])],
})
export class AlbumFotoModule {}
