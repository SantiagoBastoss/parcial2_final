import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { RedsocialService } from './redsocial.service';
import { faker } from '@faker-js/faker';
import { RedsocialEntity } from './redsocial.entity/redsocial.entity';

describe('RedsocialService', () => {
  let service: RedsocialService;
  let repository: Repository<RedsocialEntity>;
  let redesList: RedsocialEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RedsocialService],
    }).compile();

    service = module.get<RedsocialService>(RedsocialService);
    repository = module.get<Repository<RedsocialEntity>>(getRepositoryToken(RedsocialEntity));
    await seedDatabase();
  });


  const seedDatabase = async () => {
    repository.clear();
    redesList = [];
    for(let i = 0; i < 5; i++){
        const redsocial: RedsocialEntity = await repository.save({
        id: faker.number.bigInt(), 
        nombre: faker.lorem.sentence(), 
        slogan: faker.lorem.sentence(), 
        usuarios: []})
        redesList.push(redsocial);
    }
  }


  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('create should return a new red social', async () => {
    const redsocial: RedsocialEntity = {
      id: faker.number.int(), 
      nombre: faker.lorem.sentence(), 
      slogan: faker.lorem.sentence(), 
      usuarios: []
    }
 
    const newRedsocial: RedsocialEntity = await service.createLibreria(redsocial);
    expect(newRedsocial).not.toBeNull();
 
    const storedRedsocial: RedsocialEntity = await repository.findOne({where: {id: newRedsocial.id}})
    expect(storedRedsocial).not.toBeNull();
    expect(storedRedsocial.nombre).toEqual(newRedsocial.nombre)
    expect(storedRedsocial.slogan).toEqual(newRedsocial.slogan)
    expect(storedRedsocial.usuarios).toEqual(newRedsocial.usuarios)
  });
});
