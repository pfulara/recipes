import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function ItemCard({ item }: { item: any }) {
  return (
    <Link href={`/recipes/${item.id}`}>
      <Card className='hover:shadow-md hover:bg-secondary/40 h-full'>
        <CardHeader>
          <CardTitle>{item.name}</CardTitle>
        </CardHeader>

        <CardContent className='flex gap-2 flex-wrap'>
          {item.tags.map((tag: string) => (
            <Badge key={tag} className='whitespace-nowrap'>
              {tag}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
}
