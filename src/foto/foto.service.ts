import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto.entity/foto.entity';

@Injectable()
export class FotoService {

    constructor(
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
    ){}

    async createFoto(foto: FotoEntity): Promise<FotoEntity> {
        return await this.fotoRepository.save(foto);
    }

    async findFotoById(id: string): Promise<FotoEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id}, relations: ["usuario", "album"] } );
        return foto;
    }

    async findAllFotos(): Promise<FotoEntity[]> {
        return await this.fotoRepository.find({ relations: ["usuario", "album"] });
    }

    async deleteFoto(id: string) {
        const foto: FotoEntity = await this.fotoRepository.findOne({where:{id}});
        await this.fotoRepository.remove(foto);
    }
}