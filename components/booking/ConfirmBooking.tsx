'use client';
import { useEvent } from '@/utils/store';
import { useAuth, SignInButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import FormContainer from '../form/FormContainer';
import { SubmitButton } from '../form/Buttons';
import { createBookingAction } from '@/utils/actions';

function ConfirmBooking() {
  const { userId } = useAuth();
  const { eventId, range } = useEvent((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;

  if (!userId)
    return (
      <SignInButton mode='modal'>
        <Button type='button' className='w-full'>
          Sign in to complete booking
        </Button>
      </SignInButton>
    );
  const createBooking = createBookingAction.bind(null, {
    eventId,
    checkIn,
    checkOut,
  });

  return (
    <section className='w-full'>
      <FormContainer action={createBooking}>
        <SubmitButton text='Reserve' className='w-full' />
      </FormContainer>
    </section>
  );
}
export default ConfirmBooking;
