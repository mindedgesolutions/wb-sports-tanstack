import { useMutation } from '@tanstack/react-query';
import {
  createAdvertisement,
  createAnnouncement,
  updateAdvertisement,
  updateAnnouncement,
} from '../api/announcements.api';
import { queryClient } from '@/api/query.client';
import type {
  AdvertisementSchema,
  AnnouncementSchema,
} from '@/schemas/sports/announcements.schema';

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

// ----------------------

export const useCreateAdvertisement = () => {
  return useMutation({
    mutationFn: createAdvertisement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advertisements'] });
    },
  });
};

// ----------------------

type UpdateAdvertisementPayload = {
  id: string;
  data: AdvertisementSchema;
};

export const useUpdateAdvertisement = () => {
  return useMutation({
    mutationFn: ({ id, data }: UpdateAdvertisementPayload) =>
      updateAdvertisement(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advertisements'] });
      queryClient.removeQueries({ queryKey: ['selectedAdvertisement'] });
    },
  });
};
