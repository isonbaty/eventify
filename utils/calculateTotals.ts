import { calculateDaysBetween } from './calendar';

type BookingDetails = {
  checkIn: Date;
  checkOut: Date;
  price: number;
};

export const calculateTotals = ({
  checkIn,
  checkOut,
  price,
}: BookingDetails) => {
  const totalDays = calculateDaysBetween({ checkIn, checkOut });
  const subTotal = totalDays * price;
  const tax = subTotal * 0.05;
  const cleaningFee = 40;
  const serviceFee = 21;
  const orderTotal = subTotal + tax + cleaningFee;

  return {
    subTotal,
    tax,
    cleaningFee,
    orderTotal,
    totalDays,
    serviceFee,
  };
};
