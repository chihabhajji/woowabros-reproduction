import { ChildEntity } from 'typeorm';
import { BaseCompany } from '../shared/base-company.entity';
import { CompanyTypeEnum } from '../shared/company-type.enum';

@ChildEntity(CompanyTypeEnum.Client)
export class ClientEntity extends BaseCompany {
  constructor() {
    super(CompanyTypeEnum.Client);
  }
}
