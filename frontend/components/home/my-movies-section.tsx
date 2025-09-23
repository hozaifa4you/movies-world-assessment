import { PlusIcon } from 'lucide-react';
import { Button, buttonVariants } from '../ui/button';
import { SectionHeader } from '../header/section-header';
import { fetchWithAuth } from '@/lib/authFetch';
import Link from 'next/link';

const MyMoviesSection = async () => {
   const res = await fetchWithAuth('/my-added');

   const data: { id: number; posterUrl: string | null; title: string }[] =
      await res.json();

   return (
      <section className="section-padding bg-gradient-to-b from-black to-gray-900">
         <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader titlePrimary="My Added" titleSecondary="Movies" />

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
               {data.map((movie, index) => (
                  <div key={index} className="group cursor-pointer">
                     <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-800 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                        <img
                           src={movie.posterUrl || '/placeholder.svg'}
                           alt={movie.title}
                           className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                           <Link
                              href={`/control-panel/movies/${movie.id}/edit`}
                              className={buttonVariants({ size: 'lg' })}
                           >
                              EDIT MOVIES
                           </Link>
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
                        <Link
                           href="/control-panel/movies/new"
                           className={buttonVariants({
                              size: 'lg',
                              className: 'group-hover:scale-110',
                           })}
                        >
                           <PlusIcon className="mr-2 h-5 w-5" />
                           ADD MOVIE
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export { MyMoviesSection };
