import {
  USER_PACKAGE,
  USER_SERVICE_NAME,
} from '@kinvue/contracts/dist/gen/constants';
import { CreateProfileRequest, GetFriendsRequest, RespondFriendRequestRequest, SearchUsersRequest, SendFriendRequestRequest, UpdateProfileRequest, UpdateSettingsRequest, UserServiceClient } from '@kinvue/contracts/dist/gen/user';
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


  public createProfile(data : CreateProfileRequest) {
    return this.userClient.createProfile(data);
  }
  public getProfile(userId: string) {
    return this.userClient.getProfile({ userId });
  }
  public getProfileByAuthUserId(authUserId: string) {
    return this.userClient.getProfileByAuthUserId({ authUserId });
  }
  public updateProfile(data : UpdateProfileRequest) {
    return this.userClient.updateProfile(data);
  }
  public searchUsers(data : SearchUsersRequest) {
    return this.userClient.searchUsers(data);
  }


  public getSettings(userId: string) {
    return this.userClient.getSettings({ userId });
  }
  public updateSettings(data: UpdateSettingsRequest) {
    return this.userClient.updateSettings(data);
  }


  public sendFriendRequest(data: SendFriendRequestRequest) {
    return this.userClient.sendFriendRequest(data);
  }
  public respondFriendRequest(data : RespondFriendRequestRequest) {
    return this.userClient.respondFriendRequest(data);
  }
  public getFriends(data: GetFriendsRequest) {
    return this.userClient.getFriends(data);
  }
}