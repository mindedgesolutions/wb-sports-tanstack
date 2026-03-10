import { useQuery } from '@tanstack/react-query';
import {
  fetchAwards,
  fetchPlayerAchievements,
} from '../api/achievements-awards.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const usePlayerAchievements = (params?: ParamProps) => {
  return useQuery({
    queryKey: ['player-achievements', params],
    queryFn: ({ signal }) => fetchPlayerAchievements({ ...params, signal }),
  });
};

// ----------------------

export const useAwards = (params?: ParamProps) => {
  return useQuery({
    queryKey: ['awards', params],
    queryFn: ({ signal }) => fetchAwards({ ...params, signal }),
  });
};
