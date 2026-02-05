import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient(); // Socket
    const token = client.handshake?.auth?.token;

    if (!token) throw new UnauthorizedException('NO_TOKEN');

    try {
      const payload = this.jwt.verify(token); // même secret que  JwtStrategy
      client.data.user = payload;             // ex: { sub, role, email ... }
      return true;
    } catch {
      throw new UnauthorizedException('INVALID_TOKEN');
    }
  }
}
