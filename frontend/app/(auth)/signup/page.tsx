import type React from 'react';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import { Logo } from '@/components/header/logo';
import { SignupForm } from '@/components/auth/signup-form';

export default function SignupPage() {
   return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
         <div className="absolute inset-0 bg-[url('/blurred-movie-posters-collage-dark-background.jpg')] bg-cover bg-center opacity-10" />
         <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/95 to-slate-900/90" />

         <div className="relative w-full max-w-md">
            <Card className="border-slate-700/50 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
               <CardHeader className="space-y-4 text-center">
                  <div className="flex justify-center">
                     <Logo />
                  </div>

                  <CardTitle className="sr-only text-2xl font-bold text-white">
                     Join <span className="text-yellow-400">MOVIE</span> World
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                     Create your account to access unlimited entertainment
                  </CardDescription>
               </CardHeader>

               <CardContent>
                  <SignupForm />
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
