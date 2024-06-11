'use client';
import { useState } from 'react';
import { SubmitButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import { Card } from '@/components/ui/card';
import RatingInput from '@/components/form/RatingInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import { Button } from '@/components/ui/button';
import { createReviewAction } from '@/utils/actions';
function SubmitReview({ eventId }: { eventId: string }) {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  return (
    <div className='mt-8'>
      <Button onClick={() => setIsReviewFormVisible((prev) => !prev)}>
        Leave a review
      </Button>
      {isReviewFormVisible && (
        <Card className='p-8 mt-8'>
          <FormContainer action={createReviewAction}>
            <input type='hidden' name='eventId' value={eventId} />
            <RatingInput name='rating' />
            <TextAreaInput
              name='comment'
              labelText='your thoughts on this event'
              defaultValue='Amazing event, I had a great time.'
            />
            <SubmitButton text='Submit' className='mt-4' />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}
export default SubmitReview;
