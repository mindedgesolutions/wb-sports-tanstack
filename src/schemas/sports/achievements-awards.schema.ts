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
