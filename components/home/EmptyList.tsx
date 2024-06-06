import React from 'react';

import { Button } from '../ui/button';
import Link from 'next/link';

function EmptyList({
  heading = 'No items found in the list',
  message = 'Keep looking, you might find something you like',
  btnText = 'back home',
}: {
  heading?: string;
  message?: string;
  btnText?: string;
}) {
  return (
    <div className='mt-4'>
      <h2 className='text-xl font-bold'>{heading}</h2>
      <p className='text-lg'>{message}</p>
      <Button asChild className='mt-4 capitalize'>
        <Link href='/'>{btnText}</Link>
      </Button>
    </div>
  );
}
export default EmptyList;
