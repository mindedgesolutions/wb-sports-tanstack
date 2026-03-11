import { useQuery } from '@tanstack/react-query';
import {
  fetchAdvertisements,
  fetchAnnouncements,
} from '../api/announcements.api';

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

// ----------------------

export const useAdvertisements = (params?: ParamProps) => {
  return useQuery({
    queryKey: ['advertisements', params],
    queryFn: ({ signal }) => fetchAdvertisements({ ...params, signal }),
  });
};
