import FavoriteToggleButton from '@/components/card/FavoriteToggleButton';
import BreadCrumbs from '@/components/events/BreadCrumbs';
import { fetchEventDetails } from '@/utils/actions';
import { redirect } from 'next/navigation';
import ShareButton from '@/components/events/ShareButton';
import ImageContainer from '@/components/events/ImageContainer';
import EventRating from '@/components/card/EventRating';
import EventCalendar from '@/components/events/EventCalendar';
import EventDetails from '@/components/events/EventDetails';
import UserInfo from '@/components/events/UserInfo';
import { Separator } from '@/components/ui/separator';
import Description from '@/components/events/Description';
import CountryFlagAndName from '@/components/card/CountryFlagAndName';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const DynamicMap = dynamic(() => import('@/components/events/EventMap'), {
  ssr: false,
  loading: () => <Skeleton className='h-[400] w-full' />,
});

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
  const firstName = event.profile.firstName;
  const lastName = event.profile.lastName;
  const email = event.profile.email;
  const profileImage = event.profile.profileImage;
  const countryCode = event.country;
  return (
    <section>
      <BreadCrumbs name={event.name} />
      <header className='flex justify-between items-center mt-4'>
        <h1 className='text-4xl font-bold capitalize'>{event.tagline}</h1>
        <div className='flex items-center gap-x-4'>
          {/* share button  */}
          <ShareButton eventId={event.id} name={event.name} />
          {/* favorite button */}

          <FavoriteToggleButton eventId={event.id} />
        </div>
      </header>
      <ImageContainer mainImage={event.image} name={event.name} />
      <section className='lg:grid lg:grid-cols-12 gap-x-12 mt-12'>
        <div className='lg:col-span-8'>
          <div className='flex gap-x-4 items-center'>
            <h1 className='text-xl font-bold'>{event.name}</h1>
            <EventRating inPage eventId={event.id} />
          </div>
          <EventDetails details={details} />
          {/* <CountryFlagAndName countryCode={countryCode} /> */}
          <UserInfo profile={{ profileImage, firstName, lastName, email }} />
          <Separator className='mt-4' />
          <Description description={event.description} />
          {/* <DynamicMap countryCode={event.country} /> */}
        </div>
        <div className='lg:col-span-4 flex flex-col items-center'>
          {/* calendar */}
          <EventCalendar />
        </div>
      </section>
    </section>
  );
}
export default EventDetailsPage;
