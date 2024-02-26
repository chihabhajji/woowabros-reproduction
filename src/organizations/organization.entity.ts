import { ChildEntity } from 'typeorm';
import { BaseCompany } from '../shared/base-company.entity';
import { CompanyTypeEnum } from '../shared/company-type.enum';

@ChildEntity(CompanyTypeEnum.Organization)
export class OrganizationEntity extends BaseCompany {
  constructor(payload: Partial<OrganizationEntity>) {
    super(CompanyTypeEnum.Organization);
    Object.assign(this, payload);
  }
}
