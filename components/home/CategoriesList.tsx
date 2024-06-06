import { eventscategories } from '@/utils/eventscategories';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import Link from 'next/link';

function CategoriesList({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const searchTerm = search ? `&search=${search}` : '';

  return (
    <section>
      <ScrollArea className='py-6'>
        <div className='flex gap-x-4'>
          {eventscategories.map((item) => {
            const isActive = item.label === category;
            return (
              <Link
                key={item.label}
                href={`/?category=${item.label}${searchTerm}`}
              >
                <article
                  className={`p-3 flex flex-col items-center cursor-pointer duration-300 hover:text-primary w-[300px]${
                    isActive ? 'text-primary' : 'w-[300px]'
                  }`}
                >
                  <item.icon className='w-12 h-12' />
                  <p className='capitalize text-sm mt-1'>{item.label}</p>
                </article>
              </Link>
            );
          })}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </section>
  );
}
export default CategoriesList;
