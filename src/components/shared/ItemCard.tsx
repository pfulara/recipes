import {
  Card,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import Link from 'next/link';

export default function ItemCard({ item }: { item: any }) {
  return (
    <Card className='hover:shadow-md hover:bg-secondary/40 h-full'>
      <Link href={`/recipes/${item.slug}`}>
        <CardHeader>
          <CardTitle className='text-header'>
            {item.name}
          </CardTitle>
        </CardHeader>
      </Link>
    </Card>
  );
}
