import { customFetch } from '@/api/custom.fetch';

export const sortList = async ({
  api,
  data,
}: {
  api: string;
  data: { id: number; show: number }[];
}) => {
  await customFetch.put(api, data);
  return;
};
