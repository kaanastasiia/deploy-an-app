import { config as dotenvConfig } from 'dotenv';

export interface Configuration {
  database_host: string;
  database_port: string;
  database_username: string;
  database_password: string;
  database_name: string;
  host: string;
  port: string;
}

dotenvConfig({ path: '.env' });

export function configuration(): Configuration {
  return {
    database_host: process.env.DATABASE_HOST,
    database_port: process.env.DATABASE_PORT,
    database_username: process.env.DATABASE_USERNAME,
    database_password: process.env.DATABASE_PASSWORD,
    database_name: process.env.DATABASE_NAME,
    host: process.env.HOST,
    port: process.env.PORT,
  };
}
