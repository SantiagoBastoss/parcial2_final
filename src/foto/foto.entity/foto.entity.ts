import { AlbumEntity } from 'src/album/album.entity/album.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { Column, Entity, OneToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity()
export class FotoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    iso: number;

    @Column()
    velObturacion: number;

    @Column()
    apertura: number;

    @Column()
    fecha: string;


    @ManyToOne(() => UsuarioEntity, usuario => usuario.fotos)
    usuario: UsuarioEntity;

    @ManyToOne(() => AlbumEntity, album => album.fotos)
    album: AlbumEntity;
}