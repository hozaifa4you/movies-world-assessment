'use client';
import { useActionState, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signinAction } from '@/actions/auth.action';
import { toast } from 'sonner';
import Form from 'next/form';

const SigninForm = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [state, action, pending] = useActionState(signinAction, null);

   useEffect(() => {
      if (!state?.success && state?.message) {
         toast.error('Signin', {
            description: state.message,
         });
      }
   }, [state?.message, state?.success]);

   return (
      <Form action={action} className="space-y-6">
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
                  placeholder="Put your password here"
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

            {state?.errors?.password && (
               <p className="text-secondary text-sm">{state.errors.password}</p>
            )}
         </div>

         <Button
            type="submit"
            isLoading={pending}
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
      </Form>
   );
};

export { SigninForm };
