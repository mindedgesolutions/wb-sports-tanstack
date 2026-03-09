export interface AnnouncementProps {
  id: number;
  type: string;
  annNo: string;
  subject: string;
  isNew: boolean | string;
  startDate: Date | null;
  endDate: Date | null;
  filePath: string;
  fileName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

// ----------------------

export interface AdvertisementProps {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  adDate: Date | null;
  filePath: string;
  fileName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}
