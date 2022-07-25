import { ConnectionOptions } from 'typeorm';

const ConfigTemplate: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false,
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/**/migrations/**/*.{ts,js}'],
  migrationsTableName: 'migration-template',
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = ConfigTemplate;
