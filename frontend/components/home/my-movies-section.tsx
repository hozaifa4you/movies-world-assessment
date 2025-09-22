import { PlusIcon } from 'lucide-react';
import { Button } from '../ui/button';

const MyMoviesSection = () => {
   const personalMovies = [
      {
         image: '/supernatural-drama-movie-poster-with-mysterious-ch.jpg',
         title: 'The Vampire Diaries',
      },
      {
         image: '/military-action-movie-poster-with-soldier-theme.jpg',
         title: 'GEN V',
      },
   ];

   return (
      <section className="section-padding bg-gradient-to-b from-black to-gray-900">
         <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
               <h2 className="mb-4 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                  <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                     MY ADDED{' '}
                  </span>
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                     MOVIES
                  </span>
               </h2>
            </div>

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
               {personalMovies.map((movie, index) => (
                  <div key={index} className="group cursor-pointer">
                     <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-800 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                        <img
                           src={movie.image || '/placeholder.svg'}
                           alt={movie.title}
                           className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                           <Button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700">
                              EDIT MOVIES
                           </Button>
                        </div>

                        <div className="absolute right-4 bottom-4 left-4">
                           <h3 className="text-xl font-bold text-white">
                              {movie.title}
                           </h3>
                        </div>
                     </div>
                  </div>
               ))}

               {/* Add Movie Card */}
               <div className="group cursor-pointer">
                  <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-600 transition-all duration-500 hover:border-blue-500 hover:bg-gray-900/50">
                     <div className="text-center">
                        <Button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 group-hover:scale-110 hover:bg-blue-700">
                           <PlusIcon className="mr-2 h-5 w-5" />
                           ADD MOVIE
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export { MyMoviesSection };
