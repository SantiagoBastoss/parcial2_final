import { FotoEntity } from 'src/foto/foto.entity/foto.entity';
import { RedsocialEntity } from 'src/redsocial/redsocial.entity/redsocial.entity';
import { Column, Entity, OneToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    nombre: string;

    @Column()
    telefono: string;


    @ManyToOne(() => RedsocialEntity, redsocial => redsocial.usuarios)
    redsocial: RedsocialEntity;

    @OneToMany(() => FotoEntity, foto => foto.usuario)
    fotos: FotoEntity[];
}
