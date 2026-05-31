import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, LogoutRequest, RefreshRequest, RegisterRequest } from '@kinvue/contracts/dist/gen/auth';
import { LoginDto, RegisterDto } from 'src/dto/auth/auth.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('login')
  public login ( @Body() dto : LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  public register ( @Body() dto : RegisterDto ) {
    return this.authService.register(dto);
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