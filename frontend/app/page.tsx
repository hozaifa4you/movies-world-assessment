import { HeroSection } from '@/components/home/hero-section';
import { RatingSection } from '@/components/home/rating-section';
import { RecentSection } from '@/components/home/recent-section';
import { SelectedMovieSection } from '@/components/home/selected-movie-section';

const HomePage = () => {
   return (
      <main className="w-full">
         <HeroSection />
         <RecentSection />
         <SelectedMovieSection />
         <RatingSection />
      </main>
   );
};

export default HomePage;
