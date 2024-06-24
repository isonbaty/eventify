'use client';

import RegisterForm from './RegisterForm';
import RegistrationDetaiils from './RegistrationDetaiils';
import ConfirmRegister from './ConfirmRegister';
import { useAuth } from '@clerk/nextjs';
import dynamic from 'next/dynamic';

function RegisterContainer() {
  const { userId } = useAuth();

  return (
    <div className='w-full'>
      {userId ? (
        <>
          <RegisterForm />
        </>
      ) : null}

      <ConfirmRegister />
    </div>
  );
}
export default RegisterContainer;
