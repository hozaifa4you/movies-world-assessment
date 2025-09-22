import { HeroSection } from '@/components/home/hero-section';
import { RecentSection } from '@/components/home/recent-section';

const HomePage = () => {
   return (
      <main className="w-full">
         <HeroSection />
         <RecentSection />
      </main>
   );
};

export default HomePage;
