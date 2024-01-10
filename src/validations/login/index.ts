import { z } from 'zod';
import { CredentialSchema } from '../registration';

export const LoginSchema = CredentialSchema.omit({ name: true });

export type UserSigninType = z.infer<typeof LoginSchema>;
export interface SigninFormType extends Partial<UserSigninType> {
  form?: string | undefined;
}
