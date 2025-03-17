import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

import { configuration } from './config';

const { host, port } = configuration();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useLogger(app.get(Logger));
  await app.listen(process.env.PORT, process.env.HOST);
  console.info(`Application started. Listening host: ${host}, port: ${port}`);
}
bootstrap();
