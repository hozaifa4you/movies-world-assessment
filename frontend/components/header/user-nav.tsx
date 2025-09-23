'use client';
import {
   BoltIcon,
   ChevronDownIcon,
   LogOutIcon,
   UserPenIcon,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Session } from '@/lib/sessions';
import { initial } from '@/lib/utils';
import { toast } from 'sonner';

export interface UserNavProps {
   session: Session | null;
}

export function UserNav({ session }: UserNavProps) {
   const handleLogout = async () => {
      const res = await fetch('/api/auth/session', {
         method: 'DELETE',
         headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
         window.location.href = '/';
         return;
      }

      toast.error('Authentication', {
         description: 'Failed to logout. Please try again.',
      });
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
               <Avatar>
                  <AvatarImage src="./avatar.jpg" alt="Profile image" />
                  <AvatarFallback>
                     {initial(session?.user.name as string)}
                  </AvatarFallback>
               </Avatar>
               <ChevronDownIcon
                  size={16}
                  className="opacity-60"
                  aria-hidden="true"
               />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="max-w-64">
            <DropdownMenuLabel className="flex min-w-0 flex-col">
               <span className="text-foreground truncate text-sm font-medium">
                  {session?.user.name}
               </span>
               <span className="text-muted-foreground truncate text-xs font-normal">
                  {session?.user.email}
               </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <DropdownMenuItem>
                  <BoltIcon
                     size={16}
                     className="opacity-60"
                     aria-hidden="true"
                  />
                  <span>My Rating</span>
               </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <DropdownMenuItem>
                  <UserPenIcon
                     size={16}
                     className="opacity-60"
                     aria-hidden="true"
                  />
                  <span>Billing</span>
               </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
               variant="destructive"
               className="cursor-pointer"
               onClick={handleLogout}
            >
               <LogOutIcon
                  size={16}
                  className="opacity-60"
                  aria-hidden="true"
               />
               <span>Logout</span>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
