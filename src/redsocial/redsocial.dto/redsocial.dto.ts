import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class RedsocialDto {

    @IsNumber()
    @IsNotEmpty()
    readonly id: number;
    
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
    
    @IsString()
    @IsNotEmpty()
    readonly slogan: string;
}