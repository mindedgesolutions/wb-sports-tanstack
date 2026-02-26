import { useMutation } from '@tanstack/react-query';
import {
  addWbsCouncilMember,
  createWbsCouncilDesignation,
  updateWbsCouncilDesignation,
  updateWbsCouncilMember,
} from '../api/wbs-council-sports.api';
import { queryClient } from '@/api/query.client';
import type {
  WbsCouncilDesgnationSchema,
  WbsCouncilMemberSchema,
} from '@/schemas/sports/wbs-council-sports.schema';

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

// ----------------------

export const useAddWbsCouncilMember = () => {
  return useMutation({
    mutationFn: addWbsCouncilMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wbs-council-members'] });
    },
  });
};

// ----------------------

type UpdateWbsCouncilMemberPayload = {
  id: string;
  data: WbsCouncilMemberSchema;
};

export const useUpdateWbsCouncilMember = () => {
  return useMutation({
    mutationFn: ({ id, data }: UpdateWbsCouncilMemberPayload) =>
      updateWbsCouncilMember({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wbs-council-members'] });
      queryClient.removeQueries({
        queryKey: ['selectedWbsCouncilDesignation'],
      });
    },
  });
};
