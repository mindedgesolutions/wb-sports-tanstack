import { fileSizes, fileTypes } from '@/utils/format.validation';
import z from 'zod';

export const playerAchievementsSchema = z
  .object({
    sport: z.string().min(1, 'Sport is required'),
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    achievementDate: z.coerce.date().optional(),
  })
  .superRefine(({ achievementDate }, ctx) => {
    if (achievementDate && achievementDate > new Date()) {
      ctx.addIssue({
        code: 'custom',
        path: ['achievementDate'],
        message: 'Achievement date cannot be in the future',
      });
    }
  });
export type PlayerAchievementSchema = z.input<typeof playerAchievementsSchema>;

// -------------------------------

export const awardsSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
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
export type AwardsSchema = z.input<typeof awardsSchema>;
