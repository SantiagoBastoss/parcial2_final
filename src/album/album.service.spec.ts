import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AlbumEntity } from './album.entity/album.entity';
import { faker } from '@faker-js/faker';

describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let albumsList: AlbumEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    albumsList = [];
    for(let i = 0; i < 5; i++){
        const album: AlbumEntity = await repository.save({
        id: faker.number.bigInt(), 
        titulo: faker.lorem.sentence(), 
        fechaInicio: faker.date.past(), 
        fechaFin: faker.date.future()})
        albumsList.push(album);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('create should return a new album', async () => {
    const album: AlbumEntity = {
      id: 0,
      titulo: faker.lorem.sentence(), 
      fechaInicio: faker.date.past(), 
      fechaFin: faker.date.future(),
      fotos: []
    }

    const newAlbum: AlbumEntity = await service.createAlbum(album);
    expect(newAlbum).not.toBeNull();

    const storedAlbum: AlbumEntity = await repository.findOne({where: {id: newAlbum.id}})
    expect(storedAlbum).not.toBeNull();
    expect(storedAlbum.titulo).toEqual(newAlbum.titulo)
    expect(storedAlbum.fechaInicio).toEqual(newAlbum.fechaInicio)
    expect(storedAlbum.fechaFin).toEqual(newAlbum.fechaFin)
    expect(storedAlbum.fotos).toEqual(newAlbum.fotos)
  });


  it('findOne should return an album by id', async () => {
    const storedAlbum: AlbumEntity = albumsList[0];
    const album: AlbumEntity = await service.findAlbumById(storedAlbum.id);
    expect(album).not.toBeNull();
    expect(album.titulo).toEqual(storedAlbum.titulo)
    expect(album.fechaInicio).toEqual(storedAlbum.fechaInicio)
    expect(album.fechaFin).toEqual(storedAlbum.fechaFin)
    expect(album.fotos).toEqual(storedAlbum.fotos)
  });


  it('delete should remove an album', async () => {
    const album: AlbumEntity = albumsList[0];
    await service.deleteAlbumId(album.id);
     const deletedAlbum: AlbumEntity = await repository.findOne({ where: { id: album.id } })
    expect(deletedAlbum).toBeNull();
  });
});
