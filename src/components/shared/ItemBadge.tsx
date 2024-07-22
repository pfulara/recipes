'use client';
import { Badge } from '@/components/ui/badge';
import { usePathname, useRouter } from 'next/navigation';

export default function ItemBadge({
  tag,
}: {
  tag: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchTagHandler = () => {
    router.push(`${pathname}?search=${tag}`);
  };
  return (
    <Badge
      className='whitespace-nowrap'
      onClick={searchTagHandler}
    >
      {tag}
    </Badge>
  );
}
