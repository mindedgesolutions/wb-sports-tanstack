import { customFetch } from '@/tanstack/custom.fetch';
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

// Achievements API ends ---------------

// Awards API starts ---------------

export const createAwards = async (data: any) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const res = await customFetch.post(
    achievementsAwards.awards.create,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return res.data;
};

// -----------------------------

export const fetchAwards = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(achievementsAwards.awards.list, {
    params: { page, search },
    signal,
  });
  return res.data.data;
};

// -----------------------------

export const updateAwards = async (id: string, data: any) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const res = await customFetch.put(
    achievementsAwards.awards.update(Number(id)),
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return res.data;
};
