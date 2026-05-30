import { USER_PACKAGE, USER_SERVICE_NAME } from '@kinvue/contracts/dist/gen/constants';
import { UserServiceClient } from '@kinvue/contracts/dist/gen/user';
import { Inject, Injectable } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UserService {
    private userClient: UserServiceClient;
    
    public constructor(
        @Inject(USER_PACKAGE)
        private readonly client : ClientGrpc,
    ){}

    public onModuleInit() {
        this.userClient = 
            this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
    }

    public getProfile (userId: string) {
        return this.userClient.getProfile({userId});
    }

    public updateProfile (userId: string) {
        return this.userClient.updateProfile({userId});
    }

    public searchUsers (data) {
        return this.userClient.searchUsers(data);
    }
}
