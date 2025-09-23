'use client';
import * as React from 'react';
import {
   IconAB2,
   IconCurrencyDollar,
   IconDashboard,
   IconDeviceTv,
   IconMovie,
   IconUsers,
   IconUserScan,
} from '@tabler/icons-react';
import { NavMain } from '@/components/nav-main';
import { NavUser, NavUserProps } from '@/components/nav-user';
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Logo2 } from './logo-dashboard';

const data = {
   navMain: [
      {
         title: 'Analytics',
         url: '/control-panel/analytics',
         icon: IconDashboard,
      },
      {
         title: 'Movies',
         url: '/control-panel/movies',
         icon: IconMovie,
      },
      {
         title: 'Tv Shows',
         url: '/control-panel/tv-shows',
         icon: IconDeviceTv,
      },
      {
         title: 'Actors',
         url: '/control-panel/actors',
         icon: IconUserScan,
      },
      {
         title: 'Users',
         url: '/control-panel/users',
         icon: IconUsers,
      },
      {
         title: 'Payments',
         url: '/control-panel/payments',
         icon: IconCurrencyDollar,
      },
      {
         title: 'Subscriptions',
         url: '/control-panel/subscriptions',
         icon: IconAB2,
      },
   ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
   user: NavUserProps;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
   return (
      <Sidebar collapsible="offcanvas" {...props}>
         <SidebarHeader>
            <SidebarMenu>
               <SidebarMenuItem>
                  <SidebarMenuButton
                     asChild
                     className="h-auto data-[slot=sidebar-menu-button]:!p-1.5"
                  >
                     <Logo2 />
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarHeader>
         <SidebarContent>
            <NavMain items={data.navMain} />
         </SidebarContent>
         <SidebarFooter>
            <NavUser {...user} />
         </SidebarFooter>
      </Sidebar>
   );
}
