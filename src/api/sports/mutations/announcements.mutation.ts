import { useMutation } from '@tanstack/react-query';
import {
  createAnnouncement,
  updateAnnouncement,
} from '../api/announcements.api';
import { queryClient } from '@/api/query.client';
import type { AnnouncementSchema } from '@/schemas/sports/announcements.schema';

export const useCreateAnnouncement = () => {
  return useMutation({
    mutationFn: createAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
};

// ----------------------

type UpdateAnnouncementPayload = {
  id: string;
  data: AnnouncementSchema;
};

export const useUpdateAnnouncement = () => {
  return useMutation({
    mutationFn: ({ id, data }: UpdateAnnouncementPayload) =>
      updateAnnouncement(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      queryClient.removeQueries({ queryKey: ['selectedAnnouncement'] });
    },
  });
};
