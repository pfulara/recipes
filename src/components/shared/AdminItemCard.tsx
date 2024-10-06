import {
  Card,
  CardContent,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import AdminDeleteButton from './AdminDeleteButton';

export default function AdminItemCard({
  item,
}: {
  item: Recipe;
}) {
  const { $id, name, slug } = item;
  return (
    <Card className='hover:bg-accent mb-4 '>
      <CardContent className='flex justify-between p-0'>
        <Link
          href={`/admin/recipes/${slug}`}
          className='p-4 order-1'
        >
          <CardTitle className='text-md'>{name}</CardTitle>
        </Link>
        <div className='flex justify-end p-4 order-1'>
          <AdminDeleteButton id={$id} name={name} />
        </div>
      </CardContent>
    </Card>
  );
}
