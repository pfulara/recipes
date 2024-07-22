import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '../ui/badge';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import AdminDeleteButton from './AdminDeleteButton';

export default function AdminItemCard({
  item,
}: {
  item: RecipeParams;
}) {
  const { id, name, tags } = item;
  return (
    <Card className='hover:bg-accent mb-4'>
      <CardContent className='grid grid-cols-11 p-0'>
        <Link
          href={`/admin/recipes/${id}`}
          className='col-span-5 p-4'
        >
          <CardTitle className='text-md'>{name}</CardTitle>
        </Link>

        <div className='col-span-5 flex gap-2 p-4'>
          {tags?.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className='flex justify-end p-4'>
          <AdminDeleteButton id={id} name={name} />
        </div>
      </CardContent>
    </Card>
  );
}
