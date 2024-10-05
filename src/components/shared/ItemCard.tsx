import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import ItemBadge from './ItemBadge';

export default function ItemCard({ item }: { item: any }) {
  return (
    <Card className='hover:shadow-md hover:bg-secondary/40 h-full'>
      <Link href={`/recipes/${item.$id}`}>
        <CardHeader>
          <CardTitle className='text-header'>
            {item.name}
          </CardTitle>
        </CardHeader>
      </Link>

      <CardContent className='flex gap-2 flex-wrap'>
        {item.tags.slice(0, 3).map((tag: string) => (
          <ItemBadge key={uuidv4()} tag={tag} />
        ))}
      </CardContent>
    </Card>
  );
}
