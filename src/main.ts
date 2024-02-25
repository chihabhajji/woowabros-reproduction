import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiDocsConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('APIs for reproduction of the issue')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  SwaggerModule.setup(
    `docs`,
    app,
    SwaggerModule.createDocument(app, apiDocsConfig, {}),
    {
      swaggerOptions: {
        operationsSorter: 'alpha',
        tagsSorter: 'alpha',
        persistAuthorization: true,
      },
      yamlDocumentUrl: `/docs/yaml`,
    },
  );
  await app.listen(3000);
}
bootstrap();
