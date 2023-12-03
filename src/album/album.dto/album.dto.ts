import {IsDate, IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';

export class AlbumDto {

    @IsNumber()
    @IsNotEmpty()
    readonly id: number;

    @IsString()
    @IsNotEmpty()
    readonly titulo: string;

    @IsDate()
    @IsNotEmpty()
    readonly fechaInicio: Date;
    
    @IsDate()
    @IsNotEmpty()
    readonly fechaFin: Date;
}
