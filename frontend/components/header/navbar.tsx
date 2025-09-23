import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';
import { Logo } from './logo';
import { Search } from './search';
import { getSession } from '@/lib/sessions';
import { UserNav } from './user-nav';

const items = [
   { id: 1, name: 'Movies', href: '/movies' },
   { id: 3, name: 'Watch-list', href: '/watch-list' },
];

const Navbar = async () => {
   const session = await getSession();

   return (
      <nav className="sticky top-0 z-50 w-full bg-gradient-to-b from-black to-gray-900 px-6 py-4 shadow-md backdrop-blur-md">
         <div className="container flex items-center justify-between lg:gap-10">
            {/* Logo */}
            <Logo />

            <div className="hidden flex-1 lg:block">
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

               {session && session.user ? (
                  <UserNav session={session} />
               ) : (
                  <Link
                     className={buttonVariants({ size: 'sm' })}
                     href="/signup"
                  >
                     Sign Up
                  </Link>
               )}
            </div>
         </div>
      </nav>
   );
};

export { Navbar };
