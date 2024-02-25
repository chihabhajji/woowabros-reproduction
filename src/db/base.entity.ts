import { GROUP } from '@nestjs-library/crud';
import { IsDateString, IsOptional } from '@nestjs/class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CustomBaseEntity extends BaseEntity {
  @IsDateString(undefined, {
    groups: [GROUP.READ_MANY, GROUP.READ_ONE],
  })
  @IsOptional({ groups: [GROUP.READ_MANY, GROUP.READ_ONE] })
  @Type(() => Date)
  @CreateDateColumn()
  @ApiProperty({ type: Date, format: 'date-time' })
  declare readonly createdAt?: Date;

  @IsDateString(undefined, {
    groups: [GROUP.READ_MANY, GROUP.READ_ONE],
  })
  @IsOptional({ groups: [GROUP.READ_MANY, GROUP.READ_ONE] })
  @UpdateDateColumn()
  @Type(() => Date)
  @ApiProperty({ type: Date, format: 'date-time' })
  declare readonly updatedAt?: Date;

  @Exclude()
  @IsOptional({ always: true })
  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  @IsDateString(undefined, {
    groups: [GROUP.READ_MANY, GROUP.READ_ONE, GROUP.SEARCH, GROUP.PARAMS],
  })
  @Type(() => Date)
  @ApiHideProperty()
  declare readonly deletedAt?: Date;
}