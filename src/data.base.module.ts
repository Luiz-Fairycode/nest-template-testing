import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './ormconfig';

export function DatabaseOrmModule(): DynamicModule {
  // noinspection TypeScriptValidateTypes
  return TypeOrmModule.forRoot({
    ...ormconfig,
    autoLoadEntities: true,
  });
}

@Module({
  imports: [DatabaseOrmModule()],
  controllers: [],
  providers: [],
})
export class DataBaseModule {}
