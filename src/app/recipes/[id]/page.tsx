import { v4 as uuidv4 } from 'uuid';

import { getItem } from '@/actions/itemsActions';
import BackButton from '@/components/shared/BackButton';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default async function RecipeDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { name, fases } = (await getItem(id)) as Recipe;

  return (
    <div className='p-4'>
      <BackButton />
      <h2 className='font-black text-header uppercase'>
        {name}
      </h2>
      <Accordion type='single' defaultValue='item-1'>
        {fases.map(
          (
            { $id, name, description, ingredients },
            index
          ) => (
            <AccordionItem
              key={$id}
              value={`item-${index + 1}`}
            >
              <AccordionTrigger className='bg-secondary px-2 mt-2 font-bold !no-underline'>
                {name}
              </AccordionTrigger>
              <AccordionContent>
                <div className='grid md:grid-cols-2 mt-4 gap-4'>
                  <div>
                    {ingredients.map((ingr) => (
                      <div
                        key={uuidv4()}
                        className='grid grid-cols-2 border-b px-4 py-2 hover:bg-secondary/60 text-base'
                      >
                        <p>{ingr.name}</p>
                        <p>{ingr.quantity}</p>
                      </div>
                    ))}
                  </div>
                  <div
                    className='mt-4 md:mt-0 text-base'
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        )}
      </Accordion>
    </div>
  );
}
