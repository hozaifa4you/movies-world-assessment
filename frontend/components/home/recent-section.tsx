import { PlayIcon } from 'lucide-react';
import { Button, buttonVariants } from '../ui/button';
import { SectionHeader } from '../header/section-header';
import { fetchWithAuth } from '@/lib/authFetch';
import Link from 'next/link';

type RecentMovie = {
   id: number;
   posterUrl: string | null;
   trailerUrl: string | null;
};

const RecentSection = async () => {
   const res = await fetchWithAuth('/recent-movies');
   if (!res.ok) {
      return 'Failed to fetch recent movies';
   }

   const movies: RecentMovie[] = await res.json();

   return (
      <section className="section-padding bg-gradient-to-b from-black to-gray-900">
         <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
               titlePrimary="Recent"
               titleSecondary="movies"
               description="We constantly offers new movies"
            />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
               {movies.map((movie, index) => (
                  <div key={index} className="group cursor-pointer">
                     <div
                        className={`relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-800 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                           index / 2 === 1
                              ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-black'
                              : ''
                        }`}
                     >
                        <img
                           src={movie.posterUrl || '/placeholder.svg'}
                           alt={`Movie ${index + 1}`}
                           className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {index / 2 === 1 && (
                           <div className="absolute top-3 right-3 rounded-full bg-blue-500 px-2 py-1 text-xs font-bold text-white">
                              HOT
                           </div>
                        )}

                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                           <Link
                              className={buttonVariants({
                                 size: 'sm',
                                 variant: 'outline',
                                 class: 'border border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30',
                              })}
                              href={`/movies/${movie.id}`}
                           >
                              <PlayIcon className="mr-1 h-4 w-4" />
                              Play
                           </Link>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export { RecentSection };
