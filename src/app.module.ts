import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as Joi from 'joi'
import * as dotenv from 'dotenv'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LogsModule } from './logs/logs.module';
import { RolesModule } from './roles/roles.module';
import { User } from './user/entities/user.entity'
import { configEnum } from './enum/config.enum';

const schema = Joi.object({
  DB_PORT: Joi.number().default(3306),
  DB_USERNAME: Joi.string(),
  DB_PASSWORD: Joi.string(),
  DB_DATABASE: Joi.string(),
  DB_TYPE: Joi.string().valid('mysql', 'postgres'),
  DB_HOST: Joi.alternatives().try(Joi.string().ip(), Joi.string().domain())
})

const envFilePath = '.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: schema,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get(configEnum.DB_TYPE),
        host: configService.get(configEnum.DB_HOST),
        port: configService.get(configEnum.DB_PORT),
        username: configService.get(configEnum.DB_USERNAME),
        password: configService.get(configEnum.DB_PASSWORD),
        database: configService.get(configEnum.DB_DATABASE),
        entities: [User],
        // autoLoadEntities: true,
        synchronize: configService.get(configEnum.DB_SYNC)
      } as TypeOrmModuleOptions)
    }),
    UserModule,
    LogsModule,
    RolesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
