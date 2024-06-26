import EmptyList from '@/components/home/EmptyList';
import { fetchEventRegistrations } from '@/utils/actions';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateTime } from '@/utils/format';

async function EventRegistrationsPage({ params }: { params: { id: string } }) {
  const registrations = await fetchEventRegistrations(params.id);
  console.log(registrations);

  if (registrations.length === 0) {
    return (
      <EmptyList heading='No registrations to display' message='Check later!' />
    );
  }

  // console.log(registrations.profile.register[0]);

  return (
    <div className='border p-2 rounded mb-8'>
      <h2 className='mb-4 capitalize font-semibold'>
        {registrations[0].event.name}
      </h2>
      <h4 className='mb-4 capitalize font-semibold'>
        Registrations : {registrations.length}
      </h4>

      <Table>
        <TableCaption>a list of all event registrations</TableCaption>
        <TableHeader>
          <TableRow className='font-semibold'>
            <TableCell>First Name</TableCell>

            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Raffle Number</TableCell>
            <TableCell>Registered at</TableCell>
            <TableCell>Profile image</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrations.map((registration) => {
            return (
              <TableRow key={registration.id}>
                <TableCell>{registration.profile.firstName}</TableCell>
                <TableCell>{registration.profile.lastName}</TableCell>
                <TableCell>{registration.profile.email}</TableCell>
                <TableCell className='font-semibold'>
                  {registration.raffleNumber}
                </TableCell>
                <TableCell>{formatDateTime(registration.createdAt)}</TableCell>
                <TableCell>
                  <img
                    src={registration.profile.profileImage}
                    alt='profile image'
                    className='w-10 h-10 rounded-full object-cover'
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
export default EventRegistrationsPage;
