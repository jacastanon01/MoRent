import { ExtFile } from '@files-ui/core';

export type CreateUserType = {
  name: string | null;
  email: string | null;
  password?: string | null;
};

export type SigninFormTypes = {
  email?: string[] | undefined;
  password?: string[] | undefined;
  form?: string | undefined | null;
};

export type RegisterFormTypes = {
  name?: string[] | undefined;
  email?: string[] | undefined;
  password?: string[] | undefined;
  form?: string | undefined;
};

export type FileUpload = {
  id: 13;
  file: ExtFile;
  name: '347-3473538_orange-star-svg-icon-star-clipart.jpg';
  size: 24924;
  type: 'image/jpeg';
  valid: true;
};
