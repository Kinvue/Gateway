import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  public getProfile() {
    return this.userService.getProfile("sdhfsdfas");
  }

  @Put('me')
  public updateProfile() {
    return this.userService.updateProfile("sdhfsdfas");
  }

  @Get('')
  public (
    @Query('limit') limit : number,
    @Query('offset') offset : number,
    @Body() body : {email:string, name: string}
  ) {
    return this.userService.searchUsers({
      limit,
      offset,
      ...body
    });
  }
}
