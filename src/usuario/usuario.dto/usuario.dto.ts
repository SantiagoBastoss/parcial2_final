import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class UsuarioDto {

    @IsNumber()
    @IsNotEmpty()
    readonly id: number;
    
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
    
    @IsString()
    @IsNotEmpty()
    readonly telefono: string;
}