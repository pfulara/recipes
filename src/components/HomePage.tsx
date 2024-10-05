import { getItems } from '@/actions/itemsActions';

import ItemCard from '@/components/shared/ItemCard';

export default async function HomePage({
  searchParams,
}: {
  searchParams: { name: string; ingredients: string };
}) {
  const { name, ingredients } = searchParams;
  const items: Recipe[] = await getItems(name, ingredients);

  return (
    <>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {items.map((item) => (
          <ItemCard key={item.$id} item={item} />
        ))}
      </div>
    </>
  );
}
