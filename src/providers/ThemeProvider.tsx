'use client';

import { useEffect, useState } from 'react';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fontSize, setFontSize] = useState('');

  useEffect(() => {
    setFontSize(
      window.localStorage.getItem('fontSize') || ''
    );
  });
  return (
    <html lang='en' className={fontSize}>
      {children}
    </html>
  );
}
