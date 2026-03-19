import { socket } from '@/socket.io';
import { queryClient } from '@/tanstack/query.client';

export const spAboutUsListeners = () => {
  socket.off('achievementCreated');
  socket.off('achievementUpdated');
  socket.off('achievementDeleted');
  socket.off('achievementToggled');

  socket.off('adminStructureCreated');
  socket.off('adminStructureUpdated');
  socket.off('adminStructureDeleted');
  socket.off('adminStructureToggled');

  socket.off('keyPersonnelCreated');
  socket.off('keyPersonnelUpdated');
  socket.off('keyPersonnelDeleted');
  socket.off('keyPersonnelToggled');

  // -----------------------

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

  // -----------------------

  socket.on('adminStructureCreated', () => {
    queryClient.invalidateQueries({ queryKey: ['admin-structure'] });
  });

  socket.on('adminStructureUpdated', () => {
    queryClient.invalidateQueries({ queryKey: ['admin-structure'] });
  });

  socket.on('adminStructureDeleted', () => {
    queryClient.invalidateQueries({ queryKey: ['admin-structure'] });
  });

  socket.on('adminStructureToggled', () => {
    queryClient.invalidateQueries({ queryKey: ['admin-structure'] });
  });

  // -----------------------

  socket.on('keyPersonnelCreated', () => {
    queryClient.invalidateQueries({ queryKey: ['key-personnel'] });
  });

  socket.on('keyPersonnelUpdated', () => {
    queryClient.invalidateQueries({ queryKey: ['key-personnel'] });
  });

  socket.on('keyPersonnelDeleted', () => {
    queryClient.invalidateQueries({ queryKey: ['key-personnel'] });
  });

  socket.on('keyPersonnelToggled', () => {
    queryClient.invalidateQueries({ queryKey: ['key-personnel'] });
  });
};
