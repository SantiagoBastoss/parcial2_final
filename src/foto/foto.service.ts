import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto.entity/foto.entity';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class FotoService {

    constructor(
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
    ){}

    async createFoto(foto: FotoEntity): Promise<FotoEntity> {
        if (foto.iso >= 100 && foto.iso <= 6400 && foto.velObturacion >= 2 && foto.velObturacion <= 250 && foto.apertura >= 1 && foto.apertura <= 32)
            return await this.fotoRepository.save(foto);
    }

    async findFotoById(id: number): Promise<FotoEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id}, relations: ["usuario", "album"] } );
        return foto;
    }

    async findAllFotos(): Promise<FotoEntity[]> {
        return await this.fotoRepository.find({ relations: ["usuario", "album"] });
    }

    async deleteFoto(id: number) {
        const foto: FotoEntity = await this.fotoRepository.findOne({where:{id}});
        if (foto.album.fotos.indexOf(foto) == foto.album.fotos.length-1)
            //Delete album
        await this.fotoRepository.remove(foto);
    }
}