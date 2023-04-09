import { z } from 'zod';

export const TableResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
});

export type TableDto = z.infer<typeof TableResponseSchema>;

export const TableListResponseSchema = z.array(TableResponseSchema);
