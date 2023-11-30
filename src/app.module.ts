import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumFotoModule } from './album-foto/album-foto.module';

@Module({
  imports: [AlbumFotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
