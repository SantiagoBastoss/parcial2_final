import { Controller, UseInterceptors, Post, Body, Get, Param, Delete, HttpCode } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FotoService } from './foto.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { FotoDto } from './foto.dto/foto.dto';
import { FotoEntity } from './foto.entity/foto.entity';

@Controller('fotos')
@UseInterceptors(BusinessErrorsInterceptor)
export class FotoController {
    constructor(private readonly fotoService: FotoService) {}

    @Post()
        async create(@Body() fotoDto: FotoDto) {
        const foto: FotoEntity = plainToInstance(FotoEntity, fotoDto);
        return await this.fotoService.createFoto(foto);
    }

    @Get(':fotoId')
    async findOne(@Param('fotoId') fotoId: number) {
        return await this.fotoService.findFotoById(fotoId);
    }

    @Get()
    async findAll() {
        return await this.fotoService.findAllFotos();
    }

    @Delete(':fotoId')
    @HttpCode(204)
    async delete(@Param('fotoId') fotoId: number) {
        return await this.fotoService.deleteFoto(fotoId);
    }
}
