import { Edit2, PlayIcon, StarIcon, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

export interface MovieCardProps {
   id: number;
   title: string;
   posterUrl: string | null;
   genre: string[];
   shortDescription: string | null;
   releaseDate: string | null;
   rating: number | null;
   trailerUrl: string | null;
}

const MovieCard = ({
   genre,
   id,
   posterUrl,
   rating,
   releaseDate,
   shortDescription,
   title,
   trailerUrl,
}: MovieCardProps) => {
   return (
      <div className="transform overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl transition-all duration-500 hover:scale-[1.02] lg:rounded-3xl">
         <div className="relative">
            <img
               src={posterUrl ?? '/placeholder.svg'}
               alt={title}
               className="h-96 w-72 object-cover sm:h-[450px] sm:w-80 md:h-[540px] md:w-96"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

            <div className="absolute right-0 bottom-0 left-0 p-4 lg:p-6">
               <div className="mb-3">
                  <div className="mb-2 flex items-center gap-2">
                     <span className="text-sm font-semibold text-yellow-400">
                        {releaseDate || 'N/A'}
                     </span>
                     <span className="text-sm text-gray-400">•</span>
                     <span className="text-sm text-gray-300">
                        {genre?.join(', ')}
                     </span>
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

               <div className="flex w-full gap-2">
                  {trailerUrl && (
                     <Button
                        className="group w-full flex-1 font-semibold text-white transition-all"
                        size="sm"
                     >
                        <PlayIcon className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                        Trailer
                     </Button>
                  )}

                  <Button
                     className="group font-semibold text-white transition-all"
                     size="sm"
                     variant="outline"
                  >
                     <Edit2 className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                     Edit
                  </Button>

                  <Button
                     className="group font-semibold text-white transition-all"
                     size="sm"
                     variant="destructive"
                  >
                     <Trash2 className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                     Delete
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
};

export { MovieCard };
