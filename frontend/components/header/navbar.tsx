import { Search, ChevronDown, X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Logo } from './logo';

const Navbar = () => {
   return (
      <nav className="w-full px-6 py-4">
         <div className="container flex items-center justify-between">
            {/* Logo */}
            <Logo />
         </div>
      </nav>
   );
};

export { Navbar };
