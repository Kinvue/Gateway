import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule } from '@nestjs/microservices';
import { USER_V1_PACKAGE_NAME } from '@kinvue/contracts/dist/gen/user';
import { userGrpcConfig } from 'src/config/grpc/user-grpc.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: USER_V1_PACKAGE_NAME,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: userGrpcConfig,
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
