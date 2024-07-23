import { v4 as uuidv4 } from 'uuid';

import { getItem } from '@/actions/itemsActions';
import BackButton from '@/components/shared/BackButton';

export default async function RecipeDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { name, ingredients, description } = (await getItem(
    id
  )) as RecipeParams;

  return (
    <div className='p-4'>
      <BackButton />
      <h2 className='font-black text-2xl uppercase'>
        {name}
      </h2>
      <div className='grid md:grid-cols-2 mt-4 gap-4'>
        <div>
          {ingredients.map((ingr) => (
            <div
              key={uuidv4()}
              className='grid grid-cols-2 border-b px-4 py-2 hover:bg-secondary/60'
            >
              <p>{ingr.name}</p>
              <p>{ingr.quantity}</p>
            </div>
          ))}
        </div>
        <div
          className='mt-4 md:mt-0'
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
}
