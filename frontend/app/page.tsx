import { Footer } from '@/components/footer';
import { Navbar } from '@/components/header/navbar';
import { HeroSection } from '@/components/home/hero-section';
import { MyMoviesSection } from '@/components/home/my-movies-section';
import { RatingSection } from '@/components/home/rating-section';
import { RecentSection } from '@/components/home/recent-section';
import { SelectedMovieSection } from '@/components/home/selected-movie-section';
import { WatchListSection } from '@/components/home/watch-list-section';
import { getSession } from '@/lib/sessions';
import { Role } from '@/types/session';

const HomePage = async () => {
   const session = await getSession();

   return (
      <main className="w-full">
         <Navbar />
         <HeroSection />
         <RecentSection />
         <SelectedMovieSection />
         <RatingSection />
         <WatchListSection />
         {session && session.user.role === Role.ADMIN && <MyMoviesSection />}
         <Footer />
      </main>
   );
};

export default HomePage;
