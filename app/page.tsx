import CategoriesList from '@/components/home/CategoriesList';
import EventsContainer from '@/components/home/EventsContainer';
import LoadingCards from '@/components/card/LoadingCards';
import { Suspense } from 'react';

function HomePage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  return (
    <section>
      <CategoriesList
        category={searchParams.category}
        search={searchParams.search}
      />
      <Suspense fallback={<LoadingCards />}>
        <EventsContainer
          category={searchParams.category}
          search={searchParams.search}
        />
      </Suspense>
    </section>
  );
}
export default HomePage;
