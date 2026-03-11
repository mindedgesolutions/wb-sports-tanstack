import { useQuery } from '@tanstack/react-query';
import { fetchSportsEvents, fetchSportsPersonnel } from '../api/sports.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useSportsPersonnel = (params?: ParamProps) => {
  return useQuery({
    queryKey: ['sports-personnel', params],
    queryFn: ({ signal }) => {
      return fetchSportsPersonnel({ ...params, signal });
    },
  });
};

// ----------------------

export const useSportsEvents = (params?: ParamProps) => {
  return useQuery({
    queryKey: ['sports-events', params],
    queryFn: ({ signal }) => {
      return fetchSportsEvents({ ...params, signal });
    },
  });
};
