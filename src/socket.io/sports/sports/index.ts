import { socket } from '@/socket.io';
import { queryClient } from '@/tanstack/query.client';

export const spSportsListeners = () => {
  socket.off('sportsPersonnelCreated');
  socket.off('sportsPersonnelUpdated');
  socket.off('sportsPersonnelDeleted');
  socket.off('sportsPersonnelToggled');

  socket.off('sportsEventCreated');
  socket.off('sportsEventUpdated');
  socket.off('sportsEventDeleted');
  socket.off('sportsEventToggled');

  // -----------------------

  socket.on('sportsPersonnelCreated', () => {
    queryClient.invalidateQueries({ queryKey: ['sports-personnel'] });
  });

  socket.on('sportsPersonnelUpdated', () => {
    queryClient.invalidateQueries({ queryKey: ['sports-personnel'] });
  });

  socket.on('sportsPersonnelDeleted', () => {
    queryClient.invalidateQueries({ queryKey: ['sports-personnel'] });
  });

  socket.on('sportsPersonnelToggled', () => {
    queryClient.invalidateQueries({ queryKey: ['sports-personnel'] });
  });

  // -----------------------

  socket.on('sportsEventCreated', () => {
    queryClient.invalidateQueries({ queryKey: ['sports-events'] });
  });

  socket.on('sportsEventUpdated', () => {
    queryClient.invalidateQueries({ queryKey: ['sports-events'] });
  });

  socket.on('sportsEventDeleted', () => {
    queryClient.invalidateQueries({ queryKey: ['sports-events'] });
  });

  socket.on('sportsEventToggled', () => {
    queryClient.invalidateQueries({ queryKey: ['sports-events'] });
  });
};
