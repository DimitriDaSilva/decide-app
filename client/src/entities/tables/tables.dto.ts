import { z } from 'zod';

export const TableResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  updatedAt: z
    .string()
    .datetime()
    .transform((date) => new Date(date)),
});
export type TableResponseDto = z.infer<typeof TableResponseSchema>;

export const TableListResponseSchema = z.array(TableResponseSchema);

export const TableRequestSchema = z.object({
  title: z.string().nonempty(),
});
export type TableRequestDto = z.infer<typeof TableRequestSchema>;
