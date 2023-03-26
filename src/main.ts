import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService)

  app.setGlobalPrefix('/api/v1')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = config.get<number>('port') | 3000

  await app.listen(port, () => {
    console.log('[WEB]', `http://localhost:${port}`);
  });
}
bootstrap();
