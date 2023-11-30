import { FotoEntity } from 'src/foto/foto.entity/foto.entity';
import { Column, Entity, OneToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity()
export class AlbumEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    caratula: string;

    @Column()
    fecha_lanzamiento: string;

    @Column()
    descripcion: string;


    @OneToMany(() => FotoEntity, foto => foto.usuario)
    fotos: FotoEntity[];
}