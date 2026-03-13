import { fileSizes, fileTypes } from '@/utils/format.validation';
import z from 'zod';

export const stadiumSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Stadium name is required')
      .max(255, 'Stadium name must be at most 255 characters long'),
    location: z
      .string()
      .min(1, 'Stadium location is required')
      .max(255, 'Stadium location must be at most 255 characters long'),
    address: z
      .string()
      .max(500, 'Address must be at most 500 characters long')
      .optional(),
    existingImg: z.string().optional(),
    newImg: z.instanceof(File).optional(),
    details: z.string().optional(),
    newGalleryImg: z.array(z.instanceof(File)).optional(),
    existingGalleryImg: z.array(z.string()).optional(),
    highlights: z.array(
      z.object({
        value: z
          .string()
          .max(500, 'Highlight must be at most 500 characters long'),
      }),
    ),
  })
  .superRefine((data, ctx) => {
    const { newImg, existingImg } = data;

    if (!existingImg && !newImg) {
      ctx.addIssue({
        code: 'custom',
        path: ['newImg'],
        message: 'Cover image is required',
      });
    }

    if (newImg && fileTypes().imageTypes.indexOf(newImg.type) === -1) {
      ctx.addIssue({
        code: 'custom',
        path: ['newImg'],
        message: 'Invalid file type. Please upload a valid image.',
      });
    }

    if (newImg && fileSizes().max2mb < newImg.size) {
      ctx.addIssue({
        code: 'custom',
        path: ['newImg'],
        message: `File size exceeds the maximum limit of 2 MB.`,
      });
    }
  });
export type StadiumSchema = z.infer<typeof stadiumSchema>;
