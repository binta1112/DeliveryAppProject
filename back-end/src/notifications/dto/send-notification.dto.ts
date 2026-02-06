export class SendNotificationDto {
  userId: number;
  title: string;
  body: string;
  data?: Record<string, any>;
}