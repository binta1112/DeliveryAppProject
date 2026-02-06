import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import { PushTokenDto } from './dto/push-token.dto';
import { NotificationToken } from './entities/notification-token.entity';
import { Notification } from './entities/notification.entity';
import { User } from '../users/entity/user.entity';

@Injectable()
export class NotificationsService {
  private expo = new Expo();
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(NotificationToken)
    private readonly tokenRepo: Repository<NotificationToken>,
    @InjectRepository(Notification)
    private readonly notifRepo: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async registerToken(userId: number, dto: PushTokenDto) {
    if (!Expo.isExpoPushToken(dto.pushToken)) {
      this.logger.error(`Token invalide: ${dto.pushToken}`);
      return null;
    }

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) return null;

    const existing = await this.tokenRepo.findOne({ where: { pushToken: dto.pushToken } });
    if (existing) {
      existing.user = user;
      return this.tokenRepo.save(existing);
    }

    const token = this.tokenRepo.create({ pushToken: dto.pushToken, user });
    return this.tokenRepo.save(token);
  }

  async getUserNotifications(userId: number) {
    return this.notifRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async sendToUser(userId: number, title: string, body: string, data?: Record<string, any>) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) return null;

    const tokens = await this.tokenRepo.find({ where: { user: { id: userId } } });

    const messages: ExpoPushMessage[] = tokens
      .filter((t) => Expo.isExpoPushToken(t.pushToken))
      .map((t) => ({
        to: t.pushToken,
        sound: 'default',
        title,
        body,
        data,
      }));

    if (messages.length > 0) {
      try {
        const tickets = await this.expo.sendPushNotificationsAsync(messages);
        this.logger.log(`Push envoyée`, tickets);
      } catch (error) {
        this.logger.error('Erreur envoi push', error);
      }
    }

    const notif = this.notifRepo.create({ user, title, body, data });
    await this.notifRepo.save(notif);

    return notif;
  }

  async markAsRead(userId: number, notificationId: string) {
    const notif = await this.notifRepo.findOne({
      where: { id: notificationId, user: { id: userId } },
    });
    if (!notif) return null;

    notif.read = true;
    return this.notifRepo.save(notif);
  }

  async markAllAsRead(userId: number) {
    await this.notifRepo.update({ user: { id: userId } }, { read: true });
    return { success: true };
  }
}