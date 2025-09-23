import { SectionHeader } from '../header/section-header';
import { RatingSlider } from './rating-slider';

const RatingSection = () => {
   return (
      <section className="bg-gradient-to-b from-black to-gray-900 py-16 md:py-24">
         <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader titlePrimary="MOVIES YOU" titleSecondary="RATED" />

            <RatingSlider />
         </div>
      </section>
   );
};

export { RatingSection };
