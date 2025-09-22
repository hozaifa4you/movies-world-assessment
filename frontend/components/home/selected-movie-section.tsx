import { PlayIcon } from 'lucide-react';
import { Button } from '../ui/button';

const SelectedMovieSection = () => {
   return (
      <section className="section-padding bg-gradient-to-b from-gray-900 to-black">
         <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
               <div className="flex-1 text-center lg:text-left">
                  <h2 className="mb-6 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                     <span className="text-white">ENJOY IT </span>
                     <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        MOVIES
                     </span>
                  </h2>

                  <p className="mb-8 max-w-lg text-lg leading-relaxed text-balance text-gray-400 md:text-xl">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                     Iaculis mollis suscipit maecenas amet eget.
                  </p>

                  <Button className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-500/25">
                     WATCH NOW
                  </Button>
               </div>

               <div className="flex flex-1 justify-center">
                  <div className="relative">
                     <div className="transform overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                        <div className="relative">
                           <img
                              src="/laptop-showing-movie-trailer-with-multiple-charact.jpg"
                              alt="Movie trailer on laptop"
                              className="h-64 w-full object-cover md:h-80"
                           />

                           <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                              <div className="group cursor-pointer rounded-full bg-white/20 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/30">
                                 <PlayIcon className="h-8 w-8 text-white transition-transform group-hover:scale-110" />
                              </div>
                           </div>

                           <div className="absolute right-4 bottom-4 rounded-lg bg-black/80 px-4 py-2 backdrop-blur-sm">
                              <span className="text-sm font-semibold text-white">
                                 TRAILER
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export { SelectedMovieSection };
