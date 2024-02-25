import { ChildEntity } from 'typeorm';
import { BaseCompany } from '../shared/base-company.entity';
import { CompanyTypeEnum } from '../shared/company-type.enum';

@ChildEntity(CompanyTypeEnum.Organization)
export class OrganizationEntity extends BaseCompany {
  constructor() {
    super(CompanyTypeEnum.Organization);
  }
}
