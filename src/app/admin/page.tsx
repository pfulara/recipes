import { getItems } from '@/actions/itemsActions';
import AdminAddButton from '@/components/shared/AdminAddButton';

import AdminItemCard from '@/components/shared/AdminItemCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
};

export default async function Admin() {
  const items: Recipe[] = await getItems();

  return (
    <>
      <AdminAddButton />
      {items.map((item) => (
        <AdminItemCard key={item.$id} item={item} />
      ))}
    </>
  );
}
