import Link from 'next/link';
import { Button } from '../ui/button';
import { Logo } from './logo';
import { Search } from './search';
import { User } from 'lucide-react';

const items = [
   { id: 1, name: 'Movies', href: '/movies' },
   { id: 2, name: 'Tv Shows', href: '/tv-shows' },
   { id: 3, name: 'Watch-list', href: '/watch-list' },
];

const Navbar = () => {
   return (
      <nav className="sticky top-0 z-50 w-full bg-gradient-to-b from-black to-gray-900 px-6 py-4 shadow-md backdrop-blur-md">
         <div className="container flex items-center justify-between lg:gap-10">
            {/* Logo */}
            <Logo />

            <div className="flex-1">
               <Search />
            </div>

            <div className="flex items-center gap-6">
               <Button className="" variant="link">
                  Get Pro
               </Button>

               <menu className="flex items-center gap-4">
                  {items.map((item) => (
                     <li key={item.id}>
                        <Link
                           href={item.href}
                           className="hover:text-secondary transition-all duration-200 ease-in-out"
                        >
                           {item.name}
                        </Link>
                     </li>
                  ))}
               </menu>

               <Button className="" size="icon" variant="ghost">
                  <User />
               </Button>
            </div>
         </div>
      </nav>
   );
};

export { Navbar };
