import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { faker } from '@faker-js/faker';
import { RedsocialEntity } from 'src/redsocial/redsocial.entity/redsocial.entity';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<UsuarioEntity>;
  let usuariosList: UsuarioEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
    await seedDatabase();
  });


  const seedDatabase = async () => {
    repository.clear();
    usuariosList = [];
    for(let i = 0; i < 5; i++){
        const usuario: UsuarioEntity = await repository.save({
        id: faker.number.bigInt(), 
        nombre: faker.person.firstName(), 
        telefono: faker.lorem.sentence(),
        redsocial: new RedsocialEntity(),
        fotos: []})
        usuariosList.push(usuario);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('create should return a new usuario', async () => {
    const usuario: UsuarioEntity = {
      id: 0,
      nombre: faker.person.firstName(), 
      telefono: faker.lorem.sentence(),
      redsocial: new RedsocialEntity(),
      fotos: []
    }
 
    const newUsuario: UsuarioEntity = await service.createUsuario(usuario);
    expect(newUsuario).not.toBeNull();
 
    const storedUsuario: UsuarioEntity = await repository.findOne({where: {id: newUsuario.id}})
    expect(storedUsuario).not.toBeNull();
    expect(storedUsuario.nombre).toEqual(newUsuario.nombre)
    expect(storedUsuario.telefono).toEqual(newUsuario.telefono)
    expect(storedUsuario.redsocial).toEqual(newUsuario.redsocial)
    expect(storedUsuario.fotos).toEqual(newUsuario.fotos)
  });


  it('findOne should return a usuario by id', async () => {
    const storedUsuario: UsuarioEntity = usuariosList[0];
    const usuario: UsuarioEntity = await service.findUsuarioById(storedUsuario.id);
    expect(usuario).not.toBeNull();
    expect(usuario.nombre).toEqual(storedUsuario.nombre)
    expect(usuario.telefono).toEqual(storedUsuario.telefono)
    expect(usuario.redsocial).toEqual(storedUsuario.redsocial)
    expect(usuario.fotos).toEqual(storedUsuario.fotos)
  });


  it('findAll should return all usuarios', async () => {
    const usuarios: UsuarioEntity[] = await service.findAllUsuarios();
    expect(usuarios).not.toBeNull();
    expect(usuarios).toHaveLength(usuariosList.length);
  });
});
