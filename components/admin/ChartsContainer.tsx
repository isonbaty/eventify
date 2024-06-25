import { fetchChartsData } from '@/utils/actions';
import Chart from './Chart';

async function ChartsContainer() {
  const registrations = await fetchChartsData();
  if (registrations.length < 1) return null;
  return <Chart data={registrations} />;
}
export default ChartsContainer;
