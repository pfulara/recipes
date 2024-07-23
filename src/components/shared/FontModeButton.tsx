'use client';

import { Button } from '@/components/ui/button';

export default function FontModeButton() {
  const changeModeHandler = async () => {
    const fontSize = await window.localStorage.getItem(
      'fontSize'
    );

    if (fontSize) {
      await window.localStorage.setItem('fontSize', '');
    } else {
      await window.localStorage.setItem('fontSize', 'big');
    }

    location.reload();
  };
  return (
    <Button
      className='flex items-end'
      onClick={changeModeHandler}
    >
      <span className='text-xs'>A</span>
      <span className='text-md'>A</span>
      <span className='text-lg'>A</span>
    </Button>
  );
}
