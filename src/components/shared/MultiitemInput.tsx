'use client';
import {
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Input } from '@/components/ui/input';

export default ({
  placeholder,
  field,
}: {
  placeholder: string;
  field: any;
}) => {
  const [value, setValue] = useState('');

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && ref.current) {
        // changeHandler();
        console.log(ref.current.value);
      }
    };
    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);
  //   const changeHandler = (e) => {
  //     console.log(e);
  //     // setValue(value);
  //   };
  return (
    <Input
      placeholder={placeholder}
      //   {...field}
      ref={ref}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
