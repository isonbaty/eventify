import FavoriteToggleButton from '@/components/card/FavoriteToggleButton';
import BreadCrumbs from '@/components/events/BreadCrumbs';
import { fetchEventDetails } from '@/utils/actions';
import { redirect } from 'next/navigation';

async function EventDetailsPage({ params }: { params: { id: string } }) {
  const event = await fetchEventDetails(params.id);
  if (!event) redirect('/');
  const {
    maxguests,
    image,
    updatedAt,
    name,
    tagline,
    country,
    venue,
    location,
    price,
    duration,
    description,
    published,
  } = event;

  const details = {
    maxguests,
    image,
    updatedAt,
    name,
    tagline,
    country,
    venue,
    location,
    price,
    duration,
    description,
    published,
  };
  return (
    <section>
      <BreadCrumbs name={event.name} />
      <header className='flex justify-between items-center mt-4'>
        <h1 className='text-4xl font-bold capitalize'>{event.tagline}</h1>
        <div className='flex items-center gap-x-4'>
          {/* share button  */}

          <FavoriteToggleButton eventId={event.id} />
        </div>
      </header>
    </section>
  );
}
export default EventDetailsPage;
