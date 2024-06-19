'use client';

import { useEvent } from '@/utils/store';
import RegisterForm from './RegisterForm';
import ConfirmRegister from './ConfirmRegister';

function registerContainer() {
  return (
    <div className='w-full'>
      <RegisterForm />
      <ConfirmRegister />
    </div>
  );
}
export default registerContainer;
