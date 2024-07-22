import { getItem } from '@/actions/itemsActions';
import React from 'react';

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
    <div>
      <h1 className='font-black text-2xl uppercase'>
        {name}
      </h1>
      <div className='grid md:grid-cols-2 mt-4 gap-4'>
        <div>
          {ingredients.map((ingr) => (
            <div className='grid grid-cols-2 border-b px-4 py-2 hover:bg-secondary/60'>
              <p>{ingr.name}</p>
              <p>{ingr.quantity}</p>
            </div>
          ))}
        </div>
        <div className='mt-4 md:mt-0'>{description}</div>
      </div>
    </div>
  );
}
