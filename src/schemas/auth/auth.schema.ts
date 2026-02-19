import { validEmail } from '@/utils/format.validation';
import zod from 'zod';

export const authSchema = zod
  .object({
    username: zod.string().min(1, 'Username is required'),
    password: zod.string().min(1, 'Password is required'),
  })
  .superRefine((data, ctx) => {
    const { username } = data;
    const check = validEmail(username);

    if (username && !check) {
      ctx.addIssue({
        code: 'custom',
        path: ['username'],
        message: 'Invalid email address',
      });
    }
  });
export type AuthSchema = zod.infer<typeof authSchema>;

// ------------------------

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .min(1, 'Name is required')
      .max(50, 'Name must be less than 50 characters'),
    email: zod.string().min(1, 'Email is required'),
    mobile: zod.string().optional(),
    password: zod
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(16, 'Password must be less than 16 characters'),
    department: zod.string().min(1, 'Department is required'),
  })
  .superRefine((data, ctx) => {
    const { email } = data;
    const check = validEmail(email);

    if (email && !check) {
      ctx.addIssue({
        code: 'custom',
        path: ['email'],
        message: 'Invalid email address',
      });
    }
  });
export type RegisterSchema = zod.infer<typeof registerSchema>;
