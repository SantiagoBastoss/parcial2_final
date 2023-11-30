
import { AlbumEntity } from './album.entity/album.entity';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
imports: [TypeOrmModule.forFeature([AlbumEntity])]