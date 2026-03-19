import { socket } from '@/socket.io';
import { queryClient } from '@/tanstack/query.client';

export const spAnnouncementsListeners = () => {
  socket.off('annAnnouncementCreated');
  socket.off('annAnnouncementUpdated');
  socket.off('annAnnouncementDeleted');
  socket.off('annAnnouncementToggled');

  socket.off('anAdvertisementCreated');
  socket.off('anAdvertisementUpdated');
  socket.off('anAdvertisementDeleted');
  socket.off('anAdvertisementToggled');

  // -----------------------

  socket.on('annAnnouncementCreated', () => {
    queryClient.invalidateQueries({ queryKey: ['announcements'] });
  });

  socket.on('annAnnouncementUpdated', () => {
    queryClient.invalidateQueries({ queryKey: ['announcements'] });
  });

  socket.on('annAnnouncementDeleted', () => {
    queryClient.invalidateQueries({ queryKey: ['announcements'] });
  });

  socket.on('annAnnouncementToggled', () => {
    queryClient.invalidateQueries({ queryKey: ['announcements'] });
  });

  // -----------------------

  socket.on('anAdvertisementCreated', () => {
    queryClient.invalidateQueries({ queryKey: ['advertisements'] });
  });

  socket.on('anAdvertisementUpdated', () => {
    queryClient.invalidateQueries({ queryKey: ['advertisements'] });
  });

  socket.on('anAdvertisementDeleted', () => {
    queryClient.invalidateQueries({ queryKey: ['advertisements'] });
  });

  socket.on('anAdvertisementToggled', () => {
    queryClient.invalidateQueries({ queryKey: ['advertisements'] });
  });
};
