import { z } from 'zod';

export const CredentialSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(3, { message: 'Password must be at least 3 characters' }),
});

export type UserCredential = z.infer<typeof CredentialSchema>;
export interface RegisterFormType extends Partial<UserCredential> {
  form?: string | undefined;
}
