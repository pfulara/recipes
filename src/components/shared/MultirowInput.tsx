'use client';

import { v4 as uuidv4 } from 'uuid';
import { CirclePlus, CircleX } from 'lucide-react';
import { Input } from '../ui/input';

export default function MultirowInput({
  value,
  onChange,
}: {
  value: RecipeParams['ingredients'];
  onChange: ([
    { id, name, quantity },
  ]: RecipeParams['ingredients']) => any;
}) {
  const fieldChangeHandler = (
    fieldValue: string,
    id: string,
    field: string
  ) => {
    const index = value.findIndex((item) => item.id === id);
    const row = value.find((item) => item.id === id);

    const filteredItems = value.filter(
      (item) => item.id !== id
    );

    if (row) {
      onChange([
        ...filteredItems.slice(0, index),
        { ...row, [field]: fieldValue },
        ...filteredItems.slice(index),
      ]);
    }
  };

  const removeItemHandle = (id: string) => {
    const filteredItems = value.filter(
      (item) => item.id !== id
    );

    onChange(filteredItems || []);
  };

  return (
    <div>
      {value.length ? (
        <div className='mt-4'>
          {value.map((item, index) => (
            <div
              key={item.id}
              className='grid grid-cols-11 gap-2 mb-2'
            >
              <Input
                className='col-span-5'
                placeholder='Nazwa'
                value={item.name}
                onChange={(e) =>
                  fieldChangeHandler(
                    e.target.value,
                    item.id,
                    'name'
                  )
                }
              />
              <Input
                className='col-span-5'
                placeholder='Ilość'
                value={item.quantity}
                onChange={(e) =>
                  fieldChangeHandler(
                    e.target.value,
                    item.id,
                    'quantity'
                  )
                }
              />
              <div className='flex justify-end items-center'>
                {index === value.length - 1 ? (
                  <CirclePlus
                    size={28}
                    className='hover:bg-accent cursor-pointer rounded-full'
                    onClick={() =>
                      onChange([
                        ...value,
                        {
                          id: uuidv4(),
                          name: '',
                          quantity: '',
                        },
                      ])
                    }
                  />
                ) : (
                  <CircleX
                    size={28}
                    className='cursor-pointer hover:bg-accent rounded-full'
                    onClick={() =>
                      removeItemHandle(item.id)
                    }
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Brak składników</p>
      )}
    </div>
  );
}
