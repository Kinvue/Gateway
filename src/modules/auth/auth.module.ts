import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { authGrpcConfig } from 'src/config';
import { AUTH_V1_PACKAGE_NAME } from '@kinvue/contracts/dist/gen/auth';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: AUTH_V1_PACKAGE_NAME,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: authGrpcConfig,
      }
    ])
  ],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
