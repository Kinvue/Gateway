import { UserPayload } from "@kinvue/contracts/dist/gen/auth";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    const jwtSecret = configService.getOrThrow<string>('JWT_ACCESS_SECRET');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  validate(payload: UserPayload) {
    return {
      userId: payload.userId,
      authId: payload.authId,
      email: payload.email,
      role: payload.role,
      status: payload.status,
    };
  }
}