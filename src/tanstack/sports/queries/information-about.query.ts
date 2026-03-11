import { useQuery } from '@tanstack/react-query';
import { fetchStadiums } from '../api/information-about.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useStadiums = (params?: ParamProps) => {
  return useQuery({
    queryKey: ['stadiums', params],
    queryFn: ({ signal }) => fetchStadiums({ ...params, signal }),
  });
};
