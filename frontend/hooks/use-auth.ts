'use client';
import { Session } from '@/lib/sessions';
import { useEffect, useState } from 'react';

export function useAuth() {
   const [session, setSession] = useState<Session | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchSession = async () => {
         try {
            const response = await fetch('/api/auth/session');
            if (response.ok) {
               const sessionData = await response.json();
               setSession(sessionData);
            }
         } catch (error) {
         } finally {
            setLoading(false);
         }
      };

      fetchSession();
   }, []);

   return {
      ...session,
      loading,
      isAuthenticated: !!session?.user,
   };
}
