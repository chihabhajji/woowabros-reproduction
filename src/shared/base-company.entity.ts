import { BeforeInsert, Column, Entity, PrimaryColumn, TableInheritance } from 'typeorm';
import { CompanyTypeEnum } from './company-type.enum';
import { Allow, IsOptional } from 'class-validator';
import { CustomBaseEntity } from '../db/base.entity';
import { IsEnum, IsObject, IsString, MaxLength, MinLength, ValidateNested } from '@nestjs/class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { GROUP } from '@nestjs-library/crud';
import { CompanyAddressEntity } from './company-address.entity';

@Entity('companies')
@TableInheritance({
  column: {
    type: 'varchar',
    name: 'type',
    enum: CompanyTypeEnum,
  },
})
export abstract class BaseCompany extends CustomBaseEntity {
  @ApiProperty({
    readOnly: true,
    type: String,
    description: 'The id of the company, derived from its name (slugified)',
  })
  @PrimaryColumn({
    type: 'varchar',
  })
  @Allow({ always: true })
  slug: string;

  @ApiProperty({ type: String, description: 'Siren' })
  @Column({ nullable: true })
  @IsString({ always: true })
  @MinLength(9, { always: true })
  @MaxLength(9, { always: true })
  @IsOptional({ always: true })
  siren?: string;

  @ApiProperty({ type: String, description: 'Name' })
  @Column({ nullable: false })
  @IsOptional({ always: true })
  @IsString({ always: true })
  name: string;

  @ApiHideProperty()
  @Exclude()
  @Column({ nullable: false, type: 'enum', enum: CompanyTypeEnum })
  @IsEnum(CompanyTypeEnum, { always: true })
  @IsOptional({ always: true })
  type: CompanyTypeEnum;

  @ApiProperty({ type: String, description: 'Libelle' })
  @Column({ nullable: true })
  @IsString({ groups: [GROUP.UPDATE, GROUP.UPSERT, GROUP.PARAMS] })
  @IsOptional({ groups: [GROUP.CREATE, GROUP.READ_MANY, GROUP.READ_ONE, GROUP.UPDATE] })
  description?: string;

  @ApiProperty({ type: CompanyAddressEntity })
  @IsOptional({ always: true })
  @IsObject({
    always: true,
  })
  @ValidateNested({
    always: true,
  })
  @Column(() => CompanyAddressEntity, { prefix: 'company_address' })
  @Type(() => CompanyAddressEntity)
  companyAddress: CompanyAddressEntity;


  @ApiProperty({ required: false, description: 'The logo url', type: String })
  @Column({ nullable: true })
  @IsOptional({ groups: [GROUP.CREATE, GROUP.UPDATE, GROUP.READ_MANY, GROUP.UPSERT, GROUP.SEARCH] })
  logo?: string;

  @ApiProperty({ type: String, description: 'regional_vat_id' })
  @IsString()
  @IsOptional({ always: true })
  @Column({ nullable: true })
  regional_vat_id?: string;

  protected constructor(type: CompanyTypeEnum) {
    super();
    this.type = type;
    this.companyAddress = new CompanyAddressEntity();
  }
}
