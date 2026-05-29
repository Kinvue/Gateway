import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, LogoutRequest, RefreshRequest, RegisterRequest } from '@kinvue/contracts/dist/gen/auth';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('login')
  public login ( @Body() dto : LoginRequest) {
    return this.authService.login(dto);
  }

  @Post('register')
  public register ( @Body() dto : RegisterRequest ) {
    return this.authService.register
  }

  @Post('refresh')
  public refresh ( @Body() dto : RefreshRequest) {
    return this.authService.refresh
  }

  @Post('logout')
  public logout ( @Body() dto : LogoutRequest ) {
    return this.authService.logout(dto);
  }
}