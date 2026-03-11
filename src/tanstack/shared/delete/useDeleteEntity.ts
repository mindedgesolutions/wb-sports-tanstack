import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/tanstack/query.client';
import { showError } from '@/utils/show.error';
import { showSuccess } from '@/utils/show.success';
import { deleteEntity } from './delete-entity.api';

export const useDeleteEntity = (queryKey: string, deleteQueryKey: string) => {
  return useMutation({
    mutationFn: ({ url, id }: { url: string; id?: number }) =>
      deleteEntity(url),

    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });

      const selected = queryClient.getQueryData<any>([deleteQueryKey]);

      if (selected?.id === vars?.id) {
        queryClient.removeQueries({
          queryKey: [deleteQueryKey],
        });
      }

      showSuccess('Entity deleted successfully');
    },

    onError: () => {
      showError('Failed to delete entity. Please try again.');
    },
  });
};
