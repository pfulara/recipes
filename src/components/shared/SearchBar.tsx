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
  search: z.string().optional(),
});

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: searchParams.get('search') || '',
    },
  });

  useEffect(() => {
    form.setValue(
      'search',
      searchParams.get('search') || ''
    );
  }, [searchParams]);

  const onSubmit = async ({
    search,
  }: z.infer<typeof formSchema>) => {
    if (search) {
      router.push(`${pathname}?search=${search}`);
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
        className='mb-4 flex gap-2'
      >
        <FormField
          name='search'
          control={form.control}
          render={({ field }) => (
            <FormItem className='w-full relative'>
              <FormControl>
                <>
                  <Input
                    placeholder='Wyszukaj...'
                    {...field}
                  />
                  {field.value && (
                    <CircleX
                      color='#b40000'
                      className='absolute top-0 right-2 cursor-pointer'
                      onClick={clearSearchHandler}
                    />
                  )}
                </>
              </FormControl>
            </FormItem>
          )}
        />
        <Button>Wyszukaj</Button>
      </form>
    </Form>
  );
}
