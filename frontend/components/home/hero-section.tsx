import { HeroCarousel } from './hero-carousel';

const HeroSection = () => {
   return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
         <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-30">
               <img
                  src="/blurred-movie-posters-collage-dark-background.jpg"
                  alt="Background"
                  className="h-full w-full object-cover"
               />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
         </div>

         <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 lg:flex-row lg:gap-20">
               <div className="max-w-2xl flex-1 text-center lg:text-left">
                  <div className="mb-4 lg:mb-6">
                     <span className="inline-block rounded-full border border-sky-500/30 bg-sky-500/20 px-4 py-2 text-sm font-semibold text-sky-400">
                        ✨ Premium Streaming Experience
                     </span>
                  </div>

                  <h1 className="mb-6 text-4xl leading-[0.9] font-black tracking-tight text-sky-400 sm:text-5xl md:text-6xl lg:mb-8 lg:text-7xl xl:text-8xl">
                     <span className="block text-balance">BEST WAY OF</span>
                     <span className="block bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-balance text-transparent">
                        ENTERTAINMENT
                     </span>
                  </h1>

                  <p className="mb-8 text-lg font-semibold text-balance text-white sm:text-xl md:text-2xl">
                     MOVIES AS YOU DEMAND AT USD{' '}
                     <span className="block text-2xl font-bold text-yellow-400 sm:text-3xl md:text-4xl">
                        $10/MONTH
                     </span>
                  </p>

                  <div className="hidden flex-wrap gap-4 text-sm text-gray-300 lg:flex">
                     <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>4K Ultra HD</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Unlimited Downloads</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>No Ads</span>
                     </div>
                  </div>
               </div>

               <HeroCarousel />
            </div>
         </div>
      </section>
   );
};

export { HeroSection };
