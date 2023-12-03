import { Controller, UseInterceptors, Post, Body } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RedsocialService } from './redsocial.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { RedsocialDto } from './redsocial.dto/redsocial.dto';
import { RedsocialEntity } from './redsocial.entity/redsocial.entity';

@Controller('redessociales')
@UseInterceptors(BusinessErrorsInterceptor)
export class RedsocialController {
    constructor(private readonly redsocialService: RedsocialService) {}

    @Post()
        async create(@Body() redsocialDto: RedsocialDto) {
        const redsocial: RedsocialEntity = plainToInstance(RedsocialEntity, redsocialDto);
        return await this.redsocialService.createLibreria(redsocial);
    }
}
