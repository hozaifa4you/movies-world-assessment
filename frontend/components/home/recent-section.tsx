import { PlayIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { SectionHeader } from '../header/section-header';

const RecentSection = () => {
   return (
      <section className="section-padding bg-gradient-to-b from-black to-gray-900">
         <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
               titlePrimary="Recent"
               titleSecondary="movies"
               description="We constantly offers new movies"
            />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
               {[
                  {
                     image: '/horror-comedy-movie-poster-with-zombie-theme.jpg',
                     badge: 'prime video',
                     badgeColor: 'bg-yellow-600',
                  },
                  {
                     image: '/action-thriller-movie-poster-with-urban-setting.jpg',
                  },
                  {
                     image: '/romantic-comedy-movie-poster-with-couple.jpg',
                     featured: true,
                  },
                  {
                     image: '/supernatural-drama-movie-poster-with-mysterious-ch.jpg',
                  },
                  {
                     image: '/military-action-movie-poster-with-soldier-theme.jpg',
                  },
               ].map((movie, index) => (
                  <div key={index} className="group cursor-pointer">
                     <div
                        className={`relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-800 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                           movie.featured
                              ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-black'
                              : ''
                        }`}
                     >
                        <img
                           src={movie.image || '/placeholder.svg'}
                           alt={`Movie ${index + 1}`}
                           className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {movie.badge && (
                           <div
                              className={`absolute top-3 left-3 ${movie.badgeColor} rounded-full px-3 py-1 text-xs font-bold text-black shadow-lg`}
                           >
                              {movie.badge}
                           </div>
                        )}

                        {movie.featured && (
                           <div className="absolute top-3 right-3 rounded-full bg-blue-500 px-2 py-1 text-xs font-bold text-white">
                              HOT
                           </div>
                        )}

                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                           <Button
                              size="sm"
                              className="border border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                           >
                              <PlayIcon className="mr-1 h-4 w-4" />
                              Play
                           </Button>
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
