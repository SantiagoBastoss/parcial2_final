import { Controller, UseInterceptors, Post, Body, Get, Param } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UsuarioService } from './usuario.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { UsuarioDto } from './usuario.dto/usuario.dto';
import { UsuarioEntity } from './usuario.entity/usuario.entity';

@Controller('usuarios')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post()
    async create(@Body() usuarioDto: UsuarioDto) {
        const usuario: UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDto);
        return await this.usuarioService.createUsuario(usuario);
    }

    @Get(':usarioId')
    async findOne(@Param('usuarioId') usuarioId: number) {
        return await this.usuarioService.findUsuarioById(usuarioId);
    }

    @Get()
    async findAll() {
        return await this.usuarioService.findAllUsuarios();
    }
}
