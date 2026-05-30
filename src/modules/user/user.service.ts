import {
  USER_PACKAGE,
  USER_SERVICE_NAME,
} from '@kinvue/contracts/dist/gen/constants';
import { UserServiceClient } from '@kinvue/contracts/dist/gen/user';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UserService implements OnModuleInit {
  private userClient: UserServiceClient;

  public constructor(
    @Inject(USER_PACKAGE)
    private readonly client: ClientGrpc,
  ) {}

  public onModuleInit() {
    this.userClient =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  public createProfile(data) {
    return this.userClient.createProfile(data);
  }

  public getProfile(userId: string) {
    return this.userClient.getProfile({ userId });
  }

  public getProfileByAuthUserId(authUserId: string) {
    return this.userClient.getProfileByAuthUserId({ authUserId });
  }

  public updateProfile(data) {
    return this.userClient.updateProfile(data);
  }

  public searchUsers(data) {
    return this.userClient.searchUsers(data);
  }

  public getSettings(userId: string) {
    return this.userClient.getSettings({ userId });
  }

  public updateSettings(data) {
    return this.userClient.updateSettings(data);
  }

  public sendFriendRequest(data) {
    return this.userClient.sendFriendRequest(data);
  }

  public respondFriendRequest(data) {
    return this.userClient.respondFriendRequest(data);
  }

  public getFriends(data) {
    return this.userClient.getFriends(data);
  }
}