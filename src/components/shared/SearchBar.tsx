'use client';
import { useEffect } from 'react';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleX } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().optional(),
  ingredients: z.string().optional(),
});

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: searchParams.get('name') || '',
      ingredients: searchParams.get('ingredients') || '',
    },
  });

  useEffect(() => {
    form.setValue('name', searchParams.get('name') || '');
    form.setValue(
      'ingredients',
      searchParams.get('ingredients') || ''
    );
  }, [searchParams]);

  const onSubmit = async ({
    name,
    ingredients,
  }: z.infer<typeof formSchema>) => {
    if (name || ingredients) {
      let url = `${pathname}?`;
      if (name) url += `name=${name}`;
      if (name && ingredients) url += '&';
      if (ingredients) url += `ingredients=${ingredients}`;

      router.push(url);
    } else {
      router.push(`${pathname}`);
    }
  };

  const clearSearchHandler = () => {
    router.push(`${pathname}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mb-4 flex gap-2 max-md:flex-col'
      >
        <FormField
          name='name'
          control={form.control}
          render={({ field }) => (
            <FormItem className='w-full relative'>
              <FormControl>
                <>
                  <Input
                    placeholder='Nazwa...'
                    {...field}
                  />
                </>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name='ingredients'
          control={form.control}
          render={({ field }) => (
            <FormItem className='w-full relative'>
              <FormControl>
                <>
                  <Input
                    placeholder='Składniki...'
                    {...field}
                  />
                </>
              </FormControl>
            </FormItem>
          )}
        />
        <div className='flex md:w-52 gap-2 items-center max-md:flex-row-reverse max-md:justify-end'>
          {(searchParams.get('ingredients') ||
            searchParams.get('name')) && (
            <CircleX
              color='#b40000'
              className='cursor-pointer'
              onClick={clearSearchHandler}
              size={24}
            />
          )}

          <Button>Wyszukaj</Button>
        </div>
      </form>
    </Form>
  );
}
