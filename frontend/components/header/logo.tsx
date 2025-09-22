import { cn } from '@/lib/utils';
import Link from 'next/link';

interface LogoProps {
   className?: string;
}

const Logo = ({ className }: LogoProps) => {
   return (
      <Link
         href="/"
         className={cn('flex shrink-0 items-center gap-1', className)}
      >
         <svg
            width="25"
            height="25"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               fillRule="evenodd"
               clipRule="evenodd"
               d="M39 0H26V13H13H0V26V39V52H13H26V39H39H52V26V13V0H39ZM13 39H26V26H39V13H26V26H13V39Z"
               fill="#155dfb"
            />
         </svg>

         <span className="leading-none">
            <span className="block text-2xl leading-none font-black text-blue-500">
               MOVIE<span className="text-xl font-light">s</span>
            </span>
            <span className="text-secondary -mt-1 block text-end text-sm leading-none font-medium">
               WORLD
            </span>
         </span>
      </Link>
   );
};

export { Logo };
