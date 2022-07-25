import { Module } from '@nestjs/common';
import { EnvironmentsController } from 'src/template/api/environments/environments.controller';

@Module({
  imports: [],
  exports: [],
  controllers: [EnvironmentsController],
  providers: [],
})
export class EnvironmentsModule {}
