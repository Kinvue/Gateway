import { Headers, Body, Controller, Ip, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogoutRequest, RefreshRequest } from '@kinvue/contracts/dist/gen/auth';
import { LoginDto, RegisterDto } from 'src/dto/auth/auth.dto';
import { RegisterData } from './types/registerData';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('login')
  public login ( 
    @Body() dto : LoginDto,
    @Headers('user-agent') userAgent: string, 
    @Ip() ip: string,
  ) {
    return this.authService.login({
      ip,
      userAgent,
      ...dto,
    });
  }

  @Post('register')
  public register ( 
    @Headers('user-agent') userAgent: string, 
    @Ip() ip: string,
    @Body() dto : RegisterDto 
  ) {
    const newDate = {
      ip,
      userAgent,
      ...dto
    } as RegisterData
    return this.authService.register(newDate);
  }

  @Post('refresh')
  public refresh ( @Body() dto : RefreshRequest) {
    return this.authService.refresh(dto);
  }

  @Post('logout')
  public logout ( @Body() dto : LogoutRequest ) {
    return this.authService.logout(dto);
  }
}