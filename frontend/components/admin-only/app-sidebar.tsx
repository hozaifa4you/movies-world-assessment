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
         title: 'Movies',
         url: '/control-panel/movies',
         icon: IconMovie,
      },
      {
         title: 'Actors',
         url: '/control-panel/actors',
         icon: IconUserScan,
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
