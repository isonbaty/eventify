import EmptyList from '@/components/home/EmptyList';
import { deleteReviewAction, fetchEventReviewsByUser } from '@/utils/actions';
import ReviewCard from '@/components/reviews/ReviewCard';
import Title from '@/components/events/Title';
import FormContainer from '@/components/form/FormContainer';
import { IconButton } from '@/components/form/Buttons';

function ReviewsPage() {
  return (
    <div>
      <h1 className='text-7xl'>Reviews Page</h1>
    </div>
  );
}
export default ReviewsPage;
