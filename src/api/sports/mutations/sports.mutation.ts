import { useMutation } from '@tanstack/react-query';
import { addSportsPersonnel, updateSportsPersonnel } from '../api/sports.api';
import { queryClient } from '@/api/query.client';

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
    },
  });
};
