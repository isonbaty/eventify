import { Label } from '@/components/ui/label';
import { Input } from '../ui/input';
import { Prisma } from '@prisma/client';

// const name = Prisma.PropertyScalarFieldEnum.price;

type GuestInputProps = {
  defaultValue?: number;
};

function GuestsInput({ defaultValue }: GuestInputProps) {
  const name = 'maxguests';
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        Number of Guests
      </Label>
      <Input
        id={name}
        name={name}
        type='number'
        min={100}
        defaultValue={defaultValue || 100}
        required
      />
    </div>
  );
}
export default GuestsInput;
