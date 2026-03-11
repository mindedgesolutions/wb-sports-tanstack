import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/tanstack/query.client';
import {
  createAchievement,
  deleteAchievement,
  updateAchievement,
  createAdminStructure,
  updateAdminStructure,
  deleteAdminStructure,
  updateKeyPersonnel,
  addKeyPersonnel,
} from '../api/about-us.api';
import type {
  AchievementSchema,
  KeyPersonnelSchema,
} from '@/schemas/sports/about-us.schema';

export const useCreateAchievement = () => {
  return useMutation({
    mutationFn: createAchievement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['achievements'] });
    },
  });
};

// ----------------------

type UpdateAchievementPayload = {
  id: string;
  data: AchievementSchema;
};

export const useUpdateAchievement = () => {
  return useMutation({
    mutationFn: ({ id, data }: UpdateAchievementPayload) =>
      updateAchievement(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['achievements'] });
      queryClient.removeQueries({ queryKey: ['selectedAchievement'] });
    },
  });
};

// ----------------------

export const useDeleteAchievement = () => {
  return useMutation({
    mutationFn: deleteAchievement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['achievements'] });
    },
  });
};

// ----------------------

export const useCreateAdminStructure = () => {
  return useMutation({
    mutationFn: createAdminStructure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-structure'] });
    },
  });
};

// ----------------------

type UpdateAdminStructurePayload = {
  id: string;
  data: { name: string };
};

export const useUpdateAdminStructure = () => {
  return useMutation({
    mutationFn: ({ id, data }: UpdateAdminStructurePayload) =>
      updateAdminStructure(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-structure'] });
      queryClient.removeQueries({ queryKey: ['selectedAdminStructure'] });
    },
  });
};

// ----------------------

export const useDeleteAdminStructure = () => {
  return useMutation({
    mutationFn: deleteAdminStructure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-structure'] });
    },
  });
};

// ----------------------

export const useAddKeyPersonnel = () => {
  return useMutation({
    mutationFn: addKeyPersonnel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['key-personnel'] });
    },
  });
};

// ----------------------

type UpdateKeyPersonnelPayload = {
  id: string;
  data: KeyPersonnelSchema;
};

export const useUpdateKeyPersonnel = () => {
  return useMutation({
    mutationFn: ({ id, data }: UpdateKeyPersonnelPayload) =>
      updateKeyPersonnel(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['key-personnel'] });
      queryClient.removeQueries({ queryKey: ['selectedKeyPersonnel'] });
    },
  });
};
