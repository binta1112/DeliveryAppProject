import { io } from 'socket.io-client';
import StorageService from './storageService';

const SOCKET_URL = 'http://192.168.0.144:3000'; //  l'URL de ton backend

let socket = null;

export const connectTrackingSocket = async () => {
  if (socket?.connected) return socket;

  const token = await StorageService.getAccessToken();
  console.log('Connecting to tracking socket with token:', token);
  socket = io(SOCKET_URL, {
    transports: ['websocket'],
    auth: { token },
    reconnection: true,
    reconnectionAttempts: 10,
  });

  socket.on('connect', () => {
    console.log(' WS connected:', socket.id);
  });

  socket.on('connect_error', (err) => {
    console.log(' WS connect_error:', err?.message);
  });

  socket.on('disconnect', (reason) => {
    console.log(' WS disconnected:', reason);
  });

  return socket;
};


export const joinOrderRoom = (orderId) => {
  if (!socket) return;
  socket.emit('join_order', { orderId });
};

export const sendDriverLocation = ({ orderId, lat, lng, ts }) => {
  if (!socket) return;
  socket.emit('driver_location', { orderId, lat, lng, ts });
};

export const onDriverLocationUpdate = (cb) => {
  if (!socket) return;
  socket.on('driver_location_update', cb);
};

export const disconnectTrackingSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
