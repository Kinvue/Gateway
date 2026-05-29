import { LoginRequest, LogoutRequest, RefreshRequest, RegisterRequest, type AuthServiceClient } from '@kinvue/contracts/dist/gen/auth';
import { AUTH_PACKAGE, AUTH_SERVICE_NAME } from '@kinvue/contracts/dist/gen/constants';
import { Inject, Injectable } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';

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

    public login ( userCredentials : LoginRequest ) {
        return this.authClient.login(userCredentials);
    }

    public register ( userCredentials : RegisterRequest ) {
        return this.authClient.register(userCredentials);
    }

    public refresh ( userCredentials : RefreshRequest ) {
        return this.authClient.refresh(userCredentials);
    }

    public logout ( userCredentials : LogoutRequest ) {
        return this.authClient.logout(userCredentials);
    }
}
