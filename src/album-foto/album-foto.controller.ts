import { Controller, UseInterceptors, Post, Param } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { AlbumFotoService } from './album-foto.service';

@Controller('albums')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumFotoController {
    constructor(private readonly albumFotoService: AlbumFotoService){}

    @Post(':albumId/fotos/:fotoId')
    async addFotoAlbum(@Param('albumId') albumId: number, @Param('fotoId') fotoId: number){
        return await this.albumFotoService.addPhotoToAlbum(albumId, fotoId);
    }
}
