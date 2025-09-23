import { fetchWithAuth } from '@/lib/authFetch';
import { formatErrors } from '@/schemas';
import { actorSchema } from '@/schemas/actor.schema';
import { redirect } from 'next/navigation';

const actorActions = async (initialState: unknown, formData: FormData) => {
   const data = {
      name: formData.get('name'),
      bio: formData.get('bio'),
      birthDate: formData.get('birthDate')
         ? new Date(formData.get('birthDate') as string)
         : undefined,
      deathDate: formData.get('deathDate')
         ? new Date(formData.get('deathDate') as string)
         : undefined,
      nationality: formData.get('nationality'),
      called: formData.get('called'),
   };

   const {
      success,
      error,
      data: parsedData,
   } = await actorSchema.safeParseAsync(data);

   if (!success) {
      return { success: false, errors: formatErrors(error), state: data };
   }

   const dataToSend = {
      ...parsedData,
      called: parsedData.called?.split(',').map((s) => s.trim()) || [],
   };

   const response = await fetchWithAuth('/actors', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
   });

   const result = await response.json();

   if (!response.ok) {
      return { success: false, error: result.message, state: data };
   }

   return redirect('/control-panel/actors');
};

export { actorActions };
