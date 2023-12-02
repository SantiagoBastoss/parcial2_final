import { Test, TestingModule } from '@nestjs/testing';
import { FotoService } from './foto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto.entity/foto.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { AlbumEntity } from 'src/album/album.entity/album.entity';

describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;
  let fotosList: FotoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
    repository = module.get<Repository<FotoEntity>>(getRepositoryToken(FotoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    fotosList = [];
    for(let i = 0; i < 5; i++){
        const foto: FotoEntity = await repository.save({
          id: "", 
          iso: faker.number.int(), 
          velObturacion: faker.number.int(), 
          apertura: faker.number.int(), 
          fecha: faker.date.anytime(), 
          usuario: faker.number.int(),
          album: faker.number.int()})
        fotosList.push(foto);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('create should return a new foto', async () => {
    const foto: FotoEntity = {
      id: 0,
      iso: faker.number.int(),
      velObturacion: faker.number.int(),
      apertura: faker.number.int(),
      fecha: faker.date.anytime(),      
      usuario: new UsuarioEntity(),
      album: new AlbumEntity(),
    }

    const newFoto: FotoEntity = await service.createFoto(foto);
    expect(newFoto).not.toBeNull();
 
    const storedFoto: FotoEntity = await repository.findOne({where: {id: newFoto.id}})
    expect(storedFoto).not.toBeNull();
    expect(storedFoto.iso).toEqual(newFoto.iso)
    expect(storedFoto.velObturacion).toEqual(newFoto.velObturacion)
    expect(storedFoto.apertura).toEqual(newFoto.apertura)
    expect(storedFoto.fecha).toEqual(newFoto.fecha)
  });


  it('delete should remove a foto', async () => {
    const foto: FotoEntity =  fotosList[0];
    await service.deleteFoto(foto.id);
     const deletedFoto: FotoEntity = await repository.findOne({ where: { id: foto.id } })
    expect(deletedFoto).toBeNull();
  });
});
