import { customFetch } from '@/api/custom.fetch';
import { sports } from '@/constants/sports';
import type { SportsPersonnelSchema } from '@/schemas/sports/sports.schema';

type ListProps = {
  page?: number;
  search?: string;
  signal?: AbortSignal;
};

// Sports Personnel API starts ------------

export const fetchSportsPersonnel = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(sports.sportsPersonnel.list, {
    params: { page, search },
    signal,
  });
  return res.data.data;
};

// ----------------------

export const addSportsPersonnel = async (data: SportsPersonnelSchema) => {
  const res = await customFetch.post(sports.sportsPersonnel.create, data);
  return res.data;
};

// ----------------------

export const updateSportsPersonnel = async (
  id: string,
  data: SportsPersonnelSchema,
) => {
  const res = await customFetch.put(
    sports.sportsPersonnel.update(Number(id)),
    data,
  );
  return res.data;
};
