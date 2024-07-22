import { getItems } from '@/actions/itemsActions';

import ItemCard from '@/components/shared/ItemCard';

export default async function Home() {
  const items: RecipeParams[] = await getItems();

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
