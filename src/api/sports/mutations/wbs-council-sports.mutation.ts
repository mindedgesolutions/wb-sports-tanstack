import { useMutation } from '@tanstack/react-query';
import {
  createWbsCouncilDesignation,
  updateWbsCouncilDesignation,
} from '../api/wbs-council-sports.api';
import { queryClient } from '@/api/query.client';
import type { WbsCouncilDesgnationSchema } from '@/schemas/sports/wbs-council-sports.schema';

export const useCreateWbsCouncilDesignation = () => {
  return useMutation({
    mutationFn: createWbsCouncilDesignation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wbs-council-designations'] });
    },
  });
};

// ----------------------

type UpdateWbsCouncilDesignationPayload = {
  id: string;
  data: WbsCouncilDesgnationSchema;
};

export const useUpdateWbsCouncilDesignation = () => {
  return useMutation({
    mutationFn: ({ id, data }: UpdateWbsCouncilDesignationPayload) =>
      updateWbsCouncilDesignation({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wbs-council-designations'] });
      queryClient.removeQueries({
        queryKey: ['selectedWbsCouncilDesignation'],
      });
    },
  });
};
