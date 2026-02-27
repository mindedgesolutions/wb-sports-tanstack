export interface AnnouncementProps {
  id: number;
  type: string;
  annNo: string;
  subject: string;
  isNew: boolean;
  startDate: Date | null;
  endDate: Date | null;
  filePath: string;
  fileName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}
