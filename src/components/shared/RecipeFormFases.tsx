'use client';
import { CirclePlus, CircleX } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import MultirowInput from '@/components/shared/MultirowInput';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

type FasesProps = {
  form: any;
};
const RecipeFormFases = ({ form }: FasesProps) => {
  const fases = form.watch('fases');

  const onChangeHandle = () => {
    form.setValue('fases', [
      ...fases,
      {
        $id: uuidv4(),
        name: `Etap ${fases.length + 1}`,
        description: '',
        ingredients: [
          { $id: uuidv4(), name: '', quantity: '' },
        ],
      },
    ]);
  };

  const removeItemHandle = ($id: string) => {
    form.setValue(
      'fases',
      fases.filter((item: Fase) => item.$id !== $id)
    );
  };

  return (
    <Accordion
      type='single'
      defaultValue='item-1'
      className='mt-4'
    >
      {fases.map((fase: Fase, index: number) => (
        <div
          key={fase.$id}
          className='flex items-start gap-2'
        >
          <div className='mt-6'>
            {index === fases.length - 1 ? (
              <CirclePlus
                size={28}
                className='hover:bg-accent cursor-pointer rounded-full'
                onClick={() => onChangeHandle()}
              />
            ) : (
              <CircleX
                color='#b40000'
                size={28}
                className='cursor-pointer hover:bg-accent rounded-full'
                onClick={() =>
                  removeItemHandle(fase.$id || '')
                }
              />
            )}
          </div>
          <AccordionItem
            key={fase.$id}
            value={`item-${index + 1}`}
            className='w-full'
          >
            <AccordionTrigger className='bg-secondary font-bold !no-underline mt-2 px-2'>
              {fase.name}
            </AccordionTrigger>
            <AccordionContent>
              <SingleFase index={index} form={form} />
            </AccordionContent>
          </AccordionItem>
        </div>
      ))}
    </Accordion>
  );
};

const SingleFase = ({
  index,
  form,
}: {
  form: any;
  index: number;
}) => {
  return (
    <div className='px-2'>
      <FormField
        name={`fases.${index}.name`}
        control={form.control}
        render={({ field }) => (
          <FormItem className='pt-8 relative'>
            <FormLabel>Nazwa</FormLabel>
            <FormControl>
              <Input placeholder='Nazwa' {...field} />
            </FormControl>
            <FormMessage className='absolute top-7 right-0' />
          </FormItem>
        )}
      />
      <div className='grid md:grid-cols-2 gap-4'>
        <FormField
          name={`fases.${index}.ingredients`}
          control={form.control}
          render={({ field }) => (
            <FormItem className='pt-8 relative'>
              <FormLabel>Składniki</FormLabel>
              <FormControl>
                <MultirowInput
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage className='absolute top-7 right-0' />
            </FormItem>
          )}
        />
        <FormField
          name={`fases.${index}.description`}
          control={form.control}
          render={({ field }) => (
            <FormItem className='pt-8 relative h-full'>
              <FormLabel>Opis</FormLabel>
              <FormControl>
                <Textarea
                  className='h-[calc(100%-35px)] min-h-[260px]'
                  placeholder='Opis'
                  {...field}
                  value={field.value.replaceAll(
                    '<br />',
                    '\n'
                  )}
                />
              </FormControl>
              <FormMessage className='absolute top-7 right-0' />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default RecipeFormFases;
