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
  const { $id, name, tags } = item;
  return (
    <Card className='hover:bg-accent mb-4 '>
      <CardContent className='grid grid-cols-11 p-0'>
        <Link
          href={`/admin/recipes/${$id}`}
          className='col-span-10 md:col-span-5 p-4 order-1'
        >
          <CardTitle className='text-md'>{name}</CardTitle>
        </Link>

        <div className='col-span-11 md:col-span-5 flex gap-2 p-4 order-2 md:order-1 flex-wrap'>
          {tags?.map((tag) => (
            <Badge key={tag} className='whitespace-nowrap'>
              {tag}
            </Badge>
          ))}
        </div>
        <div className='flex justify-end p-4 order-1'>
          <AdminDeleteButton id={$id} name={name} />
        </div>
      </CardContent>
    </Card>
  );
}
