'use client';
import { useEvent } from '@/utils/store';
import { Booking, Register } from '@/utils/types';
import RegisterCalendar from './RegisterCalendar';
import RegisterContainer from './RegisterContainer';
import { useAuth, SignInButton } from '@clerk/nextjs';

import { useEffect } from 'react';

type EventState = {
  eventId: string;
  price?: number;
  bookings: Booking[];
  register: Register[];
};

type RegisterWrapperProps = EventState;

function RegisterWrapper({
  eventId,
  price,
  bookings,
  register,
}: RegisterWrapperProps) {
  const { userId } = useAuth();

  useEffect(() => {
    const mystate = useEvent.getState();
    console.log('My state:', mystate);

    useEvent.setState({
      eventId,
      price,
      bookings,
      register,
    });
  }, []);

  return (
    <>
      {/* <RegisterCalendar /> */}
      <RegisterContainer />
    </>
  );
}
export default RegisterWrapper;
