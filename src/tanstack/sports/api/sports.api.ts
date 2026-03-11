import { customFetch } from '@/tanstack/custom.fetch';
import { sports } from '@/constants/sports';
import type {
  SportsEventsSchema,
  SportsPersonnelSchema,
} from '@/schemas/sports/sports.schema';

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

// Sports Personnel API ends ------------

// Sports Events API starts ------------

export const fetchSportsEvents = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(sports.events.list, {
    params: { page, search },
    signal,
  });
  return res.data.data;
};

// ----------------------

export const addSportsEvent = async (data: SportsEventsSchema) => {
  const res = await customFetch.post(sports.events.create, data);
  return res.data;
};

// ----------------------

export const updateSportsEvent = async (
  id: string,
  data: SportsEventsSchema,
) => {
  const res = await customFetch.put(sports.events.update(Number(id)), data);
  return res.data;
};

// Sports Events API ends ------------
