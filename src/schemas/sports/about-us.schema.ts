import z from 'zod';

// ------------------------

export const achievementSchema = z
  .object({
    title: z
      .string()
      .min(3, 'Title must be at least 3 characters long')
      .max(500, 'Title must be at most 500 characters long'),
    description: z
      .string()
      .max(500, 'Description must be at most 500 characters long')
      .optional(),
    achievementDate: z.date().optional(),
  })
  .superRefine((data, ctx) => {
    const { achievementDate } = data;
    if (achievementDate) {
      const date = new Date(achievementDate);
      const now = new Date();

      if (date > now) {
        ctx.addIssue({
          code: 'custom',
          message: 'Achievement date cannot be in the future',
        });
      }
    }
  });
export type AchievementSchema = z.infer<typeof achievementSchema>;

// ------------------------

export const adminStructureSchema = z.object({
  name: z
    .string()
    .min(1, 'Role name is required')
    .max(255, 'Role name must be at most 255 characters long'),
});
export type AdminStructureSchema = z.infer<typeof adminStructureSchema>;

// ------------------------

export const keyPersonnelSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'Name must be at most 255 characters long'),
  rank: z
    .string()
    .max(255, 'Rank must be at most 255 characters long')
    .optional(),
  designation: z
    .string()
    .min(1, 'Designation is required')
    .max(255, 'Designation must be at most 255 characters long'),
  existingImg: z.string().optional(),
  newImg: z.instanceof(File).optional(),
});
export type KeyPersonnelSchema = z.infer<typeof keyPersonnelSchema>;
