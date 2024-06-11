import Link from 'next/link';
import { HiOutlineTicket } from 'react-icons/hi2';
import { Button } from '../ui/button';
function Logo() {
  return (
    <>
      <Button asChild className='pt-7 pb-7'>
        <Link href='/'>
          <HiOutlineTicket className='w-10 h-10' />
          <div>
            <span className='text-4xl pl-3 font-bold'> Eventify. </span>
            <span className='text-[11px]'> by DEWA</span>
          </div>
        </Link>
      </Button>
    </>
  );
}
export default Logo;
