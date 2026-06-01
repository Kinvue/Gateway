import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { UpdateProfileDto } from 'src/dto/user/updateProfile.dto';
import { UpdateSettingsDto } from 'src/dto/user/updateSettings.dto';
import { SendFriendRequestDto } from 'src/dto/user/sendFriendRequest.dto';
import { RespondFriendRequestDto } from 'src/dto/user/respondFriendRequest.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserPayload } from '@kinvue/contracts/dist/gen/auth';

type AuthRequest = Request & {
  user: UserPayload;
};

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  public getCurrentProfile(@Req() req: AuthRequest) {
    return this.userService.getProfile(req.user.userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('me')
  public updateProfile(@Body() body: UpdateProfileDto, @Req() req: AuthRequest) {
    return this.userService.updateProfile({
      userId: req.user.userId,
      ...body,
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('settings')
  public getSettings(@Req() req: AuthRequest) {
    return this.userService.getSettings(req.user.userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('settings')
  public updateSettings(@Req() req: AuthRequest, @Body() body: UpdateSettingsDto) {
    return this.userService.updateSettings({
      userId: req.user.userId,
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('friends/send')
  public sendFriendRequest(
    @Req() req: AuthRequest,
    @Body() body: SendFriendRequestDto,
  ) {
    return this.userService.sendFriendRequest({
      receiverId: body.receiverId,
      requesterId: req.user.userId,
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('friends/respond')
  public respondFriendRequest(@Body() body: RespondFriendRequestDto) {
    return this.userService.respondFriendRequest(body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('friends')
  public getFriends(
    @Req() req: AuthRequest,
    @Query('status') status?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.userService.getFriends({
      userId: req.user.userId,
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