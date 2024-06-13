'use client';

import { useEvent } from '@/utils/store';
import ConfirmBooking from './ConfirmBooking';
import BookingForm from './BookingForm';

function BookingContainer() {
  const { range } = useEvent((state) => state);
  if (!range || !range.from || !range.to) return null;
  if (range.to.getDate() === range.from.getDate()) return null; // Prevent booking for the same day only
  return (
    <div className='w-full'>
      <BookingForm />
      <ConfirmBooking />
    </div>
  );
}
export default BookingContainer;
