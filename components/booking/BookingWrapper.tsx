'use client';

import { useEvent } from '@/utils/store';
import { Booking, Register } from '@/utils/types';
import BookingCalendar from './BookingCalendar';
import BookingContainer from './BookingContainer';
import { useEffect } from 'react';

type EventState = {
  eventId: string;
  price?: number;
  bookings: Booking[];
  register: Register[];
};

type BookingWrapperProps = EventState;

function BookingWrapper({
  eventId,
  price,
  bookings,
  register,
}: BookingWrapperProps) {
  useEffect(() => {
    useEvent.setState({
      eventId,
      price,
      bookings,
      register,
    });
  }, []);
  return (
    <>
      <BookingContainer />
      <BookingCalendar />
    </>
  );
}
export default BookingWrapper;
