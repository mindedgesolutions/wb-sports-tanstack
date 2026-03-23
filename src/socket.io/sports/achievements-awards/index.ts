import { socket } from '@/socket.io';
import { queryClient } from '@/tanstack/query.client';

export const spAchievementsAwardsListeners = () => {
  socket.off('playersAchievementCreated');
  socket.off('playersAchievementUpdated');
  socket.off('playersAchievementDeleted');
  socket.off('playersAchievementToggled');

  socket.off('awardCreated');
  socket.off('awardUpdated');
  socket.off('awardDeleted');
  socket.off('awardToggled');

  // -----------------------

  socket.on('playersAchievementCreated', () => {
    queryClient.invalidateQueries({ queryKey: ['player-achievements'] });
  });

  socket.on('playersAchievementUpdated', () => {
    queryClient.invalidateQueries({ queryKey: ['player-achievements'] });
  });

  socket.on('playersAchievementDeleted', () => {
    queryClient.invalidateQueries({ queryKey: ['player-achievements'] });
  });

  socket.on('playersAchievementToggled', () => {
    queryClient.invalidateQueries({ queryKey: ['player-achievements'] });
  });

  // -----------------------

  socket.on('awardCreated', () => {
    queryClient.invalidateQueries({ queryKey: ['awards'] });
  });

  socket.on('awardUpdated', () => {
    queryClient.invalidateQueries({ queryKey: ['awards'] });
  });

  socket.on('awardDeleted', () => {
    queryClient.invalidateQueries({ queryKey: ['awards'] });
  });

  socket.on('awardToggled', () => {
    queryClient.invalidateQueries({ queryKey: ['awards'] });
  });
};
