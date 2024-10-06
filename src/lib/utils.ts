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

// Generating slug from name
export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll('ą', 'a')
    .replaceAll('ć', 'c')
    .replaceAll('ę', 'e')
    .replaceAll('ł', 'l')
    .replaceAll('ń', 'n')
    .replaceAll('ó', 'o')
    .replaceAll('ś', 's')
    .replaceAll('ż', 'z')
    .replaceAll('ź', 'z')
    .replace(/[^a-zA-Z-]/g, '');
};
