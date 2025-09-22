'use client';
import {
   ChevronLeftIcon,
   ChevronRightIcon,
   PlayIcon,
   StarIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const HeroCarousel = () => {
   const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
   const [isAutoPlaying, setIsAutoPlaying] = useState(true);

   const featuredMovies = [
      {
         image: '/sci-fi-action-movie-poster-with-futuristic-soldier.jpg',
         title: 'Quantum Soldier',
         genre: 'Sci-Fi Action',
         rating: 8.7,
         year: '2024',
         description:
            'A futuristic warrior battles through time to save humanity from extinction.',
      },
      {
         image: '/horror-comedy-movie-poster-with-zombie-theme.jpg',
         title: 'Zombie Comedy',
         genre: 'Horror Comedy',
         rating: 7.9,
         year: '2024',
         description:
            'Hilarious undead adventure that will make you laugh and scream.',
      },
      {
         image: '/action-thriller-movie-poster-with-urban-setting.jpg',
         title: 'Urban Strike',
         genre: 'Action Thriller',
         rating: 8.2,
         year: '2024',
         description:
            'High-octane urban warfare with non-stop action sequences.',
      },
   ];

   useEffect(() => {
      if (!isAutoPlaying) return;

      const interval = setInterval(() => {
         setCurrentMovieIndex((prev) => (prev + 1) % featuredMovies.length);
      }, 5000);

      return () => clearInterval(interval);
   }, [isAutoPlaying, featuredMovies.length]);

   const nextMovie = () => {
      setIsAutoPlaying(false);
      setCurrentMovieIndex((prev) => (prev + 1) % featuredMovies.length);
   };

   const prevMovie = () => {
      setIsAutoPlaying(false);
      setCurrentMovieIndex(
         (prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length,
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
                        featuredMovies[currentMovieIndex].image ||
                        '/placeholder.svg'
                     }
                     alt={featuredMovies[currentMovieIndex].title}
                     className="h-96 w-72 object-cover sm:h-[450px] sm:w-80 md:h-[540px] md:w-96"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                  <div className="absolute right-0 bottom-0 left-0 p-4 lg:p-6">
                     <div className="mb-3">
                        <div className="mb-2 flex items-center gap-2">
                           <span className="text-sm font-semibold text-yellow-400">
                              {featuredMovies[currentMovieIndex].year}
                           </span>
                           <span className="text-sm text-gray-400">•</span>
                           <span className="text-sm text-gray-300">
                              {featuredMovies[currentMovieIndex].genre}
                           </span>
                           <div className="ml-auto flex items-center gap-1">
                              <StarIcon className="h-4 w-4 fill-current text-yellow-400" />
                              <span className="text-sm font-semibold text-white">
                                 {featuredMovies[currentMovieIndex].rating}
                              </span>
                           </div>
                        </div>

                        <h3 className="mb-2 text-xl font-bold text-white lg:text-2xl">
                           {featuredMovies[currentMovieIndex].title}
                        </h3>

                        <p className="mb-4 line-clamp-2 text-sm text-gray-300">
                           {featuredMovies[currentMovieIndex].description}
                        </p>
                     </div>

                     <Button className="group w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-3 font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-500/25 lg:py-4">
                        <PlayIcon className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                        WATCH NOW
                     </Button>
                  </div>
               </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 transform gap-2">
               {featuredMovies.map((_, index) => (
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
