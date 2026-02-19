import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/api/query.client';
import { showError } from '@/utils/show.error';
import { showSuccess } from '@/utils/show.success';
import { toggleStatus } from './toggle-status.api';

export const useToggleStatus = (queryKey: string) => {
  return useMutation({
    mutationFn: ({ url, checked }: { url: string; checked: boolean }) =>
      toggleStatus(url, checked),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      showSuccess('Status updated successfully');
    },

    onError: () => {
      showError('Failed to update status. Please try again.');
    },
  });
};
