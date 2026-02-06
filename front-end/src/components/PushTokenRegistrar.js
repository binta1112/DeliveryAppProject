import { useEffect } from 'react';
import { usePushNotifications } from '../hooks/usePushNotifications';
import { registerPushToken } from '../services/notificationService';

export default function PushTokenRegistrar() {
  const { expoPushToken } = usePushNotifications();

  useEffect(() => {
    if (expoPushToken) {
      registerPushToken(expoPushToken).catch(console.error);
    }
  }, [expoPushToken]);

  return null;
}