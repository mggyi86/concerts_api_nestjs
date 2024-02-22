import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminsService } from 'src/admins/admins.service';
import { jwtConstants } from '../jwt-constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private adminsService: AdminsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { adminId: string }) {
    const admin = await this.adminsService.findOne(payload.adminId);

    if (!admin) {
      throw new UnauthorizedException();
    }

    return admin;
  }
}
