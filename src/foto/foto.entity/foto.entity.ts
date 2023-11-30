import { Column, Entity, OneToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

    @OneToMany(() => TrackEntity, track => track.album)
    tracks: TrackEntity[];

    @ManyToOne(() => PerformerEntity, performers => performers.albums)
    albums: PerformerEntity;
}