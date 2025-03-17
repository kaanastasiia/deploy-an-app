import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsModule } from './documents/documents.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { configuration, CONFIG_SCHEMA } from './config';

const {
  database_host,
  database_port,
  database_username,
  database_password,
  database_name,
} = configuration();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: CONFIG_SCHEMA,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: database_host,
      port: Number(database_port),
      username: database_username,
      password: database_password,
      database: database_name,
      entities: ['dist/**/*.entity.js'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    DocumentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
