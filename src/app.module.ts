import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from './db/snake-naming.strategy';
import { BaseCompany } from './shared/base-company.entity';
import { CustomBaseEntity } from './db/base.entity';
import { OrganizationEntity } from './organizations/organization.entity';
import { ClientEntity } from './clients/client.entity';
import { ClientsModule } from './clients/clients.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { RouterModule } from "@nestjs/core";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://fares2business:jg4UXZqdcB6J@ep-spring-tooth-a5jdoiyl.us-east-2.aws.neon.tech/finvo?sslmode=require',
      port: 5432,
      entities: [
        CustomBaseEntity,
        BaseCompany,
        ClientEntity,
        OrganizationEntity,
      ],
      autoLoadEntities: true,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
      schema: 'public',
    }),
    ClientsModule,
    OrganizationsModule,
    RouterModule.register([
      {
        path: 'clients',
        module: ClientsModule,
      },
      {
        path: 'organizations',
        module: OrganizationsModule,
      },
    ])
  ],
})
export class AppModule {}
