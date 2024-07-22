'use client';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { debounce } from '@/lib/utils';
import { debounceWait } from '@/const';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(
    searchParams.get('search') || ''
  );

  useEffect(() => {
    const timeoutId = debounce(async () => {
      if (search) {
        router.push(`${pathname}?search=${search}`);
      } else {
        router.push(`${pathname}`);
      }
    }, debounceWait);

    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
  }, [searchParams]);
  return (
    <div className='mb-4'>
      <Input
        placeholder='Wyszukaj...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
