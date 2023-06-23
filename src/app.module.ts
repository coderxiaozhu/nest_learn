import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import * as Joi from 'joi'

const schema = Joi.object({
  DB_PORT: Joi.number().default(3306),
  DB_USERNAME: Joi.string(),
  DB_PASSWORD: Joi.string(),
  DB_DATABASE: Joi.string(),
  DB_TYPE: Joi.string().valid('mysql', 'postgres'),
  DB_HOST: Joi.alternatives().try(Joi.string().ip(), Joi.string().domain())
})

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: schema
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
