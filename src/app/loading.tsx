import { LoadingSpinner } from '@/components/ui/loading-spinner';
import React from 'react';

export default function Loading() {
  return (
    <div className='p-24 flex justify-center items-center'>
      <LoadingSpinner size={48} />
    </div>
  );
}
