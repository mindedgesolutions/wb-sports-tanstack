import { fileSizes, fileTypes } from '@/utils/format.validation';
import z from 'zod';

export const announcementSchema = z
  .object({
    annType: z.string().min(1, 'Announcement type is required'),
    annNo: z.string().min(1, 'Announcement no. is required'),
    subject: z.string().min(1, 'Subject is required'),
    isNew: z.boolean(),
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
    newFile: z.instanceof(File).optional(),
    existingFile: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { startDate, endDate, newFile, existingFile } = data;

    if (!newFile && !existingFile) {
      ctx.addIssue({
        code: 'custom',
        path: ['newFile'],
        message: 'Select a file to upload',
      });
    }

    if (startDate && endDate && startDate > endDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['startDate'],
        message: 'Start date must be before end date',
      });
    }

    if (newFile && newFile.size > fileSizes().max10mb) {
      ctx.addIssue({
        code: 'custom',
        message: 'File size must be less than 10MB',
      });
    }

    if (newFile && !fileTypes().documentTypes.includes(newFile.type)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Invalid file type',
      });
    }
  });
export type AnnouncementSchema = z.infer<typeof announcementSchema>;
