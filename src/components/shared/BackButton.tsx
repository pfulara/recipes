'use client';

import { useRouter } from 'next/navigation';
import { CircleArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      onClick={router.back}
      className='gap-2 text-lg font-bold'
      variant='outline'
    >
      <CircleArrowLeft />
      Powrót
    </Button>
  );
}
