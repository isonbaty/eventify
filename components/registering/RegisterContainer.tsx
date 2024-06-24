'use client';
import ConfirmRegister from './ConfirmRegister';
import { useAuth } from '@clerk/nextjs';
function RegisterContainer() {
  const { userId } = useAuth();

  return (
    <div className='w-full'>
      {userId ? <>{/* <RegisterForm /> */}</> : null}

      <ConfirmRegister />
    </div>
  );
}
export default RegisterContainer;
