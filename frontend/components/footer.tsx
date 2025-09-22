import { FacebookIcon, InstagramIcon, XIcon } from 'lucide-react';
import { Logo } from './header/logo';
import Link from 'next/link';

const socialItems = [
   { id: 1, Icon: FacebookIcon, name: 'Facebook', url: '#' },
   { id: 2, Icon: XIcon, name: 'X', url: '#' },
   { id: 3, Icon: InstagramIcon, name: 'Instagram', url: '#' },
];

const Footer = () => {
   return (
      <footer className="section-padding border-t border-gray-800 bg-black !pb-0">
         <div className="container mb-5">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
               {/* Upcoming Movies Column */}
               <div>
                  <h3 className="mb-6 text-xl font-bold text-white">
                     UPCOMING MOVIES
                  </h3>
                  <ul className="space-y-1.5">
                     {[
                        'JAWAN',
                        'The Vampire Diaries',
                        'Barbie',
                        'Teen all',
                        'NCIS',
                     ].map((movie, index) => (
                        <li key={index}>
                           <Link
                              href="#"
                              className="hover:text-secondary text-sm text-gray-400 transition-colors duration-300"
                           >
                              {movie}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Additional Pages Column */}
               <div>
                  <h3 className="mb-6 text-xl font-bold text-white">
                     ADDITIONAL PAGES
                  </h3>
                  <ul className="space-y-1.5">
                     {[
                        'Terms & Conditions',
                        'Privacy Policy',
                        'Cookie Policy',
                     ].map((page, index) => (
                        <li key={index}>
                           <a
                              href="#"
                              className="hover:text-secondary text-sm text-gray-400 transition-colors duration-300"
                           >
                              {page}
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Brand and Social Column */}
               <div>
                  <div className="mb-6">
                     <Logo />
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-gray-400">
                     ©2025 moviesworld.me All Rights Reserved. This site is not
                     affiliated or owned by the listed movie streaming platform
                     owners.
                  </p>

                  {/* Social Media Icons */}
                  <div className="flex gap-3">
                     {socialItems.map((item, index) => (
                        <Link
                           key={index}
                           href={item.url}
                           className="flex size-9 items-center justify-center rounded-xl bg-blue-600 transition-all duration-300 hover:scale-110 hover:bg-blue-700"
                           aria-label={`Social media link ${index + 1}`}
                        >
                           <item.Icon className="size-4.5 text-white" />
                        </Link>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom Copyright */}
         <div className="border-t border-gray-800 py-6">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
               <p className="text-center text-sm text-gray-500">
                  Copyright ©2025 moviesworld.me ALL Right Reserved
               </p>
            </div>
         </div>
      </footer>
   );
};

export { Footer };
