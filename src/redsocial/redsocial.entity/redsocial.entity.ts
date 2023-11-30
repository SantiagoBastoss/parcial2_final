import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { Column, Entity, OneToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RedsocialEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    slogan: string;


    @OneToMany(() => UsuarioEntity, usuario => usuario.redsocial)
    usuarios: UsuarioEntity[];

}
