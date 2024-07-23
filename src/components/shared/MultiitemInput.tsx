'use client';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CircleX } from 'lucide-react';

export default ({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string[];
  onChange: (values: string[]) => void;
}) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (inputValue.endsWith(',')) {
      onChange([...value, inputValue.slice(0, -1)]);
      setInputValue('');
    }
  }, [inputValue]);

  const removeItemHandler = (item: string) => {
    onChange(value.filter((val) => val !== item));
  };

  return (
    <div>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className='flex gap-1 mt-2 flex-wrap'>
        {value.map((item) => (
          <Badge
            key={uuidv4()}
            className='flex gap-2 pr-1 whitespace-nowrap'
          >
            {item}
            <CircleX
              size={16}
              className='cursor-pointer'
              onClick={() => removeItemHandler(item)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
};
