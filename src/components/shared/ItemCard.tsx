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
      <Link href={`/recipes/${item.id}`}>
        <CardHeader>
          <CardTitle>{item.name}</CardTitle>
        </CardHeader>
      </Link>

      <CardContent className='flex gap-2 flex-wrap'>
        {item.tags.map((tag: string) => (
          <ItemBadge key={uuidv4()} tag={tag} />
        ))}
      </CardContent>
    </Card>
  );
}
