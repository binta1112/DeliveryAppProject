import { api } from '../api/client';

export async function registerPushToken(token) {
  const response = await api.post('/notifications/register-token', {
    pushToken: token,
  });
  return response.data;
}