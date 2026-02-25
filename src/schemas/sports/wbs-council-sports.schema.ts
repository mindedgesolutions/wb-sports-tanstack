import zod from 'zod';

export const wbsCouncilDesgnationSchema = zod.object({
  boardType: zod.string().min(1, 'Board type is required'),
  name: zod.string().min(1, 'Designation name is required'),
});
export type WbsCouncilDesgnationSchema = zod.infer<
  typeof wbsCouncilDesgnationSchema
>;
