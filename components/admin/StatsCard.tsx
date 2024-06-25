import { Card, CardHeader } from '../ui/card';

type StatsCardProps = {
  title: string;
  value: number;
};

function StatsCard({ title, value }: StatsCardProps) {
  return (
    <Card className='bg-muted'>
      <CardHeader className='flex flex-row justify-between items-center'>
        <h3 className='capitalize text-3xl font-bold'>{title}</h3>
        <p className='text-primary text-5xl font-bold'>{value}</p>
      </CardHeader>
    </Card>
  );
}
export default StatsCard;
