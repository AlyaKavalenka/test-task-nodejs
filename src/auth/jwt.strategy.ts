import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { $Enums } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_SECRET,
    });
  }

  async validate(payload: { email: string; sub: number; role: $Enums.Role }) {
    return { email: payload.email, userId: payload.sub, role: payload.role };
  }
}