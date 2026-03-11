import { socket } from '@/socket.io';
import { queryClient } from '@/tanstack/query.client';

export const spAboutUsListeners = () => {
  socket.off('achievement_created');
  socket.off('achievement_updated');
  socket.off('achievement_deleted');
  socket.off('achievement_toggled');

  socket.on('achievementCreated', () => {
    queryClient.invalidateQueries({ queryKey: ['achievements'] });
  });

  socket.on('achievementUpdated', () => {
    queryClient.invalidateQueries({ queryKey: ['achievements'] });
  });

  socket.on('achievementDeleted', () => {
    queryClient.invalidateQueries({ queryKey: ['achievements'] });
  });

  socket.on('achievementToggled', () => {
    queryClient.invalidateQueries({ queryKey: ['achievements'] });
  });
};
