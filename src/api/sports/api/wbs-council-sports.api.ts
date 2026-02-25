import { customFetch } from '@/api/custom.fetch';
import { wbsCouncilSports } from '@/constants/sports';
import type { WbsCouncilDesgnationSchema } from '@/schemas/sports/wbs-council-sports.schema';

type ListProps = {
  page?: number;
  search?: string;
  signal?: AbortSignal;
};

// WBS Council Designations API starts ------------

export const fetchWbsCouncilDesignations = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(wbsCouncilSports.designations.list, {
    params: { page, search },
    signal,
  });
  return res.data.data;
};

// ----------------------

export const fetchWbsCouncilDesignationsAll = async ({ signal }: ListProps) => {
  const res = await customFetch.get(wbsCouncilSports.designations.listAll, {
    signal,
  });
  return res.data.data;
};

// ----------------------

export const createWbsCouncilDesignation = async (
  data: WbsCouncilDesgnationSchema,
) => {
  const res = await customFetch.post(
    wbsCouncilSports.designations.create,
    data,
  );
  return res.data;
};

// ----------------------

export const updateWbsCouncilDesignation = async ({
  id,
  data,
}: {
  id: string;
  data: WbsCouncilDesgnationSchema;
}) => {
  const res = await customFetch.put(
    wbsCouncilSports.designations.update(Number(id)),
    data,
  );
  return res.data;
};
