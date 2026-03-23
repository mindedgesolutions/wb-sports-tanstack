import { informationAbout } from '@/constants/sports';
import { customFetch } from '@/tanstack/custom.fetch';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

export const createStadium = async (data: any) => {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('location', data.location);
  if (data.address) {
    formData.append('address', data.address);
  }
  formData.append('newImg', data.newImg);
  if (data.details) {
    formData.append('details', data.details);
  }
  if (data.newGalleryImg?.length) {
    data.newGalleryImg.forEach((file: any) => {
      if (file instanceof File) {
        formData.append('newGalleryImg', file);
      }
    });
  }
  if (data.existingGalleryImg?.length) {
    data.existingGalleryImg.forEach((img: string) => {
      formData.append('existingGalleryImg[]', img);
    });
  }
  if (data.highlights?.length) {
    data.highlights.forEach((highlight: any) => {
      formData.append('highlights[]', highlight.value);
    });
  }

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

// Stadium related APIs end ----------

// Associations related APIs start ----------

export const createAssociation = async (data: any) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });

  const res = await customFetch.post(
    informationAbout.associations.create,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return res.data;
};

// -----------------------------

export const fetchAssociations = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(informationAbout.associations.list, {
    params: { page, search },
    signal,
  });
  return res.data.data;
};
