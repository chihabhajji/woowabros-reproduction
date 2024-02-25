import { IsISO31661Alpha2, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class CompanyAddressEntity {
  @ApiProperty({ type: String, description: 'ISO 31661 Alpha2 representing the country', required: false })
  @Column({
    nullable: true,
  })
  @IsISO31661Alpha2({ always: true, message: 'Veuillez saisire une paye valide' })
  @IsOptional({ always: true })
  country?: string;

  @ApiProperty({ type: String, description: 'region' })
  @IsString()
  @IsOptional({ always: true })
  @Column({ nullable: true })
  region?: string;
}
