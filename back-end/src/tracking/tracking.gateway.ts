import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsJwtGuard } from './guards/ws-jwt.guard';
import { TrackingService } from './tracking.service';
import { JoinOrderDto } from './dto/join-order.dto';
import { DriverLocationDto } from './dto/driver-location.dto';
import { UseGuards } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { WsException } from '@nestjs/websockets';
import { DriverSimulatorService } from './driver-simulator.service';


@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket'],
})
export class TrackingGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly trackingService: TrackingService,
              private readonly config: ConfigService,
              private readonly driverSimulator: DriverSimulatorService,

  ) {}
  handleConnection(client: Socket) {
  console.log(" WS connected", client.id);
}

handleDisconnect(client: Socket) {
  console.log(" WS disconnected", client.id);
}


  
  @SubscribeMessage('join_order')
  @UseGuards(WsJwtGuard)
  async joinOrder(
    @MessageBody() body: JoinOrderDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('join_order payload:', body);
    const user = client.data.user; // { sub, role }
    console.log('User joining order:', user);
    //await this.trackingService.assertCanJoinOrder(body.orderId, user);

    const room = `order:${body.orderId}`;
    await client.join(room);

    // Debug utile
     console.log('join_order', body.orderId, 'user', user);

    return { ok: true, room };
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('leave_order')
  async leaveOrder(
    @MessageBody() body: JoinOrderDto,
    @ConnectedSocket() client: Socket,
  ) {
    await client.leave(`order:${body.orderId}`);
    return { ok: true };
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('driver_location')
  async driverLocation(
    @MessageBody() body: DriverLocationDto,
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;

    const update = await this.trackingService.saveAndBroadcastLocation(body, user);

    // broadcast
    this.server.to(`order:${body.orderId}`).emit('driver_location_update', update);

    return { ok: true };
  }

  // Simulation pour tests uniquement en dev
  @UseGuards(WsJwtGuard)
  @SubscribeMessage('simulate_driver_start')
async simulateStart(@MessageBody() body: { orderId: string; everyMs?: number }) {
 console.log("simulate_driver_start payload:", body);
 
const enabled = this.config.get('TRACKING_SIMULATION') 
console.log('Tracking simulation enabled:', enabled);
  if (enabled == false) throw new WsException('SIMULATION_DISABLED');
// 🔥 test: envoyer une update à TOUS (pour vérifier que le front écoute bien)
this.server.emit('driver_location_update', {
  orderId: body.orderId,
  lat: 33.59,
  lng: -7.62,
  ts: Date.now(),
  simulated: true,
});
  

  this.driverSimulator.start(this.server, body.orderId, body.everyMs ?? 2000);
  return { ok: true };
}
 @UseGuards(WsJwtGuard)
@SubscribeMessage('simulate_driver_stop')
async simulateStop() {
  
  const enabled = this.config.get('TRACKING_SIMULATION') === 'true';
  if (!enabled) throw new WsException('SIMULATION_DISABLED');

  this.driverSimulator.stop();
  return { ok: true };
}

}
