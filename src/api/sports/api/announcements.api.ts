import { customFetch } from '@/api/custom.fetch';
import { announcements } from '@/constants/sports';
import type { AnnouncementSchema } from '@/schemas/sports/announcements.schema';

type ListProps = {
  page?: number;
  search?: string;
  signal?: AbortSignal;
};

export const createAnnouncement = async (data: AnnouncementSchema) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const res = await customFetch.post(
    announcements.announcements.create,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return res.data;
};

// -----------------------------

export const fetchAnnouncements = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(announcements.announcements.list, {
    params: { page, search },
    signal,
  });

  return res.data.data;
};

// -----------------------------

export const updateAnnouncement = async (
  id: string,
  data: AnnouncementSchema,
) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const res = await customFetch.put(
    announcements.announcements.update(Number(id)),
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return res.data;
};

// Announcements API ends here -------------------

// Advertisements API starts here -------------------

export const createAdvertisement = async (data: any) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const res = await customFetch.post(
    announcements.advertisements.create,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return res.data;
};

// -----------------------------

export const fetchAdvertisements = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(announcements.advertisements.list, {
    params: { page, search },
    signal,
  });

  return res.data.data;
};

// -----------------------------

export const updateAdvertisement = async (id: string, data: any) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const res = await customFetch.put(
    announcements.advertisements.update(Number(id)),
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return res.data;
};
