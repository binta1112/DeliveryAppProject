import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    const token = client.handshake?.auth?.token;

    if (!token) {
      
       console.log('WS NO_TOKEN, handshake.auth:', client.handshake?.auth);
      throw new UnauthorizedException('NO_TOKEN');
    }

    try {
      const payload = this.jwt.verify(token); // utilise le secret du JwtModule
      client.data.user = payload;
      return true;
    } catch (e: any) {
       console.log('WS INVALID_TOKEN:', e?.message);
      throw new UnauthorizedException('INVALID_TOKEN');
    }
  }
}
