import Link from 'next/link';
import { HiOutlineTicket } from 'react-icons/hi2';
import { Button } from '../ui/button';
function Logo() {
  return (
    <>
      <Button size='icon' asChild>
        <Link href='/'>
          <HiOutlineTicket className='w-6 h-6' />
        </Link>
      </Button>
    </>
  );
}
export default Logo;
