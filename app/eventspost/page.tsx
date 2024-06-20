import EmptyList from '@/components/home/EmptyList';
import { fetchEventsByUser, deleteEventAction } from '@/utils/actions';
import Link from 'next/link';

import { formatCurrency } from '@/utils/format';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import FormContainer from '@/components/form/FormContainer';
import { IconButton } from '@/components/form/Buttons';

async function EventsPostPage() {
  const events = await fetchEventsByUser();
  if (events.length === 0) {
    return (
      <EmptyList
        heading='No events to display'
        message='create your own event now!'
      />
    );
  }

  return (
    <div className='mt-16'>
      <h4 className='mb-4 capitalize'>Active Events : {events.length}</h4>
      <Table>
        <TableCaption>A List of all your events</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell>Event Name</TableCell>

            <TableCell>Number of Subscribers</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => {
            const { id: eventId, name, price } = event;
            const { totalSubscribers } = event;
            return (
              <TableRow key={eventId}>
                <TableCell>
                  <Link
                    href={`/events/${eventId}`}
                    className='underline text-muted-foreground tracking-wide'
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{totalSubscribers}</TableCell>
                <TableCell>
                  {formatCurrency(price * totalSubscribers)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
export default EventsPostPage;
