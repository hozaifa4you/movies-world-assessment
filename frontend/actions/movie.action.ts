'use server';
import 'server-only';
import { fetchWithAuth } from '@/lib/authFetch';
import { formatErrors } from '@/schemas';
import { movieSchema } from '@/schemas/movie.schema';

export const createMovie = async (
   initialState: unknown,
   formData: FormData,
) => {
   const data = {
      title: formData.get('title'),
      director: formData.get('director'),
      language: formData.get('language'),
      country: formData.get('country'),
      duration: formData.get('duration'),
      status: formData.get('status'),
      releaseDate: formData.get('releaseDate'),
      shortDescription: formData.get('shortDescription'),
      description: formData.get('description'),
      imdbId: formData.get('imdbId'),
      imdbRating: formData.get('imdbRating'),
      budget: formData.get('budget'),
      revenue: formData.get('revenue'),
      genre: formData.get('genre')
         ? JSON.parse(formData.get('genre') as string)
         : [],
      actors: formData.get('actors')
         ? JSON.parse(formData.get('actors') as string)
         : undefined,
      posterUrl: formData.get('posterUrl')
         ? formData.get('posterUrl')
         : undefined,
      trailerUrl: formData.get('trailerUrl')
         ? formData.get('trailerUrl')
         : undefined,
   };

   const {
      success,
      data: parsedData,
      error,
   } = await movieSchema.safeParseAsync(data);

   if (!success) {
      return { success: false, errors: formatErrors(error) };
   }

   const response = await fetchWithAuth(`/movies`, {
      method: 'POST',
      body: JSON.stringify(parsedData),
   });

   if (!response.ok) {
      const errorData = await response.json();

      return { success: false, error: errorData.message };
   }

   return { success: true };
};
