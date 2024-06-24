import { useAuth } from '@clerk/nextjs';
import { useEvent } from '@/utils/store';

function RegistrationDetaiils() {
  const { eventId, price, register } = useEvent((state) => state);
  const { userId } = useAuth();

  const { profileId, createdAt, updatedAt, isRaffle, raffleNumber } =
    register.find(
      (register) => register.eventId === eventId && register.profileId
    ) || {};
  console.log(raffleNumber);
  console.log(profileId);

  // const details = await fetchRegisrationDetails(eventId);

  // console.log('Details:', details?.raffleNumber);

  return <div>{raffleNumber}</div>;
}
export default RegistrationDetaiils;
