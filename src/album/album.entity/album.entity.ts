import { FotoEntity } from 'src/foto/foto.entity/foto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlbumEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    fechaInicio: Date;

    @Column()
    fechaFin: Date;


    @OneToMany(() => FotoEntity, foto => foto.album)
    fotos: FotoEntity[];
}