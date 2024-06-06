import { FaStar } from 'react-icons/fa';

function EventRating({
  eventId,
  inPage,
}: {
  eventId: string;
  inPage: boolean;
}) {
  // temp
  const rating = 4.5;
  const count = 100;
  const className = `flex gap-1 items-center ${inPage ? 'text-md' : 'text-xs'}`;
  const countText = count > 1 ? 'review' : 'reviews';
  const countValue = `(${count}) ${inPage ? countText : ''}`;
  return (
    <span className={className}>
      <FaStar className='w-3 h-3' />
      {rating}
      {countValue}
    </span>
  );
}
export default EventRating;