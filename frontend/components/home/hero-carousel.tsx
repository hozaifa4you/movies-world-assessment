'use client';
import {
   ChevronLeftIcon,
   ChevronRightIcon,
   PlayIcon,
   StarIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

interface HeroCarouselProps {
   id: number;
   title: string;
   posterUrl: string | null;
   releaseDate: string | null;
   status: string;
   rating: number | null;
   shortDescription: string | null;
   genre: string[];
}

const HeroCarousel = ({ movies }: { movies: HeroCarouselProps[] }) => {
   const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
   const [isAutoPlaying, setIsAutoPlaying] = useState(true);

   useEffect(() => {
      if (!isAutoPlaying) return;

      const interval = setInterval(() => {
         setCurrentMovieIndex((prev) => (prev + 1) % movies.length);
      }, 5000);

      return () => clearInterval(interval);
   }, [isAutoPlaying, movies.length]);

   const nextMovie = () => {
      setIsAutoPlaying(false);
      setCurrentMovieIndex((prev) => (prev + 1) % movies.length);
   };

   const prevMovie = () => {
      setIsAutoPlaying(false);
      setCurrentMovieIndex(
         (prev) => (prev - 1 + movies.length) % movies.length,
      );
   };

   const goToMovie = (index: number) => {
      setIsAutoPlaying(false);
      setCurrentMovieIndex(index);
   };

   return (
      <div className="relative flex max-w-sm flex-1 items-center justify-center lg:max-w-md xl:max-w-lg">
         <div className="relative">
            <Button
               onClick={prevMovie}
               aria-label="Previous movie"
               variant="secondary"
               size="icon"
               className="absolute top-1/2 left-0 z-30 -translate-x-1/2 -translate-y-1/2"
            >
               <ChevronLeftIcon className="size-6 font-bold" />
            </Button>

            <Button
               onClick={nextMovie}
               variant="secondary"
               size="icon"
               aria-label="Next movie"
               className="absolute top-1/2 right-0 z-30 translate-x-1/2 -translate-y-1/2"
            >
               <ChevronRightIcon className="size-6 font-bold" />
            </Button>

            <div className="transform overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl transition-all duration-500 hover:scale-[1.02] lg:rounded-3xl">
               <div className="relative">
                  <img
                     src={
                        movies[currentMovieIndex].posterUrl ||
                        '/placeholder.svg'
                     }
                     alt={movies[currentMovieIndex].title}
                     className="h-96 w-72 object-cover sm:h-[450px] sm:w-80 md:h-[540px] md:w-96"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                  <div className="absolute right-0 bottom-0 left-0 p-4 lg:p-6">
                     <div className="mb-3">
                        <div className="mb-2 flex items-center gap-2">
                           <span className="text-sm font-semibold text-yellow-400">
                              {movies[currentMovieIndex].releaseDate}
                           </span>
                           <span className="text-sm text-gray-400">•</span>
                           <span className="text-sm text-gray-300">
                              {movies[currentMovieIndex].genre}
                           </span>
                           <div className="ml-auto flex items-center gap-1">
                              <StarIcon className="h-4 w-4 fill-current text-yellow-400" />
                              <span className="text-sm font-semibold text-white">
                                 {movies[currentMovieIndex].rating ?? 0}/10
                              </span>
                           </div>
                        </div>

                        <h3 className="mb-2 text-xl font-bold text-white lg:text-2xl">
                           {movies[currentMovieIndex].title}
                        </h3>

                        <p className="mb-4 line-clamp-2 text-sm text-gray-300">
                           {movies[currentMovieIndex].shortDescription ?? ''}
                        </p>
                     </div>

                     <Button
                        className="group w-full font-semibold text-white uppercase transition-all"
                        size="lg"
                     >
                        <PlayIcon className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                        Triller
                     </Button>
                  </div>
               </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 transform gap-2">
               {movies.map((_, index) => (
                  <button
                     key={index}
                     onClick={() => goToMovie(index)}
                     className={`h-3 w-3 rounded-full transition-all duration-300 ${
                        index === currentMovieIndex
                           ? 'scale-110 bg-blue-500'
                           : 'bg-white/30 hover:bg-white/50'
                     }`}
                     aria-label={`Go to movie ${index + 1}`}
                  />
               ))}
            </div>
         </div>
      </div>
   );
};

export { HeroCarousel };
