import { AppSidebar } from '@/components/admin-only/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { getSession } from '@/lib/sessions';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

const AdminLayout = async ({ children }: PropsWithChildren) => {
   const session = await getSession();
   if (!session) {
      redirect('/signup');
   }

   return (
      <SidebarProvider
         style={
            {
               '--sidebar-width': 'calc(var(--spacing) * 72)',
               '--header-height': 'calc(var(--spacing) * 12)',
            } as React.CSSProperties
         }
      >
         <AppSidebar variant="inset" user={session.user} />
         <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
               <div className="@container/main flex flex-1 flex-col gap-2">
                  {children}
               </div>
            </div>
         </SidebarInset>
      </SidebarProvider>
   );
};

export default AdminLayout;
