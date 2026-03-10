import { customFetch } from '@/api/custom.fetch';
import { achievementsAwards } from '@/constants/sports';
import type { PlayerAchievementSchema } from '@/schemas/sports/achievements-awards.schema';

type ListProps = {
  page?: number;
  search?: string;
  signal?: AbortSignal;
};

export const createPlayerAchievements = async (
  data: PlayerAchievementSchema,
) => {
  const res = await customFetch.post(
    achievementsAwards.playerAchievements.create,
    data,
  );
  return res.data;
};

// ----------------------

export const fetchPlayerAchievements = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(
    achievementsAwards.playerAchievements.list,
    { params: { page, search }, signal },
  );
  return res.data.data;
};

// ----------------------

export const updatePlayerAchievements = async (
  id: string,
  data: PlayerAchievementSchema,
) => {
  const res = await customFetch.put(
    achievementsAwards.playerAchievements.update(Number(id)),
    data,
  );
  return res.data;
};
