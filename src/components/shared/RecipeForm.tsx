'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { addItem, editItem } from '@/actions/itemsActions';
import { generateSlug } from '@/lib/utils';
import RecipeFormFases from './RecipeFormFases';

export const formSchema = z.object({
  $id: z.string().optional(),
  name: z.string().min(2, {
    message: 'Wymagana nazwa',
  }),
  slug: z.string(),
  fases: z
    .object({
      $id: z.string().optional(),
      name: z.string(),
      ingredients: z
        .object({
          $id: z.string().optional(),
          name: z.string().optional(),
          quantity: z.string().optional(),
        })
        .array(),
      description: z
        .string()
        .min(2, { message: 'Wymagany opis' }),
    })
    .array(),
});

const RecipeForm = ({
  defaultValues,
}: {
  defaultValues: z.infer<typeof formSchema>;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    form.setValue(
      'slug',
      generateSlug(form.getValues('name'))
    );
  }, [form.watch('name')]);

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ) => {
    if (values.$id) {
      const newRecipe = await editItem(values);
      if (newRecipe) {
        router.push('/admin');
      }
    } else {
      const newRecipe = await addItem(values);

      if (newRecipe) {
        router.push('/admin');
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
            name='slug'
            control={form.control}
            render={({ field }) => (
              <FormItem className='pt-8 relative'>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Nazwa'
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage className='absolute top-7 right-0' />
              </FormItem>
            )}
          />
          <RecipeFormFases form={form} />
        </div>
        <div className='col-span-11 flex justify-end mt-4'>
          <Button type='submit'>Zapisz</Button>
        </div>
      </form>
    </Form>
  );
};

export default RecipeForm;
