'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Eye, EyeOff, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useActionState, useEffect, useState } from 'react';
import Form from 'next/form';
import { signupAction } from '@/actions/auth.action';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { stat } from 'fs';

const SignupForm = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [state, action, pending] = useActionState(signupAction, null);
   const router = useRouter();

   useEffect(() => {
      if (state?.success && state?.message) {
         toast.success('Signup', {
            description: state.message,
            duration: 2000,
         });
      }

      if (!state?.success && state?.message) {
         toast.error('Signup', {
            description: state.message,
         });
      }
   }, [state?.message, state?.success]);

   useEffect(() => {
      let timeout: NodeJS.Timeout;

      if (state?.success) {
         timeout = setTimeout(() => {
            router.push('/signin');
         }, 2000);
      }

      return () => {
         clearTimeout(timeout);
      };
   }, [router, state?.success]);

   return (
      <Form action={action} className="space-y-6">
         <div className="space-y-2">
            <Label htmlFor="name" className="font-medium text-white">
               Full Name
            </Label>
            <Input
               id="name"
               name="name"
               type="text"
               placeholder="Enter your full name"
               className="h-12 border-slate-600 bg-slate-800/50 text-white placeholder:text-slate-400 focus:border-sky-400 focus:ring-sky-400/20"
               defaultValue={(state?.state?.name as string) ?? ''}
            />

            {state?.errors?.name && (
               <p className="text-secondary mt-1 text-sm">
                  {state.errors.name}
               </p>
            )}
         </div>

         <div className="space-y-2">
            <Label htmlFor="email" className="font-medium text-white">
               Email Address
            </Label>
            <Input
               id="email"
               name="email"
               // type="email"
               placeholder="Enter your email"
               defaultValue={(state?.state?.email as string) ?? ''}
               className="h-12 border-slate-600 bg-slate-800/50 text-white placeholder:text-slate-400 focus:border-sky-400 focus:ring-sky-400/20"
            />
            {state?.errors?.email && (
               <p className="text-secondary text-sm">{state.errors.email}</p>
            )}
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

            {state?.errors?.password && (
               <p className="text-secondary text-sm">{state.errors.password}</p>
            )}
         </div>

         <Button
            type="submit"
            isLoading={pending}
            size="lg"
            className="w-full font-mono shadow-lg transition-all hover:scale-[1.02]"
         >
            Create Account
         </Button>

         <div className="space-y-4 text-center">
            <p className="text-sm text-slate-400">
               Already have an account?{' '}
               <Link
                  href="/signin"
                  className="text-secondary hover:text-secondary/90 font-medium transition-colors"
               >
                  Sign in
               </Link>
            </p>

            <div className="text-xs text-slate-500">
               By creating an account, you agree to our{' '}
               <Link
                  href="/terms"
                  className="text-secondary hover:text-secondary/90"
               >
                  Terms of Service
               </Link>{' '}
               and{' '}
               <Link
                  href="/privacy"
                  className="text-secondary hover:text-secondary/90"
               >
                  Privacy Policy
               </Link>
            </div>
         </div>
      </Form>
   );
};

export { SignupForm };
