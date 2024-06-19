import { useEvent } from '@/utils/store';
import { calculateTotals } from '@/utils/calculateTotals';
import { formatCurrency } from '@/utils/format';
import { Card, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

function RegisterForm() {
  const { price } = useEvent((state) => state);

  return (
    <Card className='p-8 mb-4'>
      <CardTitle className='mb-4'>Details</CardTitle>
      {/* <Separator className='mb-4' /> */}
      {price > 0 && <FormRow label={`AED ${price} `} />}

      {/* <FormRow label='Cleaning fee' amount={cleaningFee} />
      <FormRow label='Service fee' amount={serviceFee} />
      <FormRow label='Tax' amount={tax} />
      <Separator className='mt-4' />
      <CardTitle className='mt-4'>
        <FormRow label='Order Total' amount={orderTotal} />
      </CardTitle> */}
    </Card>
  );
}
function FormRow({ label }: { label: string }) {
  return (
    <p className='flex justify-between text-sm mb-2'>
      <span>{label}</span>
      {/* <span>{formatCurrency(amount)}</span> */}
    </p>
  );
}
export default RegisterForm;
