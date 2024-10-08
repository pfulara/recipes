import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

import Header from '@/components/shared/Header';
import ThemeProvider from '@/providers/ThemeProvider';

const font = Roboto({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Przepisy',
    default: 'Przepisy',
  },
  description: 'Książka kucharska',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ThemeProvider>
        <body
          className={cn(font.className, 'bg-secondary')}
        >
          <Header />
          <main className='p-4 md:px-24'>
            <div className='p-4 rounded-md shadow-md bg-white'>
              {children}
            </div>
          </main>
        </body>
      </ThemeProvider>
    </ClerkProvider>
  );
}
