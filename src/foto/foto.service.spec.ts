import { Test, TestingModule } from '@nestjs/testing';
import { FotoService } from './foto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto.entity/foto.entity';

describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
    repository = module.get<Repository<FotoEntity>>(getRepositoryToken(FotoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('create should return a new foto', async () => {
    const foto: FotoEntity = {
      id: "",
      iso: faker.company.companyName(),
      velObturacion: faker.lorem.sentence(),
      apertura: faker.lorem.sentence(),
      fecha: faker.lorem.date(),
      usuario: [],
      album: []
    }
 
    
  });
});
