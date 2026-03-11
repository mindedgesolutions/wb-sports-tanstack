import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/tanstack/query.client';
import { showError } from '@/utils/show.error';
import { showSuccess } from '@/utils/show.success';
import { sortList } from './sort-list.api';

export const useSortList = (queryKey: string) => {
  return useMutation({
    mutationFn: sortList,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      showSuccess('Entity sorted successfully');
    },

    onError: () => {
      showError('Failed to sort entity. Please try again.');
    },
  });
};
