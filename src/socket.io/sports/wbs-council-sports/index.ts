import { socket } from '@/socket.io';
import { queryClient } from '@/tanstack/query.client';

export const spWbsCoucilSportsListeners = () => {
  socket.off('wcsDesignationCreated');
  socket.off('wcsDesignationUpdated');
  socket.off('wcsDesignationDeleted');
  socket.off('wcsDesignationToggled');

  socket.off('wcsCouncilMemberCreated');
  socket.off('wcsCouncilMemberUpdated');
  socket.off('wcsCouncilMemberDeleted');
  socket.off('wcsCouncilMemberToggled');

  // -----------------------

  socket.on('wcsDesignationCreated', () => {
    queryClient.invalidateQueries({ queryKey: ['wbs-council-designations'] });
  });

  socket.on('wcsDesignationUpdated', () => {
    queryClient.invalidateQueries({ queryKey: ['wbs-council-designations'] });
  });

  socket.on('wcsDesignationDeleted', () => {
    queryClient.invalidateQueries({ queryKey: ['wbs-council-designations'] });
  });

  socket.on('wcsDesignationToggled', () => {
    queryClient.invalidateQueries({ queryKey: ['wbs-council-designations'] });
  });

  // -----------------------

  socket.on('wcsCouncilMemberCreated', () => {
    queryClient.invalidateQueries({ queryKey: ['wbs-council-members'] });
  });

  socket.on('wcsCouncilMemberUpdated', () => {
    queryClient.invalidateQueries({ queryKey: ['wbs-council-members'] });
  });

  socket.on('wcsCouncilMemberDeleted', () => {
    queryClient.invalidateQueries({ queryKey: ['wbs-council-members'] });
  });

  socket.on('wcsCouncilMemberToggled', () => {
    queryClient.invalidateQueries({ queryKey: ['wbs-council-members'] });
  });
};
