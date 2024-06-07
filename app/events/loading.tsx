'use client';
import { Skeleton } from '@/components/ui/skeleton';

function loading() {
  return <Skeleton className='h-[300px] md:has-[500px] w-full rounded' />;
}

export default loading;
