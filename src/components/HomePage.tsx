import { getItems } from '@/actions/itemsActions';

import ItemCard from '@/components/shared/ItemCard';

export default async function HomePage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const { search } = searchParams;
  const items: RecipeParams[] = await getItems(search);

  return (
    <>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
