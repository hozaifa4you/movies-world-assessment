import { getSession } from '@/lib/sessions';
import { SectionHeader } from '../header/section-header';
import { RatingSliderProps } from './rating-slider';
import { WatchlistSlider } from './watchlist-slider';
import { fetchWithAuth } from '@/lib/authFetch';

const WatchListSection = async () => {
   let movies: RatingSliderProps['movies'] = [];
   const session = await getSession();
   if (session && session.user) {
      const res = await fetchWithAuth('/my-watchlist');
      if (!res.ok) {
         throw new Error('Failed to fetch rated movies');
      }

      movies = await res.json();
   }

   return (
      <section className="section-padding bg-gradient-to-b from-gray-900 to-black">
         <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader titlePrimary="YOUR" titleSecondary="WATCH-LIST" />

            <WatchlistSlider movies={movies} />
         </div>
      </section>
   );
};

export { WatchListSection };
