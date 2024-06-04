import FormInput from '@/components/form/FormInput';
import FormContainer from '@/components/form/FormContainer';
import { createPropertyAction, createEventAction } from '@/utils/actions';
import { SubmitButton } from '@/components/form/Buttons';
import PriceInput from '@/components/form/PriceInput';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

async function CreateEventPage() {
  const user = await currentUser();
  // console.log(user?.publicMetadata);

  if (user?.privateMetadata.isAdmin === false) {
    redirect('/');
  }

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>Create Event</h1>
      <div className='border p-8 rounded'>
        <h3 className='text-lg mb-4 font-medium'>General Info</h3>
        <FormContainer action={createEventAction}>
          <div className='grid md:grid-cols-2 gap-8 mb-4'>
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
            {/* price */}
            <PriceInput />
            {/* category */}
          </div>
          {/* text area with description */}
          <SubmitButton text='Create event' className='mt-12' />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateEventPage;
