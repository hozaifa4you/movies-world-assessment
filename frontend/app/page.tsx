import { Footer } from '@/components/footer';
import { Navbar } from '@/components/header/navbar';
import { HeroSection } from '@/components/home/hero-section';
import { MyMoviesSection } from '@/components/home/my-movies-section';
import { RatingSection } from '@/components/home/rating-section';
import { RecentSection } from '@/components/home/recent-section';
import { SelectedMovieSection } from '@/components/home/selected-movie-section';
import { WatchListSection } from '@/components/home/watch-list-section';

const HomePage = () => {
   return (
      <main className="w-full">
         <Navbar />
         <HeroSection />
         <RecentSection />
         <SelectedMovieSection />
         <RatingSection />
         <WatchListSection />
         <MyMoviesSection />
         <Footer />
      </main>
   );
};

export default HomePage;
