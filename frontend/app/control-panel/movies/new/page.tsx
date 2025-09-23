'use client';
import { useActionState, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { CalendarIcon, X, Upload } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { SearchActor } from '@/components/admin-only/search-actor';
import { createMovie } from '@/actions/movie.action';
import Form from 'next/form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { env } from '@/config/env';
import { useAuth } from '@/hooks/use-auth';

export interface ActorType {
   name: string;
   actorId: number;
   character?: string;
   role?: string;
   order: number;
}

const CreateMovePage = () => {
   const [posterPreview, setPosterPreview] = useState({
      url: '',
      filename: '',
   });
   const [newGenre, setNewGenre] = useState('');
   const [genre, setGenre] = useState<string[]>([]);
   const [releaseDate, setReleaseDate] = useState<Date>();
   const statusOptions = ['upcoming', 'released', 'in-production', 'cancelled'];
   const [actors, setActors] = useState<ActorType[]>([]);
   const actorsRef = useRef<HTMLInputElement | null>(null);
   const genreRef = useRef<HTMLInputElement | null>(null);
   const posterRef = useRef<HTMLInputElement | null>(null);
   const releaseDateRef = useRef<HTMLInputElement | null>(null);
   const [state, action, pending] = useActionState(createMovie, null);
   const router = useRouter();
   const session = useAuth();

   const setActorsWithRef = (actor: ActorType) => {
      setActors((prev) => [...prev, actor]);
      if (actorsRef.current) {
         actorsRef.current.value = JSON.stringify([...actors, actor]);
      }
   };

   const handlePosterChange = async (
      e: React.ChangeEvent<HTMLInputElement>,
   ) => {
      const file = e.target.files?.[0];
      if (file) {
         const formData = new FormData();
         formData.append('poster', file);

         const response = await fetch(
            `${env.nextPublicApiUrl}/api/v1/uploads/poster`,
            {
               method: 'POST',
               headers: {
                  Authorization: `Bearer ${session?.access_token}`,
               },
               body: formData,
            },
         );

         if (!response.ok) {
            toast.error('Poster Upload', {
               description: 'Failed to upload poster. Please try again.',
            });
         }

         const data = await response.json();
         console.log(data);

         setPosterPreview(data);
         if (posterRef.current) {
            posterRef.current.value = data.url;
         }
      }
   };

   const handlePosterRemove = async (filename: string) => {
      const response = await fetch(
         `${env.nextPublicApiUrl}/api/v1/uploads/poster/${filename}`,
         {
            method: 'DELETE',
            headers: {
               Authorization: `Bearer ${session?.access_token}`,
               'Content-Type': 'application/json',
            },
         },
      );

      if (!response.ok) {
         toast.error('Poster Remove', {
            description: 'Failed to remove poster. Please try again.',
         });
         return;
      }

      setPosterPreview({ url: '', filename: '' });
      if (posterRef.current) {
         posterRef.current.value = '';
      }
   };

   const addGenre = (_genre: string) => {
      if (genre && !genre.includes(_genre)) {
         setGenre((prev) => [...prev, _genre]);
      }
      setNewGenre('');
      if (genreRef.current) {
         genreRef.current.value = JSON.stringify([...genre, _genre]);
      }
   };

   const removeGenre = (genreToRemove: string) => {
      setGenre((prev) => prev.filter((g) => g !== genreToRemove));

      if (genreRef.current) {
         genreRef.current.value = JSON.stringify(
            genre.filter((g) => g !== genreToRemove),
         );
      }
   };

   const removeActor = (actorId: number) => {
      setActors((prev) => prev.filter((actor) => actor.actorId !== actorId));
      if (actorsRef.current) {
         actorsRef.current.value = JSON.stringify(
            actors.filter((actor) => actor.actorId !== actorId),
         );
      }
   };

   const handleDateSelect = (date: Date | undefined) => {
      setReleaseDate(date);
      if (date) {
         if (releaseDateRef.current) {
            releaseDateRef.current.value = format(date, 'yyyy-MM-dd');
         }
      }
   };

   useEffect(() => {
      if (state?.error && !state.success) {
         toast.error('Create Failed', { description: state.error.toString() });
      }

      if (state?.success) {
         toast.success('Create Done', {
            description: 'Movie has been created successfully.',
         });
         router.push('/control-panel/movies');
      }
   }, [state?.error, state?.success]);

   return (
      <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
         <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Create New Movie</h1>
         </div>

         <Form action={action} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
               {/* Poster Upload Section */}
               <Card className="lg:col-span-1">
                  <CardHeader>
                     <CardTitle>Movie Poster</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex flex-col items-center space-y-4">
                        {posterPreview.url ? (
                           <div className="relative">
                              <img
                                 src={posterPreview.url}
                                 alt="Poster preview"
                                 className="h-72 w-48 rounded-lg object-cover"
                              />
                              <Button
                                 type="button"
                                 variant="destructive"
                                 size="sm"
                                 className="absolute top-2 right-2"
                                 onClick={() =>
                                    handlePosterRemove(posterPreview.filename)
                                 }
                              >
                                 <X className="h-4 w-4" />
                              </Button>
                           </div>
                        ) : (
                           <div className="flex h-72 w-48 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                              <div className="text-center">
                                 <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                 <p className="mt-2 text-sm text-gray-500">
                                    Upload Poster
                                 </p>
                              </div>
                           </div>
                        )}

                        <Input
                           type="file"
                           accept="image/*"
                           onChange={handlePosterChange}
                           className="hidden"
                           id="poster-upload"
                        />

                        <input
                           type="text"
                           name="posterUrl"
                           className="sr-only"
                           ref={posterRef}
                        />
                        <Label
                           htmlFor="poster-upload"
                           className="inline-block cursor-pointer"
                        >
                           <div className="border-input bg-background ring-offset-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm">
                              <Upload className="h-4 w-4" />
                              Choose Poster
                           </div>
                        </Label>
                     </div>
                  </CardContent>
               </Card>

               {/* Movie Information Section */}
               <Card className="lg:col-span-2">
                  <CardHeader>
                     <CardTitle>Movie Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                           <Label htmlFor="title">
                              Title<small className="text-secondary">*</small>
                           </Label>
                           <Input
                              id="title"
                              placeholder="Enter movie title"
                              required
                              name="title"
                           />

                           {state?.errors?.title && (
                              <p className="text-secondary text-sm">
                                 {state.errors.title}
                              </p>
                           )}
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="director">
                              Director
                              <small className="text-secondary">*</small>
                           </Label>
                           <Input
                              id="director"
                              placeholder="Enter director name"
                              required
                              name="director"
                           />

                           {state?.errors?.director && (
                              <p className="text-secondary text-sm">
                                 {state.errors.director}
                              </p>
                           )}
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="language">Language</Label>
                           <Input
                              id="language"
                              placeholder="e.g., English, Bangla"
                              name="language"
                           />

                           {state?.errors?.language && (
                              <p className="text-secondary text-sm">
                                 {state.errors.language}
                              </p>
                           )}
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="country">Country</Label>
                           <Input
                              id="country"
                              placeholder="e.g., Bangladesh, USA"
                              name="country"
                           />

                           {state?.errors?.country && (
                              <p className="text-secondary text-sm">
                                 {state.errors.country}
                              </p>
                           )}
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="duration">
                              Duration
                              <small className="text-secondary">*</small>{' '}
                              (minutes)
                           </Label>
                           <Input
                              id="duration"
                              type="number"
                              placeholder="120"
                              name="duration"
                           />

                           {state?.errors?.duration && (
                              <p className="text-secondary text-sm">
                                 {state.errors.duration}
                              </p>
                           )}
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="status">
                              Status<small className="text-secondary">*</small>
                           </Label>
                           <Select name="status">
                              <SelectTrigger className="w-full">
                                 <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent className="w-full">
                                 {statusOptions.map((status) => (
                                    <SelectItem key={status} value={status}>
                                       {status.charAt(0).toUpperCase() +
                                          status.slice(1)}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>

                           {state?.errors?.status && (
                              <p className="text-secondary text-sm">
                                 {state.errors.status}
                              </p>
                           )}
                        </div>

                        <div className="space-y-2">
                           <Label>Release Date</Label>
                           <Popover>
                              <PopoverTrigger asChild>
                                 <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                 >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {releaseDate
                                       ? format(releaseDate, 'PPP')
                                       : 'Pick a date'}
                                 </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                 <Calendar
                                    mode="single"
                                    selected={releaseDate}
                                    onSelect={handleDateSelect}
                                    initialFocus
                                 />
                              </PopoverContent>
                           </Popover>

                           {state?.errors?.releaseDate && (
                              <p className="text-secondary text-sm">
                                 {state.errors.releaseDate}
                              </p>
                           )}

                           <input
                              type="date"
                              ref={releaseDateRef}
                              className="sr-only"
                              name="releaseDate"
                           />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="trailerUrl">Trailer URL</Label>
                           <Input
                              id="trailerUrl"
                              type="url"
                              name="trailerUrl"
                              placeholder="e.g., https://www.youtube.com/watch?v=123456"
                           />

                           {state?.errors?.trailerUrl && (
                              <p className="text-secondary text-sm">
                                 {state.errors.trailerUrl}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="shortDescription">
                           Short Description
                        </Label>
                        <Textarea
                           id="shortDescription"
                           placeholder="Brief description (1-2 sentences)"
                           rows={2}
                           name="shortDescription"
                        />

                        {state?.errors?.shortDescription && (
                           <p className="text-secondary text-sm">
                              {state.errors.shortDescription}
                           </p>
                        )}
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="description">Full Description</Label>
                        <Textarea
                           id="description"
                           placeholder="Detailed movie description"
                           rows={4}
                           name="description"
                        />

                        {state?.errors?.description && (
                           <p className="text-secondary text-sm">
                              {state.errors.description}
                           </p>
                        )}
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Ratings and Financial Information */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
               <Card>
                  <CardHeader>
                     <CardTitle>IMDB</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor="imdb-id">IMDB ID (0-10)</Label>
                           <Input
                              id="imdb-id"
                              type="text"
                              name="imdbId"
                              placeholder="e.g., tt1234567"
                           />

                           {state?.errors?.imdbId && (
                              <p className="text-secondary text-sm">
                                 {state.errors.imdbId}
                              </p>
                           )}
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="imdbRating">
                              IMDB Rating (0-10)
                           </Label>
                           <Input
                              id="imdbRating"
                              type="number"
                              step="0.1"
                              min="0"
                              max="10"
                              placeholder="8.6"
                              name="imdbRating"
                           />

                           {state?.errors?.imdbRating && (
                              <p className="text-secondary text-sm">
                                 {state.errors.imdbRating}
                              </p>
                           )}
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader>
                     <CardTitle>Financial Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor="budget">Budget (Million $)</Label>
                           <Input
                              id="budget"
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="12.00"
                              name="budget"
                           />

                           {state?.errors?.budget && (
                              <p className="text-secondary text-sm">
                                 {state.errors.budget}
                              </p>
                           )}
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="revenue">Revenue (Million $)</Label>
                           <Input
                              id="revenue"
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="32.54"
                              name="revenue"
                           />

                           {state?.errors?.revenue && (
                              <p className="text-secondary text-sm">
                                 {state.errors.revenue}
                              </p>
                           )}
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
               <Card>
                  <CardHeader>
                     <CardTitle>
                        Genres<small className="text-secondary">*</small>
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     {genre.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                           {genre.map((genre) => (
                              <Badge
                                 key={genre}
                                 variant="secondary"
                                 className="px-3 py-1"
                              >
                                 {genre}
                                 <button
                                    type="button"
                                    onClick={() => removeGenre(genre)}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                 >
                                    <X className="h-3 w-3" />
                                 </button>
                              </Badge>
                           ))}
                        </div>
                     )}

                     <div className="flex gap-2">
                        <Input
                           value={newGenre}
                           onChange={(e) => setNewGenre(e.target.value)}
                           placeholder="Type & Enter"
                           onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                 e.preventDefault();
                                 addGenre(newGenre);
                              }
                           }}
                        />

                        {state?.errors?.genre && (
                           <p className="text-secondary text-sm">
                              {state.errors.genre}
                           </p>
                        )}

                        <input
                           type="text"
                           ref={genreRef}
                           className="sr-only"
                           name="genre"
                        />
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader>
                     <CardTitle>
                        Actors<small className="text-secondary">*</small>
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     {actors.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                           {actors.map((actor) => (
                              <Badge
                                 key={actor.actorId}
                                 variant="secondary"
                                 className="px-3 py-1"
                              >
                                 {actor.name}
                                 <button
                                    type="button"
                                    onClick={() => removeActor(actor.actorId)}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                 >
                                    <X className="h-3 w-3" />
                                 </button>
                              </Badge>
                           ))}
                        </div>
                     )}

                     <SearchActor
                        actors={actors}
                        setActors={setActorsWithRef}
                     />

                     {state?.errors?.actors && (
                        <p className="text-secondary text-sm">
                           {state.errors.actors}
                        </p>
                     )}

                     <input
                        type="text"
                        ref={actorsRef}
                        className="sr-only"
                        name="actors"
                     />
                  </CardContent>
               </Card>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
               <Button type="button" variant="outline">
                  Cancel
               </Button>
               <Button isLoading={pending} type="submit">
                  Create Movie
               </Button>
            </div>
         </Form>
      </div>
   );
};

export default CreateMovePage;
