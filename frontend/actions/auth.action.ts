'use server';
import { fetchWithoutAuth } from '@/lib/authFetch';
import { formatErrors } from '@/schemas';
import { signupSchema } from '@/schemas/auth.schema';
import 'server-only';

const signupAction = async (initialState: unknown, formData: FormData) => {
   const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
   };

   const {
      success,
      data: parsedData,
      error,
   } = await signupSchema.safeParseAsync(data);

   if (!success) {
      return {
         success: false,
         state: data,
         errors: formatErrors<typeof data>(error),
      };
   }

   const response = await fetchWithoutAuth('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(parsedData),
   });

   if (!response.ok) {
      const result = await response.json();

      return {
         success: false,
         state: data,
         message: result.message,
      };
   }

   return { success: true, message: 'Signup successful!' };
};

export { signupAction };
