import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumFotoModule } from './album-foto/album-foto.module';
import { AlbumModule } from './album/album.module';
import { FotoModule } from './foto/foto.module';
import { RedsocialModule } from './redsocial/redsocial.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AlbumEntity } from './album/album.entity/album.entity';
import { FotoEntity } from './foto/foto.entity/foto.entity';
import { RedsocialEntity } from './redsocial/redsocial.entity/redsocial.entity';
import { UsuarioEntity } from './usuario/usuario.entity/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AlbumFotoModule, AlbumModule, FotoModule, RedsocialModule, UsuarioModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'album',
    entities: [AlbumEntity, FotoEntity, RedsocialEntity, UsuarioEntity],
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
