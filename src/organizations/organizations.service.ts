import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CrudService } from '@nestjs-library/crud';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationEntity } from './organization.entity';

@Injectable()
export class OrganizationsService
  extends CrudService<OrganizationEntity>
  implements OnApplicationBootstrap
{
  constructor(
    @InjectRepository(OrganizationEntity)
    repository: Repository<OrganizationEntity>,
  ) {
    super(repository);
  }

  async onApplicationBootstrap() {
    if ((await this.repository.count()) === 0) {
      this.repository.insert([
        new OrganizationEntity({
          name: 'some-org',
          siren: '021425267',
          slug: 'some-org',
          description: 'some description',
          companyAddress: {
            region: 'KR',
            country: 'KR',
          },
        }),
      ]);
    }
  }
}
