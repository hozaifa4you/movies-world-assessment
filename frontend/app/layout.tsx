import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/header/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from 'sonner';

const geistSans = Geist({
   variable: '--font-geist-sans',
   subsets: ['latin'],
});

const geistMono = Geist_Mono({
   variable: '--font-geist-mono',
   subsets: ['latin'],
});

export const metadata: Metadata = {
   title: 'Movies World - Explore and Discover Movies',
   description:
      'A comprehensive movie database to explore, discover, and stay updated with the latest films and trends in the movie industry.',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} font-main antialiased`}
         >
            <Toaster position="top-center" />
            <Navbar />
            {children}
            <Footer />
         </body>
      </html>
   );
}
