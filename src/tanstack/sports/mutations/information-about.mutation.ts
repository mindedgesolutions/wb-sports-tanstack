import { useMutation } from '@tanstack/react-query';
import {
  createAssociation,
  createStadium,
  updateStadium,
} from '../api/information-about.api';
import { queryClient } from '@/tanstack/query.client';

export const useCreateStadium = () => {
  return useMutation({
    mutationFn: createStadium,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stadiums'] });
    },
  });
};

// -----------------------------

type UpdateStadiumProps = {
  data: any;
  id: string;
};

export const useUpdateStadium = () => {
  return useMutation({
    mutationFn: async ({ data, id }: UpdateStadiumProps) =>
      updateStadium({ data, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stadiums'] });
    },
  });
};

// -----------------------------

export const useCreateAssociation = () => {
  return useMutation({
    mutationFn: createAssociation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['associations'] });
    },
  });
};
