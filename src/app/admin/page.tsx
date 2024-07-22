import { getItems } from '@/actions/itemsActions';
import AdminAddButton from '@/components/shared/AdminAddButton';

import AdminItemCard from '@/components/shared/AdminItemCard';

export default async function Admin() {
  const items: RecipeParams[] = await getItems();

  return (
    <>
      <AdminAddButton />
      {items.map((item) => (
        <AdminItemCard key={item.id} item={item} />
      ))}
    </>
  );
}
