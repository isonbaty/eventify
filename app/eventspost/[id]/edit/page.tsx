import {
  fetchEventDetailsByUser,
  updateEventAction,
  updateEventImageAction,
} from '@/utils/actions';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import CategoriesInput from '@/components/form/CategoriesInput';
import EventsCategoriesInput from '@/components/form/EventsCategoriesInput';
import PriceInput from '@/components/form/PriceInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import CounterInput from '@/components/form/CounterInput';
import CountriesInput from '@/components/form/CountriesInput';
import { SubmitButton } from '@/components/form/Buttons';
import { redirect } from 'next/navigation';
import ImageInputContainer from '@/components/form/ImageInputContainer';
import GuestsInput from '@/components/form/GuestsInput';
import DurationInput from '@/components/form/DurationInput';
import CreateEventCalendar from '@/components/form/CreateEventCalendar';
import { formatDate } from '@/utils/format';
import { date } from 'zod';

async function EditEventPage({ params }: { params: { id: string } }) {
  const event = await fetchEventDetailsByUser(params.id);
  if (!event) {
    redirect('/');
  }

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>Edit Event</h1>
      <div className='border p-8 rounded-md'>
        <ImageInputContainer
          name={event.name}
          text='Update Image'
          action={updateEventImageAction}
          image={event.image}
        >
          <input type='hidden' name='id' value={event.id} />
        </ImageInputContainer>
        <FormContainer action={updateEventAction}>
          <input type='hidden' name='id' value={event.id} />
          <div className='grid md:grid-cols-2 gap-8 mb-4 mt-8'>
            <FormInput
              name='name'
              label='Event Name (20 limit)'
              defaultValue={event.name}
              type='text'
            />
            <FormInput
              name='tagline'
              label='Tagline (30 limit)'
              defaultValue={event.tagline}
              type='text'
            />{' '}
            <FormInput
              name='venue'
              label='venue'
              defaultValue={event.venue}
              type='text'
            />
            <FormInput
              name='location'
              label='location'
              defaultValue={event.location || undefined}
              type='text'
            />
            <PriceInput defaultValue={event.price} />
            <EventsCategoriesInput defaultValue={event.category} />
            <CountriesInput defaultValue={event.country || undefined} />
          </div>
          <div>
            <CreateEventCalendar defaultValue={event.dateFrom || new Date()} />
            <p>{formatDate(event.dateFrom ?? new Date())}</p>
          </div>
          <h3 className='text-lg mt-8 mb-4 font-medium'>
            Event Capacity & Duration
          </h3>
          <GuestsInput defaultValue={event.maxguests || undefined} />
          <DurationInput defaultValue={event.duration || undefined} />
          <TextAreaInput name='description' defaultValue={event.description} />

          <SubmitButton text='Update Event' className='mt-12' />
        </FormContainer>
      </div>
    </section>
  );
}
export default EditEventPage;
