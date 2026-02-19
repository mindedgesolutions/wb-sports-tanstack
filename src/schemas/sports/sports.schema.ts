import { sportsCategories } from '@/constants';
import { validNumber } from '@/utils/format.validation';
import z from 'zod';

const allowed = sportsCategories.map((item) => item.value);

export const sportsPersonnelSchema = z
  .object({
    sport: z.string().min(1, 'Sports category is required'),
    name: z
      .string()
      .min(1, 'Name is required')
      .max(255, 'Name must be less than 255 characters'),
    address: z
      .string()
      .max(255, 'Address must be less than 255 characters')
      .optional(),
    dob: z.date().optional(),
    contactOne: z
      .string()
      .optional()
      .refine((value) => validNumber(value, 10), {
        message: 'Contact no. must be a valid 10-digit mobile no.',
      }),
    contactTwo: z
      .string()
      .optional()
      .refine((value) => validNumber(value, 10), {
        message: 'Contact no. must be a valid 10-digit mobile no.',
      }),
  })
  .superRefine((data, ctx) => {
    const { sport, dob } = data;

    if (!allowed.includes(sport)) {
      ctx.addIssue({
        code: 'custom',
        path: ['sport'],
        message: 'Invalid sports category',
      });
    }

    if (dob) {
      const bdate = new Date(dob);
      const now = new Date();
      if (bdate > now) {
        ctx.addIssue({
          code: 'custom',
          path: ['dob'],
          message: 'Date of birth cannot be in the future',
        });
      }
    }
  });
export type SportsPersonnelSchema = z.infer<typeof sportsPersonnelSchema>;
