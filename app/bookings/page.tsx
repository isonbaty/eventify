import EmptyList from '@/components/home/EmptyList';
import CountryFlagAndName from '@/components/card/CountryFlagAndName';
import Link from 'next/link';

import { formatDate, formatCurrency } from '@/utils/format';
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
import { fetchRegisteredEvents, deleteRegisterAction } from '@/utils/actions';

async function BookingsPage() {
  const registeredEvents = await fetchRegisteredEvents();
  if (registeredEvents.length === 0)
    return <EmptyList message='You have not registered to any event yet ' />;

  return (
    <div className='mt-16'>
      <h4 className='mb-4 capitalize'>
        Registered Events : {registeredEvents.length}
      </h4>
      <Table>
        <TableCaption>Registered Events List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Event Name</TableHead>
            <TableHead>Event Date</TableHead>
            <TableHead>Event Cost</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Raffle Number</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registeredEvents.map((registered) => {
            const { id, raffleNumber } = registered;
            const {
              id: eventId,
              name,
              country,
              tagline,
              dateFrom,
              price,
            } = registered.event;
            const startDate = formatDate(dateFrom || new Date());
            const free = price === 0;
            return (
              <TableRow key={id}>
                <TableCell>
                  <Link
                    href={`/events/${eventId}`}
                    className='underline text-muted-foreground tracking-wide font-semibold capitalize'
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{startDate}</TableCell>
                <TableCell>{`${
                  price === 0 ? 'FREE' : formatCurrency(price)
                }`}</TableCell>
                <TableCell>
                  <CountryFlagAndName countryCode={country || ''} />
                </TableCell>
                <TableCell className='text-primary font-semibold'>
                  {raffleNumber}
                </TableCell>
                <TableCell>
                  <DeleteRegistration registerId={id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function DeleteRegistration({ registerId }: { registerId: string }) {
  const deleteResponse = deleteRegisterAction.bind(null, { registerId });
  return (
    <FormContainer action={deleteResponse}>
      <IconButton actionType='delete' />
    </FormContainer>
  );
}
export default BookingsPage;
