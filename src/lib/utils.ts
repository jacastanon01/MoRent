import { type ClassValue, clsx } from 'clsx';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addOrReplaceSearchParams = async (
  paramsArray: Record<string, string>[],
  router: AppRouterInstance,
  url?: string,
) => {
  if (!router) return;
  if (!window) return;

  if (!url) {
    url = window.location.pathname;
  }

  const queryParams = new URLSearchParams(window.location.search);

  paramsArray.forEach((param) => {
    const key = Object.keys(param)[0];
    if (!key) throw new Error('Params must have a key');
    const value = param[key];
    if (key && value !== undefined) {
      // Ensure the key is not empty and the value is not undefined
      queryParams.set(key, value);
    }
    if (value === undefined || value === '') {
      queryParams.delete(key);
    }
  });
  router.push(`${url}?${queryParams.toString()}`, { scroll: false });
};

export function convertUTCToLocal(date: Date) {
  const newDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60 * 1000,
  );
  return newDate;
}
