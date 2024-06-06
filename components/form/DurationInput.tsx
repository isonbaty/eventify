import { Label } from '@/components/ui/label';
import { Input } from '../ui/input';
import { Prisma } from '@prisma/client';

// const name = Prisma.PropertyScalarFieldEnum.price;

type GuestInputProps = {
  defaultValue?: number;
};

function DurationInput({ defaultValue }: GuestInputProps) {
  const name = 'duration';
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        Event Duration in Hours
      </Label>
      <Input
        id={name}
        name={name}
        type='number'
        min={1}
        defaultValue={defaultValue || 1}
        required
      />
    </div>
  );
}
export default DurationInput;
