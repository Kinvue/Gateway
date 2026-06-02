import { Headers, Body, Controller, Ip, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogoutRequest, RefreshRequest } from '@kinvue/contracts/dist/gen/auth';
import { LoginDto, RegisterDto } from 'src/dto/auth/auth.dto';
import { type Response, type Request } from 'express';
import { firstValueFrom } from 'rxjs';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(
    @Body() dto: LoginDto,
    @Headers('user-agent') userAgent: string,
    @Ip() ip: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const authResponse = await firstValueFrom(
      this.authService.login({
        ip,
        userAgent,
        ...dto,
      }),
    );

    this.setRefreshTokenCookie(res, authResponse.refreshToken);

    return {
      accessToken: authResponse.accessToken,
      user: authResponse.user,
    };
  }

  @Post('register')
  public async register(
    @Headers('user-agent') userAgent: string,
    @Ip() ip: string,
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const newDate = {
      ip,
      userAgent,
      ...dto,
    };

    const authResponse = await firstValueFrom(
      this.authService.register(newDate),
    );

    this.setRefreshTokenCookie(res, authResponse.refreshToken);

    return {
      accessToken: authResponse.accessToken,
      user: authResponse.user,
    };
  }

  @Post('refresh')
  public async refresh(
    @Req() req: Request,
    @Headers('user-agent') userAgent: string,
    @Ip() ip: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.refresh_token;

    const authResponse = await firstValueFrom(
      this.authService.refresh(refreshToken)
    );

    this.setRefreshTokenCookie(res, authResponse.refreshToken);

    return authResponse.accessToken; 
  }

  @Post('logout')
  public logout(@Body() dto: LogoutRequest) {
    return this.authService.logout(dto);
  }

  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie(
      'refresh_token',
      refreshToken,
      this.getRefreshTokenCookieOptions(),
    );
  }

  private getRefreshTokenCookieOptions() {
    return {
      httpOnly: true,
      secure: false,
      sameSite: 'lax' as const,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    };
  }
}
