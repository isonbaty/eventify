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
          <TableRow className='font-semibold'>
            <TableCell>Event Name</TableCell>

            <TableCell className='text-center'>Number of Subscribers</TableCell>
            <TableCell className='text-center'>Price</TableCell>
            <TableCell className='text-center'>Orders Total</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => {
            const { id: eventId, name, price } = event;
            const { totalSubscribers, orderTotalSum } = event;
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
                <TableCell className='text-center'>
                  {totalSubscribers}
                </TableCell>
                <TableCell className='text-center'>
                  {formatCurrency(price)}
                </TableCell>
                <TableCell className='text-center'>
                  {formatCurrency(orderTotalSum)}
                </TableCell>
                <TableCell className='flex items-center gap-x-2'>
                  <Link href={`/eventspost/${eventId}/edit`}>
                    <IconButton actionType='edit' />
                  </Link>
                  <DeleteEvent eventId={eventId} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
function DeleteEvent({ eventId }: { eventId: string }) {
  const deleteEvent = deleteEventAction.bind(null, { eventId });
  return (
    <FormContainer action={deleteEvent}>
      <IconButton actionType='delete' />
    </FormContainer>
  );
}
export default EventsPostPage;
