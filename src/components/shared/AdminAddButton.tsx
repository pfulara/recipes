import { CirclePlus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export const AdminAddButton = () => {
  return (
    <div className='flex justify-end mb-4'>
      <Link href='/admin/recipes/add'>
        <Button className='gap-2'>
          <CirclePlus size={26} /> Nowy przepis
        </Button>
      </Link>
    </div>
  );
};

export default AdminAddButton;
