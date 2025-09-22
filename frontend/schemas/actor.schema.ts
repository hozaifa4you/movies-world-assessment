import z from 'zod';

export const actorSchema = z.object({
   name: z.string().min(1).max(100),
   bio: z.string().max(1000).optional(),
   birthDate: z.date().optional(),
   deathDate: z.date().optional(),
   nationality: z.string().optional(),
   called: z.string().optional(),
});
