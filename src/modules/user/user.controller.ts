import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfileDto } from 'src/dto/user/updateProfile.dto';
import { UpdateSettingsDto } from 'src/dto/user/updateSettings.dto';
import { SendFriendRequestDto } from 'src/dto/user/sendFriendRequest.dto';
import { RespondFriendRequestDto } from 'src/dto/user/respondFriendRequest.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';



@UseGuards(JwtAuthGuard)
@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  public getCurrentProfile(@Req() req) {
    return this.userService.getProfile(req.user.id,);
  }
  @Put('me')
  public updateProfile(@Body() body : UpdateProfileDto, @Req() req) {
    return this.userService.updateProfile({
      userId: req.user.id,
      ...body,
    });
  }
  // @Post('me')
  // public createProfile(@Body() body : CreateProfileDto){
  //   return this.userService.createProfile({authUserId: "550e8400-e29b-41d4-a716-446655440000", ...body});
  // }


  @Get('settings')
  public getSettings(@Req() req) {
    return this.userService.getSettings(req.user.id);
  }
  @Put('settings')
  public updateSettings(@Req() req, @Body() body : UpdateSettingsDto) {
    return this.userService.updateSettings({
      userId: req.user.id,
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
  public sendFriendRequest(@Req() req, @Body() body : SendFriendRequestDto) {
    const data = {
      receiverId: body.receiverId,
      requesterId : req.user.id
    }
    return this.userService.sendFriendRequest(data)
  }
  @Post('friends/respond')
  public respondFriendRequest(@Body() body : RespondFriendRequestDto){
    return this.userService.respondFriendRequest(body);
  }
  @Get('friends')
  public getFriends(
    @Req() req,
    @Query('status') status?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {

    return this.userService.getFriends({
      userId: req.user.id,
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