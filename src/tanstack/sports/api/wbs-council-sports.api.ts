import { customFetch } from '@/tanstack/custom.fetch';
import { wbsCouncilSports } from '@/constants/sports';
import type {
  WbsCouncilDesgnationSchema,
  WbsCouncilMemberSchema,
} from '@/schemas/sports/wbs-council-sports.schema';

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

// WBS Council Designations API ends ------------

// WBS Council Members API starts ------------

export const fetchWbsCouncilMembers = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(wbsCouncilSports.members.list, {
    params: { page, search },
    signal,
  });
  return res.data.data;
};

// ----------------------

export const addWbsCouncilMember = async (data: WbsCouncilMemberSchema) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const res = await customFetch.post(
    wbsCouncilSports.members.create,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return res.data;
};

// ----------------------

export const updateWbsCouncilMember = async ({
  id,
  data,
}: {
  id: string;
  data: WbsCouncilMemberSchema;
}) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const res = await customFetch.put(
    wbsCouncilSports.members.update(Number(id)),
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return res.data;
};

// WBS Council Members API ends ------------
