'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Eye, EyeOff, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const SigninForm = () => {
   const [showPassword, setShowPassword] = useState(false);

   return (
      <form className="space-y-6">
         <div className="space-y-2">
            <Label htmlFor="email" className="font-medium text-white">
               Email Address
            </Label>
            <Input
               id="email"
               name="email"
               type="email"
               placeholder="Enter your email"
               required
               className="h-12 border-slate-600 bg-slate-800/50 text-white placeholder:text-slate-400 focus:border-sky-400 focus:ring-sky-400/20"
            />
         </div>

         <div className="space-y-2">
            <Label htmlFor="password" className="font-medium text-white">
               Password
            </Label>
            <div className="relative">
               <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  required
                  className="h-12 border-slate-600 bg-slate-800/50 pr-12 text-white placeholder:text-slate-400 focus:border-sky-400 focus:ring-sky-400/20"
               />
               <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 transition-colors hover:text-white"
               >
                  {showPassword ? (
                     <EyeOff className="h-5 w-5" />
                  ) : (
                     <Eye className="h-5 w-5" />
                  )}
               </button>
            </div>
         </div>

         <Button
            type="submit"
            className="h-12 w-full font-mono text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02]"
         >
            Login
         </Button>

         <div className="space-y-4 text-center">
            <p className="text-sm text-slate-400">
               Don't have an account?{' '}
               <Link
                  href="/signup"
                  className="text-secondary hover:text-secondary/90 font-medium transition-colors"
               >
                  Sign up
               </Link>
            </p>
         </div>
      </form>
   );
};

export { SigninForm };
