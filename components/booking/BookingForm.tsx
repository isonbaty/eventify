import { useEvent } from '@/utils/store';
import { calculateTotals } from '@/utils/calculateTotals';
import { formatCurrency } from '@/utils/format';
import { Card, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

function BookingForm() {
  const { range, price } = useEvent((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;

  const { subTotal, tax, cleaningFee, orderTotal, totalDays, serviceFee } =
    calculateTotals({ checkIn, checkOut, price: price as number });
  return (
    <Card className='p-8 mb-4'>
      <CardTitle className='mb-4'>Summary</CardTitle>
      {/* <Separator className='mb-4' /> */}
      <FormRow label={`AED ${price} x ${totalDays} days`} amount={subTotal} />
      <FormRow label='Cleaning fee' amount={cleaningFee} />
      <FormRow label='Service fee' amount={serviceFee} />
      <FormRow label='Tax' amount={tax} />
      <Separator className='mt-4' />
      <CardTitle className='mt-4'>
        <FormRow label='Order Total' amount={orderTotal} />
      </CardTitle>
    </Card>
  );
}

function FormRow({ label, amount }: { label: string; amount: number }) {
  return (
    <p className='flex justify-between text-sm mb-2'>
      <span>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </p>
  );
}
export default BookingForm;
