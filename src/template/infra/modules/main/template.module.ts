import { Module } from '@nestjs/common';
import { EnvironmentsModule } from '../environments.module';
import { UsersModule } from '../users.module';

@Module({
  imports: [UsersModule, EnvironmentsModule],
  controllers: [],
  providers: [],
})
export class TemplateModule {}
