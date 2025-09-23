import z from 'zod';

export const movieSchema = z.object({
   title: z.string().min(1, 'Title is required'),
   director: z.string().min(1, 'Director is required'),
   language: z.string().optional(),
   country: z.string().optional(),
   duration: z.string().min(1, 'Duration must be a positive number').optional(),
   status: z.string().optional(),
   releaseDate: z.string().optional(),
   shortDescription: z.string().optional(),
   description: z.string().optional(),
   imdbId: z.string().optional(),
   budget: z.string().min(0, 'Budget must be a non-negative number').optional(),
   revenue: z
      .string()
      .min(0, 'Revenue must be a non-negative number')
      .optional(),
   genre: z.array(z.string()).min(1, 'At least one genre is required'),
   actors: z
      .array(
         z.object({
            name: z.string(),
            actorId: z.int(),
            character: z.string().optional(),
            role: z.string().optional(),
            order: z.int(),
         }),
      )
      .optional(),
   imdbRating: z.string().optional(),
});
export type MovieFormData = z.infer<typeof movieSchema>;
