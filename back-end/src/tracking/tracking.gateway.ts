import {
  WebSocketGateway, WebSocketServer, SubscribeMessage,
  MessageBody, ConnectedSocket,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { WsJwtGuard } from './guards/ws-jwt.guard';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket'],
})
export class TrackingGateway {
  @WebSocketServer() server: Server;

  // 1) rejoindre une commande (customer OU driver)
  @UseGuards(WsJwtGuard)
  @SubscribeMessage('join_order')
  async joinOrder(
    @MessageBody() body: { orderId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `order:${body.orderId}`;

    // ✅ ICI on doit vérifier les droits (Étape 5)
    // ex: await this.checkOrderAccess(body.orderId, client.data.user);

    await client.join(room);
    return { ok: true, room };
  }

  // 2) position envoyée par le livreur
  @UseGuards(WsJwtGuard)
  @SubscribeMessage('driver_location')
  async driverLocation(
    @MessageBody() body: { orderId: string; lat: number; lng: number; ts?: number },
    @ConnectedSocket() client: Socket,
  ) {
    // ✅ ICI on doit vérifier que c’est BIEN le driver assigné (Étape 5)

    this.server.to(`order:${body.orderId}`).emit('driver_location_update', {
      orderId: body.orderId,
      lat: body.lat,
      lng: body.lng,
      ts: body.ts ?? Date.now(),
    });

    return { ok: true };
  }
}
