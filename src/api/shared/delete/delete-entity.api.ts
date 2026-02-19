import { customFetch } from '@/api/custom.fetch';

export const deleteEntity = async (api: string) => {
  await customFetch.delete(api);
  return;
};
