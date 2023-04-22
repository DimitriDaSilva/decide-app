import { z } from 'zod';

export type AuthDto = {
  email: string;
  password: string;
};

export const AuthResponseSchema = z.object({
  access_token: z.string(),
});

export type AuthResponseDto = z.infer<typeof AuthResponseSchema>;
