import { fetchEvents } from '@/utils/actions';
import EventsList from './EventsList';
import EmptyList from './EmptyList';
import type { EventCardProps } from '@/utils/types';

async function EventsContainer({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const events: EventCardProps[] = await fetchEvents({
    category,
    search,
  });
  if (events.length === 0) {
    return (
      <EmptyList
        heading='No Result.'
        message='Try changing pr removing some of your filters'
        btnText='Clear filters'
      />
    );
  }
  return <EventsList events={events} />;
}
export default EventsContainer;
