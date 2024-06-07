import EmptyList from '@/components/home/EmptyList';
import EventsList from '@/components/home/EventsList';
import { fetchFavorites } from '@/utils/actions';
async function FavoritesPage() {
  const favorites = await fetchFavorites();

  if (favorites.length === 0) {
    return <EmptyList />;
  }
  return <EventsList events={favorites} />;
}
export default FavoritesPage;
