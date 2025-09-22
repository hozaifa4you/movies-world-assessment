import { HeroSection } from '@/components/home/hero-section';
import { RecentSection } from '@/components/home/recent-section';
import { SelectedMovieSection } from '@/components/home/selected-movie-section';

const HomePage = () => {
   return (
      <main className="w-full">
         <HeroSection />
         <RecentSection />
         <SelectedMovieSection />
      </main>
   );
};

export default HomePage;
