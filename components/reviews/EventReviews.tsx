import { fetchEventReviews } from '@/utils/actions';
import Title from '../events/Title';
import ReviewCard from './ReviewCard';

async function EventReviews({ eventId }: { eventId: string }) {
  const reviews = await fetchEventReviews(eventId);
  if (reviews.length < 1) return null;
  return (
    <div className='mt-8'>
      <Title text='Reviews' />
      <div className='grid md:grid-cols-2 gap-8 mt-4'>
        {reviews.map((review) => {
          const { comment, rating } = review;
          const { firstName, lastName, profileImage } = review.profile;
          const reviewInfo = {
            comment,
            rating,
            name: `${firstName} ${lastName}`,
            image: profileImage,
          };
          return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
        })}
      </div>
    </div>
  );
  return <div>EventReviews</div>;
}
export default EventReviews;
