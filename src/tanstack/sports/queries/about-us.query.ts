import { useQuery } from '@tanstack/react-query';
import {
  fetchAchievements,
  fetchAdminStructure,
  fetchAdminStructureAll,
  fetchKeyPersonnel,
  fetchKeyPersonnelAll,
} from '../api/about-us.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useAchievements = (params?: ParamProps) => {
  return useQuery({
    queryKey: ['achievements', params],
    queryFn: ({ signal }) => {
      return fetchAchievements({ ...params, signal });
    },
  });
};

// ----------------------

export const useAdminStructure = (params?: ParamProps) => {
  return useQuery({
    queryKey: ['admin-structure', params],
    queryFn: ({ signal }) => {
      return fetchAdminStructure({ ...params, signal });
    },
  });
};

// ----------------------

export const useAdminStructureAll = () => {
  return useQuery({
    queryKey: ['admin-structure'],
    queryFn: ({ signal }) => {
      return fetchAdminStructureAll({ signal });
    },
  });
};

// ----------------------

export const useKeyPersonnel = (params?: ParamProps) => {
  return useQuery({
    queryKey: ['key-personnel', params],
    queryFn: ({ signal }) => {
      return fetchKeyPersonnel({ ...params, signal });
    },
  });
};

// ----------------------

export const useKeyPersonnelAll = () => {
  return useQuery({
    queryKey: ['key-personnel'],
    queryFn: ({ signal }) => {
      return fetchKeyPersonnelAll({ signal });
    },
  });
};
