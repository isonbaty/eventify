import Image from 'next/image';
import Link from 'next/link';
import CountryFlagAndName from './CountryFlagAndName';
import EventRating from './EventRating';
import FavoriteToggleButton from './FavoriteToggleButton';
import { EventCardProps } from '@/utils/types';
import { formatCurrency } from '@/utils/format';

function EventCard({ event }: { event: EventCardProps }) {
  const { name, image, price } = event;
  const { country, id: eventId, tagline, venue } = event;
  return (
    <article className='group relative'>
      <Link href={`/events/${eventId}`}>
        <div className='relative h-[300px] mb-2 overflow-hidden rounded-md'>
          <Image
            src={image}
            alt={name}
            fill
            sizes='(max-width:768px) 100vw, 50vw'
            className='rounded-md object-cover transform group-hover:scale-110 transition-transform duration-300'
          />
        </div>
        <div className='flex justify-between items-center'>
          <h3 className='tex-sm font-semibold mt-1'>{name.substring(0, 30)}</h3>
          {/* event rating */}
          <EventRating eventId={eventId} inPage={false} />
        </div>
        <p className='text-sm mt-1 text-muted-foreground'>
          {tagline.substring(0, 40)}
        </p>

        <div className='flex justify-between items-center mt-1'>
          <p className='text-sm mt-1'>
            {price === 0 ? (
              <span className='font-semibold text-primary'>Free</span>
            ) : (
              <span className='font-semibold'>
                Price: {formatCurrency(price)}
              </span>
            )}
          </p>
          {/* country and flag  */}
          {/* <CountryFlagAndName countryCode={country} /> */}
        </div>
      </Link>
      <div className='absolute top-5 right-5 z-5'>
        {/* favorite toggle button */}
        <FavoriteToggleButton eventId={eventId} />
      </div>
    </article>
  );
}
export default EventCard;
