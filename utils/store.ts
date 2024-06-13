import { create } from 'zustand';
import { Booking, Register } from './types';
import { DateRange } from 'react-day-picker';
// Define the state's shape
type EventState = {
  eventId: string;
  price: number;
  bookings: Booking[];
  register: Register[];
  range: DateRange | undefined;
};

// Create the store
export const useEvent = create<EventState>(() => {
  return {
    eventId: '',
    price: 0,
    bookings: [],
    register: [],
    range: undefined,
  };
});
