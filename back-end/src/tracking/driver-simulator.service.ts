import { Injectable, Logger } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class DriverSimulatorService {
  private readonly logger = new Logger(DriverSimulatorService.name);
  private interval: NodeJS.Timeout | null = null;

  private lat = 33.589886;
  private lng = -7.603869;

  start(server: Server, orderId: string, everyMs = 2000) {
  if (this.interval) {
    this.logger.log('SIM already running (ignored)');
    return;
  }

  this.logger.log(`SIM START order=${orderId} everyMs=${everyMs}`);

  this.interval = setInterval(() => {
    this.lat += 0.0001;
    this.lng += 0.0001;

    this.logger.log(`SIM TICK -> ${this.lat}, ${this.lng}`);

    server.to(`order:${orderId}`).emit('driver_location_update', {
      orderId,
      lat: this.lat,
      lng: this.lng,
      ts: Date.now(),
      simulated: true,
    });
  }, everyMs);
}



  stop() {
    if (!this.interval) return;
    clearInterval(this.interval);
    this.interval = null;
    this.logger.log('🛑 SIM STOP');
  }
}
