import { validEmail, validNumber } from '@/utils/format.validation';
import z from 'zod';

export const wbsCouncilDesgnationSchema = z.object({
  boardType: z.string().min(1, 'Board type is required'),
  name: z.string().min(1, 'Designation name is required'),
});
export type WbsCouncilDesgnationSchema = z.infer<
  typeof wbsCouncilDesgnationSchema
>;

// ----------------------

export const wbsCouncilMemberSchema = z
  .object({
    boardType: z.string().min(1, 'Board type is required'),
    designationId: z.string().min(1, 'Designation is required'),
    name: z.string().min(1, 'Member name is required'),
    designationLabel: z
      .string()
      .max(255, 'Designation label must be less than 255 characters')
      .optional(),
    address: z
      .string()
      .max(255, 'Address must be less than 255 characters')
      .optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    fax: z.string().optional(),
    existingImg: z.string().optional(),
    newImg: z.instanceof(File).optional(),
  })
  .superRefine((data, ctx) => {
    const { phone, email, fax } = data;

    if (phone && !validNumber(phone, 10)) {
      ctx.addIssue({
        code: 'custom',
        path: ['phone'],
        message: 'Phone number must be a valid 10-digit number',
      });

      if (email && !validEmail(email)) {
        ctx.addIssue({
          code: 'custom',
          path: ['email'],
          message: 'Invalid email address',
        });
      }

      if (fax && !validNumber(fax, 10)) {
        ctx.addIssue({
          code: 'custom',
          path: ['fax'],
          message: 'FAX number must be a valid 10-digit number',
        });
      }
    }
  });
export type WbsCouncilMemberSchema = z.infer<typeof wbsCouncilMemberSchema>;
