import { Injectable } from '@nestjs/common';
import { AlbumEntity } from './album.entity/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {

    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ){}

    async createAlbum(album: AlbumEntity): Promise<AlbumEntity> {
        if (album.titulo != "")
            return await this.albumRepository.save(album);
        else    
            console.log("El álbum debe tener un título asociado");
    }

    async findAlbumById(id: number): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id}, relations: ["fotos"] } );
        return album;
    }

    async deleteAlbumId(id: number) {
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id}});
        if (album.fotos.length == 0)
            await this.albumRepository.remove(album);
        else    
            console.log("No se puede eliminar el álbum porque tiene una foto asociada");
    }
}

