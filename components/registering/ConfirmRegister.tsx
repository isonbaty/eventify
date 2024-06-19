'use client';
import { useEvent } from '@/utils/store';
import { useAuth, SignInButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import FormContainer from '../form/FormContainer';
import { SubmitButton } from '../form/Buttons';
import { registerEventAction, findExistingRegister } from '@/utils/actions';

function ConfirmRegister() {
  const { userId } = useAuth() as any;
  const { eventId } = useEvent((state) => state);
  const randomNumber = Math.floor(Math.random() * 10000);

  if (!userId)
    return (
      <SignInButton mode='modal'>
        <Button type='button' className='w-full'>
          Sign in to complete booking
        </Button>
      </SignInButton>
    );

  const createRegisteration = registerEventAction.bind(null, {
    eventId,
    raffleNumber: randomNumber,
  });

  return (
    <section className='w-full'>
      <FormContainer action={createRegisteration}>
        <SubmitButton text='Reserve' className='w-full' />
      </FormContainer>
    </section>
  );
}
export default ConfirmRegister;
