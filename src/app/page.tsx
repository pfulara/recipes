import { Suspense } from 'react';
import type { Metadata } from 'next';

import HomePage from '@/components/HomePage';
import SearchBar from '@/components/shared/SearchBar';

export default async function Home({
  searchParams,
}: {
  searchParams: { name: string; ingredients: string };
}) {
  return (
    <>
      <SearchBar />
      <Suspense>
        <HomePage searchParams={searchParams} />
      </Suspense>
    </>
  );
}
