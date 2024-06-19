import FormInput from '@/components/form/FormInput';
import FormContainer from '@/components/form/FormContainer';
import { createPropertyAction, createEventAction } from '@/utils/actions';
import { SubmitButton } from '@/components/form/Buttons';
import PriceInput from '@/components/form/PriceInput';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import CategoriesInput from '@/components/form/CategoriesInput';
import EventsCategoriesInput from '@/components/form/EventsCategoriesInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import CountriesInput from '@/components/form/CountriesInput';
import ImageInput from '@/components/form/ImageInput';
import CounterInput from '@/components/form/CounterInput';
import GuestsInput from '@/components/form/GuestsInput';
import DurationInput from '@/components/form/DurationInput';
import RegisterCalendar from '@/components/registering/RegisterCalendar';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const CreateEventCalendar = dynamic(
  () => import('@/components/form/CreateEventCalendar'),
  { ssr: false, loading: () => <Skeleton className='h-[200] w-full' /> }
);

async function CreateEventPage() {
  const user = await currentUser();
  // console.log(user?.publicMetadata);

  if (user?.privateMetadata.isAdmin === false) {
    redirect('/');
  }

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>Create Event</h1>
      <div className='border p-8 rounded '>
        <h3 className='text-lg mb-4 font-medium'>General Info</h3>

        <FormContainer action={createEventAction}>
          <div className='lg:grid lg:grid-cols-12 gap-x-12 mt-12'>
            <div className='lg:col-span-8'>
              <FormInput
                name='name'
                type='text'
                label='Name (20 limit)'
                defaultValue='DEWA Gala Dinner'
              />
              <FormInput
                name='tagline'
                type='text'
                label='tagline (300 limit)'
                defaultValue='Main event of the year'
              />
              <FormInput
                name='venue'
                type='text'
                label='venue (300 limit)'
                defaultValue='DEWA Head office'
              />
              <FormInput
                name='location'
                type='text'
                label='Location (300 limit)'
                defaultValue='dubai, UAE'
              />
              {/* price */}
              <PriceInput />
              {/* <CategoriesInput /> */}
              <EventsCategoriesInput />
              <TextAreaInput
                name='description'
                labelText='Description (10-100 words)'
              />
              <div className='grid sm:grid-cols-2 gap-8'>
                <CountriesInput defaultValue='AE' />
                <ImageInput />
              </div>
            </div>
            <div className='lg:col-span-4 flex flex-col items-center'>
              {/* <RegisterCalendar /> */}
              <CreateEventCalendar />
            </div>
          </div>
          {/* text area with description */}
          {/* counter input */}{' '}
          <h3 className='text-lg mt-8 mb-4 font-medium'>
            Event Capacity & Duration
          </h3>
          <div className='grid sm:grid-cols-2 gap-8'>
            {/* <CounterInput detail='Guests' /> */}
            <GuestsInput />
            <DurationInput />
          </div>
          <SubmitButton text='Create event' className='mt-12 w-5' />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateEventPage;
