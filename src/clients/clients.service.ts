import { Injectable } from '@nestjs/common';
import { CrudService } from '@nestjs-library/crud';
import { ClientEntity } from './client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService extends CrudService<ClientEntity> {
  constructor(
    @InjectRepository(ClientEntity) repository: Repository<ClientEntity>,
  ) {
    super(repository);
  }
}
