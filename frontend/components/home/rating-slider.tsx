'use client';
import {
   CheckIcon,
   ChevronLeft,
   ChevronRight,
   PlayIcon,
   PlusIcon,
   StarIcon,
} from 'lucide-react';
import { Button, buttonVariants } from '../ui/button';
import { useState } from 'react';
import Link from 'next/link';

export interface RatingSliderProps {
   movies: Array<{
      id: number;
      title: string;
      posterUrl: string | null;
      rating: number | null;
      trailerUrl: string | null;
      reviewCount: number;
   }>;
}

export function RatingSlider({ movies }: RatingSliderProps) {
   const [ratedMoviesIndex, setRatedMoviesIndex] = useState(0);

   const nextRatedMovies = () => {
      setRatedMoviesIndex((prev) => Math.min(prev + 1, movies.length - 4));
   };

   const prevRatedMovies = () => {
      setRatedMoviesIndex((prev) => Math.max(prev - 1, 0));
   };

   return movies.length > 0 ? (
      <div className="relative">
         {/* Navigation Arrows */}
         <Button
            onClick={prevRatedMovies}
            disabled={ratedMoviesIndex === 0}
            variant="secondary"
            size="icon"
            className="absolute top-1/2 left-[-50px] z-10 hidden -translate-y-1/2 transform backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50 lg:flex"
         >
            <ChevronLeft className="text-primary size-6" />
         </Button>

         <Button
            onClick={nextRatedMovies}
            disabled={ratedMoviesIndex >= movies.length - 4}
            variant="secondary"
            size="icon"
            className="absolute top-1/2 right-[-50px] z-10 hidden -translate-y-1/2 transform items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50 lg:flex"
         >
            <ChevronRight className="text-primary size-6" />
         </Button>

         {/* Movies Grid */}
         <div className="overflow-hidden">
            <div
               className="flex gap-6 transition-transform duration-500 ease-in-out"
               style={{
                  transform: `translateX(-${ratedMoviesIndex * (100 / 4)}%)`,
               }}
            >
               {movies.map((movie, index) => (
                  <div
                     key={index}
                     className="w-full flex-shrink-0 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                  >
                     <div className="group cursor-pointer">
                        <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-xl bg-gray-800 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                           <img
                              src={movie.posterUrl || '/placeholder.svg'}
                              alt={movie.title}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                           />

                           <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              <Button
                                 size="sm"
                                 className="border border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                              >
                                 <PlayIcon className="mr-1 h-4 w-4" />
                                 Details
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
                                 {movie.rating ?? 0}/10
                              </span>
                              <span className="text-gray-400">(10)</span>
                           </div>

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
   ) : (
      <div className="flex h-50 w-full flex-col items-center justify-center space-y-5 rounded-xl border">
         <p className="text-gray-400">No rated movies found.</p>
         <Link
            href="/movies"
            className={buttonVariants({
               size: 'lg',
               variant: 'outline',
            })}
         >
            <StarIcon className="mr-1 h-4 w-4" />
            Rate Movies
         </Link>
      </div>
   );
}
