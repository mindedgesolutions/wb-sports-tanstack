import { useQuery } from '@tanstack/react-query';
import { fetchAnnouncements } from '../api/announcements.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useAnnouncements = (params?: ParamProps) => {
  return useQuery({
    queryKey: ['announcements', params],
    queryFn: ({ signal }) => {
      return fetchAnnouncements({ ...params, signal });
    },
  });
};
