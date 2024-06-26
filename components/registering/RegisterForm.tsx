import { useEvent } from '@/utils/store';
import { calculateTotals } from '@/utils/calculateTotals';
import { formatCurrency, formatDateTime } from '@/utils/format';
import { Card, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { useAuth, SignInButton } from '@clerk/nextjs';
import { GiCardRandom } from 'react-icons/gi';
import RegistrationDetaiils from './RegistrationDetaiils';

function RegisterForm() {
  const { userId } = useAuth();
  const { eventId, price, register } = useEvent((state) => state);
  console.log('Register:', register);
  const { profileId, createdAt, updatedAt, isRaffle, raffleNumber } =
    register.find((r) => r.eventId === eventId) || {};

  // const details = await fetchRegisrationDetails(eventId);
  // console.log('Details:', details);

  const updateDate = formatDateTime(updatedAt || new Date());
  const createDate = formatDateTime(createdAt || new Date());
  console.log(updateDate);
  const isRegistered = register.find((r) => r.eventId === eventId);
  const isUser = register.find((r) => r.profileId === userId);

  if (!isRegistered && !isUser) {
    return (
      <Card className='p-8 mb-4'>
        <CardTitle className='mb-4'>Event Information</CardTitle>
        <p className='text-xs text-muted-foreground'>
          You have not registered to this event
        </p>
      </Card>
    );
  }

  return (
    <Card className='p-8 mb-4'>
      <CardTitle className='mb-4'>Event information</CardTitle>
      <Separator className='mb-4' />

      {/* <Separator className='mb-4' /> */}

      {price > 0 && <FormRow label={`AED ${price} `} />}

      <FormRow label='last updated at' newText={updateDate} />
      <FormRow label='you registered on' newText={createDate} />
    </Card>
  );
}
function FormRow({ label, newText }: { label: string; newText?: any }) {
  return (
    <p className='flex justify-between text-sm mb-2'>
      <span className='text-xs'>{label}</span>
      <span className='text-xs'>{newText}</span>
    </p>
  );
}
export default RegisterForm;
