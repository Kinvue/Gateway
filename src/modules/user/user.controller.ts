import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfileDto } from 'src/dto/user/updateProfile.dto';
import { CreateProfileDto } from 'src/dto/user/createProfile.dto';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  public getCurrentProfile() {
    const jwt = "JWT-from_guard";
    const userPlaysholderData = {
      userId: "Id-from-pased-jwt"
    } 
    return this.userService.getProfile(userPlaysholderData.userId);
  }

  @Get('')
  public getProfile(@Query('id') id : string) {
    return this.userService.getProfile(id);
  }


  @Put('me')
  public updateProfile(@Body() body : UpdateProfileDto) {
    return this.userService.updateProfile({
      // userId: 'profile_123',
      ...body,
    });
  }

  @Post('me')
  public createProfile(@Body() body : CreateProfileDto){
    return this.userService.createProfile(body);
  }

  // @Get()
  // public searchUsers(
  //   @Query('username') username?: string,
  //   @Query('displayName') displayName?: string,
  //   @Query('limit') limit?: string,
  //   @Query('offset') offset?: string,
  // ) {
  //   return this.userService.searchUsers({
  //     username,
  //     displayName,
  //     limit: limit ? Number(limit) : undefined,
  //     offset: offset ? Number(offset) : undefined,
  //   });
  // }

  // @Get('settings')
  // public getSettings() {
  //   return this.userService.getSettings('profile_123');
  // }

  // @Put('settings')
  // public updateSettings(@Body() body) {
  //   return this.userService.updateSettings({
  //     userId: 'profile_123',
  //     ...body,
  //   });
  // }
}