import { useMutation } from '@tanstack/react-query';
import {
  addSportsEvent,
  addSportsPersonnel,
  updateSportsEvent,
  updateSportsPersonnel,
} from '../api/sports.api';
import { queryClient } from '@/tanstack/query.client';

export const useAddSportsPersonnel = () => {
  return useMutation({
    mutationFn: addSportsPersonnel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sports-personnel'] });
    },
  });
};

// ----------------------

export const useUpdateSportsPersonnel = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateSportsPersonnel(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sports-personnel'] });
      queryClient.removeQueries({ queryKey: ['selectedSportsPersonnel'] });
    },
  });
};

// ----------------------

export const useAddSportsEvent = () => {
  return useMutation({
    mutationFn: (data: any) => addSportsEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sports-events'] });
    },
  });
};

// ----------------------

export const useUpdateSportsEvent = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateSportsEvent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sports-events'] });
      queryClient.removeQueries({ queryKey: ['selectedSportsEvent'] });
    },
  });
};
