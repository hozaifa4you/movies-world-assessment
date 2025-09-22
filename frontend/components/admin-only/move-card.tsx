import { PlayIcon, StarIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface MovieCardProps {
   title: string;
   poster: string;
   year: string;
   genre: string;
   shortDescription: string;
   rating: number;
}

const MovieCard = ({
   genre,
   poster,
   title,
   rating,
   shortDescription,
   year,
}: MovieCardProps) => {
   return (
      <div className="transform overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl transition-all duration-500 hover:scale-[1.02] lg:rounded-3xl">
         <div className="relative">
            <img
               src={poster || '/placeholder.svg'}
               alt={title}
               className="h-96 w-72 object-cover sm:h-[450px] sm:w-80 md:h-[540px] md:w-96"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

            <div className="absolute right-0 bottom-0 left-0 p-4 lg:p-6">
               <div className="mb-3">
                  <div className="mb-2 flex items-center gap-2">
                     <span className="text-sm font-semibold text-yellow-400">
                        {year}
                     </span>
                     <span className="text-sm text-gray-400">•</span>
                     <span className="text-sm text-gray-300">{genre}</span>
                     <div className="ml-auto flex items-center gap-1">
                        <StarIcon className="h-4 w-4 fill-current text-yellow-400" />
                        <span className="text-sm font-semibold text-white">
                           {rating}
                        </span>
                     </div>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-white lg:text-2xl">
                     {title}
                  </h3>

                  <p className="mb-4 line-clamp-2 text-sm text-gray-300">
                     {shortDescription}
                  </p>
               </div>

               <Button
                  className="group w-full font-semibold text-white transition-all"
                  size="lg"
               >
                  <PlayIcon className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  WATCH NOW
               </Button>
            </div>
         </div>
      </div>
   );
};

export { MovieCard };
