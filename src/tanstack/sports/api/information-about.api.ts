import { informationAbout } from '@/constants/sports';
import { customFetch } from '@/tanstack/custom.fetch';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

export const createStadium = async (data: any) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const res = await customFetch.post(
    informationAbout.stadiums.create,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return res.data;
};

// -----------------------------

export const fetchStadiums = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(informationAbout.stadiums.list, {
    params: { page, search },
    signal,
  });
  return res.data.data;
};

// -----------------------------

export const updateStadium = async ({
  data,
  id,
}: {
  data: any;
  id: string;
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
    informationAbout.stadiums.update(Number(id)),
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return res.data;
};
