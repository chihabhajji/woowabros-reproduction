import { Controller } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Crud } from '@nestjs-library/crud';
import { ClientEntity } from './client.entity';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('clients')
@Crud({
  entity: ClientEntity,
  logging: true,
  only: ['readMany', 'readOne'],
})
@Controller('clients')
export class ClientsController {
  constructor(private readonly crudService: ClientsService) {}
}
