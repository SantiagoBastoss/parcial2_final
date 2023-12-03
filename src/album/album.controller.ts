import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { AlbumDto } from './album.dto/album.dto';
import { AlbumEntity } from './album.entity/album.entity';
import { AlbumService } from './album.service';

@Controller('albums')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Post()
    async create(@Body() albumDto: AlbumDto) {
        const album: AlbumEntity = plainToInstance(AlbumEntity, albumDto);
        return await this.albumService.createAlbum(album);
    }

    @Get(':albumId')
        async findOne(@Param('albumId') albumId: number) {
        return await this.albumService.findAlbumById(albumId);
    }

    @Delete(':albumId')
    @HttpCode(204)
    async delete(@Param('albumId') albumId: number) {
        return await this.albumService.deleteAlbumId(albumId);
    }
}
