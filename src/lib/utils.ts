import { debounceWait } from '@/const';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Debounce function
export const debounce = (
  callback: () => void,
  delay: number = debounceWait
) => {
  return setTimeout(callback, delay);
};
