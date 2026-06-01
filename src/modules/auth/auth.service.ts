import { LoginRequest, LogoutRequest, RefreshRequest, RegisterRequest, type AuthServiceClient } from '@kinvue/contracts/dist/gen/auth';
import { AUTH_PACKAGE, AUTH_SERVICE_NAME } from '@kinvue/contracts/dist/gen/constants';
import { Inject, Injectable } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import { RegisterData } from './types/registerData';
import { LoginData } from './types/loginData';

@Injectable()
export class AuthService {
    private authClient: AuthServiceClient;
    
    public constructor(
        @Inject(AUTH_PACKAGE)
        private readonly client : ClientGrpc,
    ){}

    public onModuleInit() {
        this.authClient = 
            this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    }

    public login ( newData : LoginData ) {
        const correctDataFormat = {
            email: newData.email,
            password : newData.password,
            clientInfo : {
                ipAddress: newData.ip,
                userAgent: newData.userAgent,
            }
        }
        return this.authClient.login(correctDataFormat as LoginRequest );
    }

    public register ( newData : RegisterData) {
        const correctDataFormat = {
            email: newData.email,
            password : newData.password,
            clientInfo : {
                ipAddress: newData.ip,
                userAgent: newData.userAgent,
                name: newData.name
            }
        }
        return this.authClient.register(correctDataFormat as RegisterRequest);
    }

    public refresh (dto: RefreshRequest) {
        return this.authClient.refresh(dto);
    }

    public logout ( userCredentials : LogoutRequest ) {
        return this.authClient.logout(userCredentials);
    }
}
