import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedsocialEntity } from './redsocial.entity/redsocial.entity';

@Injectable()
export class RedsocialService {

    constructor(
        @InjectRepository(RedsocialEntity)
        private readonly redsocialRepository: Repository<RedsocialEntity>
    ){}

    async createLibreria(redsocial: RedsocialEntity): Promise<RedsocialEntity> {
        if (redsocial.slogan.length != 0 && redsocial.slogan.length >= 20)
            return await this.redsocialRepository.save(redsocial);
    }
}