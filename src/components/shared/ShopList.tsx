'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

const ShopList = ({ fases }: { fases: Fase[] }) => {
  const list: { name: string; quantity: string }[] = [];
  fases.map((fase) =>
    fase.ingredients.map(({ name, quantity }) =>
      list.push({
        name: name || '',
        quantity: quantity || '',
      })
    )
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='font-bold text-lg'>
          Lista zakupów
        </Button>
      </DialogTrigger>
      <DialogContent className='max-md:w-[90%]'>
        <DialogHeader>
          <DialogTitle className='mb-4'>
            Lista zakupów
          </DialogTitle>
          {list
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(({ name, quantity }) => (
              <div
                key={name}
                className='grid grid-cols-2 gap-2 mt-2 border-b py-2'
              >
                <DialogDescription>
                  {name}
                </DialogDescription>
                <DialogDescription>
                  {quantity}
                </DialogDescription>
              </div>
            ))}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShopList;
