import { useQuery } from '@tanstack/react-query';
import {
  fetchWbsCouncilDesignations,
  fetchWbsCouncilDesignationsAll,
  fetchWbsCouncilMembers,
} from '../api/wbs-council-sports.api';

type ParamProps = {
  page?: number;
  search?: string;
};

export const useWbsCouncilDesignations = (params?: ParamProps) => {
  return useQuery({
    queryKey: ['wbs-council-designations', params],
    queryFn: ({ signal }) => {
      return fetchWbsCouncilDesignations({ ...params, signal });
    },
  });
};

// ----------------------

export const useWbsCouncilDesignationsAll = () => {
  return useQuery({
    queryKey: ['wbs-council-designations'],
    queryFn: ({ signal }) => {
      return fetchWbsCouncilDesignationsAll({ signal });
    },
  });
};

// ----------------------

export const useWbsCouncilMembers = (params?: ParamProps) => {
  return useQuery({
    queryKey: ['wbs-council-members', params],
    queryFn: ({ signal }) => {
      return fetchWbsCouncilMembers({ ...params, signal });
    },
  });
};
