import Link from 'next/link';
import { ChefHat } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className='p-4 flex justify-between'>
      <Link
        href='/'
        className='flex gap-2 items-center bg-white py-2 px-4 rounded-md'
      >
        <ChefHat size={32} strokeWidth={2.25} />
        <h1 className='font-black text-2xl uppercase'>
          Przepisy
        </h1>
      </Link>

      <Button className='flex items-end'>
        <span className='text-xs'>A</span>
        <span className='text-md'>A</span>
        <span className='text-lg'>A</span>
      </Button>
    </header>
  );
}
