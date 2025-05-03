import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        logging: ['error', 'warn', 'schema'],
        synchronize: true, // ! permet de creer les tables si non presente
      });

      try {
        await dataSource.initialize();
        Logger.log('connected', '--- DB provider --- ');
        return dataSource;
      } catch (error) {
        Logger.error('failed connection', '--- DB provider --- ');
        throw error;
      }
    },
  },
];
