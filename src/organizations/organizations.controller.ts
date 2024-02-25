import { Controller } from '@nestjs/common';
import { Crud } from '@nestjs-library/crud';
import { OrganizationEntity } from './organization.entity';
import { OrganizationsService } from './organizations.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('organizations')
@Crud({
  entity: OrganizationEntity,
  logging: true,
  only: ['readMany', 'readOne'],
  routes: {
    readMany: {
      paginationType: 'offset',
    },
  },
})
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly crudService: OrganizationsService) {}
}
