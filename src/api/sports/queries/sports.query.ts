import { useQuery } from '@tanstack/react-query';
import { fetchSportsPersonnel } from '../api/sports.api';

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
