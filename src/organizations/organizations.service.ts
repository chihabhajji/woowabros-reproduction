import { Injectable } from '@nestjs/common';
import { CrudService } from '@nestjs-library/crud';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationEntity } from './organization.entity';

@Injectable()
export class OrganizationsService extends CrudService<OrganizationEntity> {
  constructor(
    @InjectRepository(OrganizationEntity)
    repository: Repository<OrganizationEntity>,
  ) {
    super(repository);
  }
}
