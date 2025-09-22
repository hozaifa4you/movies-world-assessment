'use client';
import * as React from 'react';
import {
   IconChartBar,
   IconDashboard,
   IconFolder,
   IconListDetails,
   IconUsers,
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
         title: 'Dashboard',
         url: '#',
         icon: IconDashboard,
      },
      {
         title: 'Lifecycle',
         url: '#',
         icon: IconListDetails,
      },
      {
         title: 'Analytics',
         url: '#',
         icon: IconChartBar,
      },
      {
         title: 'Projects',
         url: '#',
         icon: IconFolder,
      },
      {
         title: 'Team',
         url: '#',
         icon: IconUsers,
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
