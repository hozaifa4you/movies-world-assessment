'use client';
import {
   CheckIcon,
   ChevronLeftIcon,
   ChevronRightIcon,
   PlayIcon,
   StarIcon,
} from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';

const WatchListSection = () => {
   const [watchlistIndex, setWatchlistIndex] = useState(0);

   const watchlistMovies = [
      {
         image: '/sci-fi-action-movie-poster-with-futuristic-soldier.jpg',
         title: 'JOKER',
         rating: 4.5,
      },
      {
         image: '/romantic-comedy-movie-poster-with-couple.jpg',
         title: 'JOKER',
         rating: 4.5,
      },
      {
         image: '/action-thriller-movie-poster-with-urban-setting.jpg',
         title: 'JOKER',
         rating: 4.5,
      },
      {
         image: '/military-action-movie-poster-with-soldier-theme.jpg',
         title: 'JOKER',
         rating: 4.5,
      },
      {
         image: '/supernatural-drama-movie-poster-with-mysterious-ch.jpg',
         title: 'JOKER',
         rating: 4.5,
      },
   ];

   const nextWatchlistMovies = () => {
      setWatchlistIndex((prev) =>
         Math.min(prev + 1, watchlistMovies.length - 4),
      );
   };

   const prevWatchlistMovies = () => {
      setWatchlistIndex((prev) => Math.max(prev - 1, 0));
   };

   return (
      <section className="section-padding bg-gradient-to-b from-gray-900 to-black">
         <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
               <h2 className="mb-4 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                  <span className="text-white">YOUR </span>
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                     WATCH-LIST
                  </span>
               </h2>
            </div>

            <div className="relative">
               {/* Navigation Arrows */}
               <button
                  onClick={prevWatchlistMovies}
                  disabled={watchlistIndex === 0}
                  className="absolute top-1/2 left-[-50px] z-10 hidden -translate-y-1/2 transform items-center justify-center rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50 lg:flex"
               >
                  <ChevronLeftIcon className="h-6 w-6 text-white" />
               </button>

               <button
                  onClick={nextWatchlistMovies}
                  disabled={watchlistIndex >= watchlistMovies.length - 4}
                  className="absolute top-1/2 right-[-50px] z-10 hidden -translate-y-1/2 transform items-center justify-center rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50 lg:flex"
               >
                  <ChevronRightIcon className="h-6 w-6 text-white" />
               </button>

               {/* Movies Grid */}
               <div className="overflow-hidden">
                  <div
                     className="flex gap-6 transition-transform duration-500 ease-in-out"
                     style={{
                        transform: `translateX(-${watchlistIndex * (100 / 4)}%)`,
                     }}
                  >
                     {watchlistMovies.map((movie, index) => (
                        <div
                           key={index}
                           className="w-full flex-shrink-0 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                        >
                           <div className="group cursor-pointer">
                              <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-xl bg-gray-800 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                                 <img
                                    src={movie.image || '/placeholder.svg'}
                                    alt={movie.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                 />

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

                              <div className="space-y-3">
                                 <h3 className="text-lg font-bold text-white">
                                    {movie.title}
                                 </h3>

                                 <div className="flex items-center gap-2">
                                    <StarIcon className="h-4 w-4 fill-current text-yellow-400" />
                                    <span className="font-semibold text-white">
                                       {movie.rating}
                                    </span>
                                 </div>

                                 <Button className="w-full rounded-lg bg-green-600 py-2 font-semibold text-white transition-all duration-300 hover:bg-green-700">
                                    <CheckIcon className="mr-2 h-4 w-4" />
                                    WATCH LIST
                                 </Button>

                                 <Button
                                    variant="outline"
                                    className="w-full rounded-lg border-gray-600 bg-transparent py-2 text-gray-300 transition-all duration-300 hover:bg-gray-800 hover:text-white"
                                 >
                                    <PlayIcon className="mr-2 h-4 w-4" />
                                    TRAILER
                                 </Button>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export { WatchListSection };
