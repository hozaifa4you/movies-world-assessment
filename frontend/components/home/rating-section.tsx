import { getSession } from '@/lib/sessions';
import { SectionHeader } from '../header/section-header';
import { RatingSlider, RatingSliderProps } from './rating-slider';
import { fetchWithAuth } from '@/lib/authFetch';

const RatingSection = async () => {
   let movies: RatingSliderProps['movies'] = [];
   const session = await getSession();
   if (session && session.user) {
      const res = await fetchWithAuth('/my-ratings');
      if (!res.ok) {
         throw new Error('Failed to fetch rated movies');
      }

      movies = await res.json();
   }

   return (
      <section className="bg-gradient-to-b from-black to-gray-900 py-16 md:py-24">
         <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader titlePrimary="MOVIES YOU" titleSecondary="RATED" />

            <RatingSlider movies={movies} />
         </div>
      </section>
   );
};

export { RatingSection };
