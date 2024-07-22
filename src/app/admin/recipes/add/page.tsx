'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import MultiitemInput from '@/components/shared/MultiitemInput';
import { Textarea } from '@/components/ui/textarea';
import MultirowInput from '@/components/shared/MultirowInput';
import { addItem } from '@/actions/itemsActions';

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: 'Wymagana nazwa',
  }),
  ingredients: z
    .object({
      id: z.string(),
      name: z.string(),
      quantity: z.string(),
    })
    .array(),
  tags: z.string().array().optional(),
  description: z
    .string()
    .min(2, { message: 'Wymagany opis' }),
});

const AddRecipe = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 'new',
      name: '',
      ingredients: [
        { id: uuidv4(), name: '', quantity: '' },
      ],
      tags: [],
      description: '',
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ) => {
    const newRecipe = await addItem(values);

    if (newRecipe) {
      router.push('/admin');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <FormField
              name='name'
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
            <FormField
              name='tags'
              control={form.control}
              render={({ field }) => (
                <FormItem className='pt-8 relative'>
                  <FormLabel>Tagi</FormLabel>
                  <FormControl>
                    <MultiitemInput
                      placeholder='Tagi'
                      value={field.value || []}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage className='absolute top-7 right-0' />
                </FormItem>
              )}
            />
            <FormField
              name='ingredients'
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
          </div>
          <div>
            <FormField
              name='description'
              control={form.control}
              render={({ field }) => (
                <FormItem className='pt-8 relative h-full'>
                  <FormLabel>Opis</FormLabel>
                  <FormControl>
                    <Textarea
                      className='h-[calc(100%-35px)]'
                      placeholder='Opis'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='absolute top-7 right-0' />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className='col-span-11 flex justify-end mt-4'>
          <Button type='submit'>Zapisz</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddRecipe;
