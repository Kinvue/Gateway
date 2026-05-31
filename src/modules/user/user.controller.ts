import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfileDto } from 'src/dto/user/updateProfile.dto';
import { CreateProfileDto } from 'src/dto/user/createProfile.dto';
import { UpdateSettingsDto } from 'src/dto/user/updateSettings.dto';
import { SendFriendRequestDto } from 'src/dto/user/sendFriendRequest.dto';
import { RespondFriendRequestDto } from 'src/dto/user/respondFriendRequest.dto';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get('me')
  public getCurrentProfile() {
    // const jwt = "JWT-from_guard";
    const userPlaysholderData = {
      userId: "550e8400-e29b-41d4-a716-446655440000"
    } 
    return this.userService.getProfile(userPlaysholderData.userId);
  }
  @Put('me')
  public updateProfile(@Body() body : UpdateProfileDto) {
    // const jwt = "JWT-from_guard";
    const userPlaysholderData = {
      userId: "550e8400-e29b-41d4-a716-446655440000"
    } 
    return this.userService.updateProfile({
      userId: userPlaysholderData.userId,
      ...body,
    });
  }
  @Post('me')
  public createProfile(@Body() body : CreateProfileDto){
    return this.userService.createProfile({authUserId: "550e8400-e29b-41d4-a716-446655440000", ...body});
  }


  @Get('settings')
  public getSettings() {
    const jwt = "JWT-from_guard";
    const userPlaysholderData = {
      userId: "Id-from-pased-jwt"
    } 
    return this.userService.getSettings(userPlaysholderData.userId);
  }
  @Put('settings')
  public updateSettings(@Body() body : UpdateSettingsDto) {
    const jwt = "JWT-from_guard";
    const userPlaysholderData = {
      userId: "Id-from-pased-jwt"
    } 
    return this.userService.updateSettings({
      userId: userPlaysholderData.userId,
      ...body,
    });
  }


  @Get('search')
  public searchUsers(
    @Query('username') username?: string,
    @Query('displayName') displayName?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.userService.searchUsers({
      username,
      displayName,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    });
  }


  @Post('friends/send')
  public sendFriendRequest(@Body() body : SendFriendRequestDto) {
    const jwt = "JWT-from_guard";
    const userPlaysholderData = { userId: "Id-from-pased-jwt" }
    
    const data = {
      receiverId: body.receiverId,
      requesterId : userPlaysholderData.userId
    }
    return this.userService.sendFriendRequest(data)
  }
  @Post('friends/respond')
  public respondFriendRequest(@Body() body : RespondFriendRequestDto){
    return this.userService.respondFriendRequest(body);
  }
  @Get('friends')
  public getFriends(
    @Query('status') status?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const userPlaceholderData = {
      userId: '550e8400-e29b-41d4-a716-446655440000',
    };

    return this.userService.getFriends({
      userId: userPlaceholderData.userId,
      status,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    });
  }

  @Get(':id')
  public getProfile(@Param('id') id: string) {
    return this.userService.getProfile(id);
  }
}