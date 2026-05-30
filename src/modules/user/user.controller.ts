import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  public getProfile() {
    return this.userService.getProfile('profile_123');
  }

  @Put('me')
  public updateProfile(@Body() body) {
    return this.userService.updateProfile({
      userId: 'profile_123',
      ...body,
    });
  }

  @Get()
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

  @Get('settings')
  public getSettings() {
    return this.userService.getSettings('profile_123');
  }

  @Put('settings')
  public updateSettings(@Body() body) {
    return this.userService.updateSettings({
      userId: 'profile_123',
      ...body,
    });
  }
}