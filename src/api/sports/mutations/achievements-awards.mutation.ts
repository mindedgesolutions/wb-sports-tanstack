import { useMutation } from '@tanstack/react-query';
import {
  createPlayerAchievements,
  updatePlayerAchievements,
} from '../api/achievements-awards.api';
import { queryClient } from '@/api/query.client';
import type { PlayerAchievementSchema } from '@/schemas/sports/achievements-awards.schema';

export const useCreatePlayerAchievements = () => {
  return useMutation({
    mutationFn: createPlayerAchievements,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['player-achievements'] });
    },
  });
};

// ----------------------

export const useUpdatePlayerAchievements = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PlayerAchievementSchema }) =>
      updatePlayerAchievements(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['player-achievements'] });
      queryClient.removeQueries({ queryKey: ['selectedPlayerAchievement'] });
    },
  });
};
