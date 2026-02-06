import { Body, Controller, Get, Post, Patch, Param, Req, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { PushTokenDto } from './dto/push-token.dto';
import { SendNotificationDto } from './dto/send-notification.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('register-token')
  registerToken(@Req() req, @Body() dto: PushTokenDto) {
    return this.notificationsService.registerToken(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getNotifications(@Req() req) {
    return this.notificationsService.getUserNotifications(req.user.id);
  }

  // endpoint interne (admin / service)
  @Post('send')
  send(@Body() dto: SendNotificationDto) {
    return this.notificationsService.sendToUser(dto.userId, dto.title, dto.body, dto.data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/read')
  markRead(@Req() req, @Param('id') id: string) {
    return this.notificationsService.markAsRead(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('read-all')
  markAllRead(@Req() req) {
    return this.notificationsService.markAllAsRead(req.user.id);
  }
}