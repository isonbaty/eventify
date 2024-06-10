import { formatQuantity } from '@/utils/format';
type EventDetailsProps = {
  details: {
    duration: number | null;
    maxguests: number | null;
  };
};

function EventDetails({ details: { duration, maxguests } }: EventDetailsProps) {
  return (
    <p className='text-md font-light'>
      <span>{formatQuantity(maxguests ?? 0, 'guest')} &middot;</span>
      <span>{formatQuantity(duration ?? 0, 'hour')}</span>
    </p>
  );
}
export default EventDetails;
