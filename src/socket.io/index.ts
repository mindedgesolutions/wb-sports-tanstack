import { titles } from '@/constants';
import { io } from 'socket.io-client';

export const socket = io(titles.IMAGE_URL, {
  autoConnect: false,
  transports: ['websocket'],
});
