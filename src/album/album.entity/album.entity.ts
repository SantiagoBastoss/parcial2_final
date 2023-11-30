import { Column, Entity, OneToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TrackEntity } from 'src/track/track.entity/track.entity';
import { PerformerEntity } from 'src/performer/performer.entity/performer.entity';

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

    @OneToMany(() => TrackEntity, track => track.album)
    tracks: TrackEntity[];

    @ManyToOne(() => PerformerEntity, performers => performers.albums)
    albums: PerformerEntity;
}