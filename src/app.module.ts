import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { FirebaseAuthStrategy } from './core/guards/firebase/firebase-auth.strategy';
import { HttpExceptionFilter } from './core/exceptions/http-exception.filter';
import { DataBaseModule } from './data.base.module';
import { TemplateModule } from './template/infra/modules/main/template.module';

@Module({
  imports: [
    TemplateModule,
    DataBaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV == 'production' ? '.env' : `.env.development`,
    }),
  ],
  controllers: [],
  providers: [
    FirebaseAuthStrategy,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
