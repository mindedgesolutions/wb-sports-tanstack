import { fileSizes, fileTypes } from '@/utils/format.validation';
import z from 'zod';

export const announcementSchema = z
  .object({
    annType: z.string().min(1, 'Announcement type is required'),
    annNo: z.string().min(1, 'Announcement no. is required'),
    subject: z.string().min(1, 'Subject is required'),
    isNew: z.string(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    newFile: z.instanceof(File).optional().or(z.undefined()),
    existingFile: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { startDate, endDate, newFile, existingFile } = data;

    if (!newFile && !existingFile?.length) {
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

    if (newFile) {
      if (newFile.size > fileSizes().max10mb) {
        ctx.addIssue({
          code: 'custom',
          path: ['newFile'],
          message: 'File size must be less than 10MB',
        });
      }

      if (!fileTypes().documentTypes.includes(newFile.type)) {
        ctx.addIssue({
          code: 'custom',
          path: ['newFile'],
          message: 'Invalid file type',
        });
      }
    }
  });
export type AnnouncementSchema = z.input<typeof announcementSchema>;

// ----------------------

export const advertisementSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(255, 'Title must be less than 255 characters'),
    description: z
      .string()
      .max(500, 'Description must be less than 500 characters')
      .optional(),
    adDate: z.coerce.date().optional(),
    newFile: z.instanceof(File).optional().or(z.undefined()),
    existingFile: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { newFile, existingFile } = data;

    if (!newFile && !existingFile?.length) {
      ctx.addIssue({
        code: 'custom',
        path: ['newFile'],
        message: 'Select a file to upload',
      });
    }

    if (newFile) {
      if (newFile.size > fileSizes().max10mb) {
        ctx.addIssue({
          code: 'custom',
          path: ['newFile'],
          message: 'File size must be less than 10MB',
        });
      }

      if (!fileTypes().documentTypes.includes(newFile.type)) {
        ctx.addIssue({
          code: 'custom',
          path: ['newFile'],
          message: 'Invalid file type',
        });
      }
    }
  });
export type AdvertisementSchema = z.input<typeof advertisementSchema>;
