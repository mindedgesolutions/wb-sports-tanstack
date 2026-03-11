import { customFetch } from '@/tanstack/custom.fetch';
import { aboutUs } from '@/constants/sports';
import type {
  AchievementSchema,
  AdminStructureSchema,
  KeyPersonnelSchema,
} from '@/schemas/sports/about-us.schema';

type ListProps = {
  page?: number;
  search?: string;
  signal?: AbortSignal;
};

// Achievements API starts ------------

export const fetchAchievements = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(aboutUs.achievements.list, {
    params: { page, search },
    signal,
  });
  return res.data.data;
};

// ----------------------

export const createAchievement = async (data: AchievementSchema) => {
  const res = await customFetch.post(aboutUs.achievements.create, data);
  return res.data;
};

// ----------------------

export const updateAchievement = async (
  id: string,
  data: AchievementSchema,
) => {
  const res = await customFetch.put(
    aboutUs.achievements.update(Number(id)),
    data,
  );
  return res.data;
};

// ----------------------

export const deleteAchievement = async (id: string) => {
  const res = await customFetch.delete(aboutUs.achievements.delete(Number(id)));
  return res.data;
};

// Achievements API ends ------------

// Admin Structure API starts ------------

export const fetchAdminStructure = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(aboutUs.adminStructure.list, {
    params: { page, search },
    signal,
  });
  return res.data.data;
};

// ----------------------

export const fetchAdminStructureAll = async ({ signal }: ListProps) => {
  const res = await customFetch.get(aboutUs.adminStructure.listAll, {
    signal,
  });
  return res.data.data;
};

// ----------------------

export const createAdminStructure = async (data: AdminStructureSchema) => {
  const res = await customFetch.post(aboutUs.adminStructure.create, data);
  return res.data;
};

// ----------------------

export const updateAdminStructure = async (
  id: string,
  data: AdminStructureSchema,
) => {
  const res = await customFetch.put(
    aboutUs.adminStructure.update(Number(id)),
    data,
  );
  return res.data;
};

// ----------------------

export const deleteAdminStructure = async (id: string) => {
  const res = await customFetch.delete(
    aboutUs.adminStructure.delete(Number(id)),
  );
  return res.data;
};

// Admin Structure API ends ------------

// Key Personnel API starts ------------

export const fetchKeyPersonnel = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(aboutUs.keyPersonnel.list, {
    params: { page, search },
    signal,
  });
  return res.data.data;
};

// ----------------------

export const fetchKeyPersonnelAll = async ({ signal }: ListProps) => {
  const res = await customFetch.get(aboutUs.keyPersonnel.listAll, {
    signal,
  });
  return res.data.data;
};

// ----------------------

export const addKeyPersonnel = async (data: KeyPersonnelSchema) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const res = await customFetch.post(aboutUs.keyPersonnel.create, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

// ----------------------

export const updateKeyPersonnel = async (
  id: string,
  data: KeyPersonnelSchema,
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
    aboutUs.keyPersonnel.update(Number(id)),
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return res.data;
};
