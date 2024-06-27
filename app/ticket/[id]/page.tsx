import QrCoder from '@/components/qr/QrCoder';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import EmptyList from '@/components/home/EmptyList';
import { Separator } from '@/components/ui/separator';
import {
  fetchTicketDetails,
  regDetails,
  fetchEventRegistrations,
} from '@/utils/actions';
import { formatDate, formatDateTime } from '@/utils/format';
async function TicketPage({ params }: { params: { id: string } }) {
  const ticket = await fetchTicketDetails(params.id);
  const reg = await fetchEventRegistrations(params.id);

  const url = new URL('http://localhost:3000/ticket/' + params.id);
  if (reg) {
    console.log('ticket', reg);
  }

  const raffle = reg.map((item) => {
    if (ticket?.profileId === item.profileId) {
      return item.raffleNumber;
    }
  });

  if (!ticket)
    return (
      <EmptyList
        heading='You have not registered for this event'
        message='Please register first to get your ticket'
      />
    );
  const startDate = formatDate(ticket.dateFrom || new Date());

  return (
    <div className='flex flex-col items-center'>
      <div className='self-center'>
        <Card className='p-8'>
          <CardHeader>
            <CardTitle className='text-3xl font-bold'>Ticket Details</CardTitle>
            <CardDescription>Scan this code to enter the event</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className='font-semibold text-2xl'>{ticket.name}</h3>
            <h3 className='font-semibold text-lg'>
              {ticket.profile.firstName} {ticket.profile.lastName}
            </h3>
            <h3 className='font-semibold text-lg'>{startDate}</h3>
            <h3 className='font-semibold text-2xl text-primary'>
              Raffle Number: {raffle}
            </h3>
            <Separator className='mt-5 mb-5' />
            <QrCoder url={url.toString()} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default TicketPage;
