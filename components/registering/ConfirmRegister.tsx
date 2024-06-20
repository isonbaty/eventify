'use client';
import { useEvent } from '@/utils/store';
import { useAuth, SignInButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import FormContainer from '../form/FormContainer';
import { SubmitButton } from '../form/Buttons';
import { registerEventAction } from '@/utils/actions';
import Link from 'next/link';

function ConfirmRegister() {
  const { userId } = useAuth();
  const { eventId, register } = useEvent((state) => state);
  const randomNumber = Math.floor(Math.random() * 100000);
  const isRegistered = register.find((r) => r.eventId === eventId);
  const isUser = userId === isRegistered?.profileId;
  if (isUser && isRegistered) {
    return (
      <section className='w-full'>
        <p className='text-center text-xs text-muted-foreground'>
          You are registered for this event
          <Button type='button' className='w-full mt-4'>
            <Link href='/bookings'>Your Registrations</Link>
          </Button>
        </p>
      </section>
    );
  }

  // const isRegistered = register.find((r) => r.eventId === eventId);

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
        <SubmitButton text='Register' className='w-full' />
      </FormContainer>
    </section>
  );
}
export default ConfirmRegister;
