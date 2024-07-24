import { Suspense } from 'react';

import HomePage from '@/components/HomePage';
import SearchBar from '@/components/shared/SearchBar';

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
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
