import { Footer } from '@/components/footer';
import { Navbar } from '@/components/header/navbar';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
   return (
      <>
         <Navbar />
         {children}
         <Footer />
      </>
   );
}
