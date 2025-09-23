'use client';
import { useRef, useState } from 'react';
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

interface MovieData {
   title: string;
   description: string;
   shortDescription: string;
   director: string;
   releaseDate: string;
   genre: string[];
   rating: number;
   duration: number;
   language: string;
   country: string;
   budget: number;
   revenue: number;
   imdbRating: number;
   imdbId: string;
   status: string;
}

export interface ActorType {
   name: string;
   actorId: number;
   character?: string;
   role?: string;
   order: number;
}

const CreateMovePage = () => {
   const [movieData, setMovieData] = useState<MovieData>({
      title: '',
      description: '',
      shortDescription: '',
      director: '',
      releaseDate: '',
      genre: [],
      rating: 0,
      duration: 0,
      language: '',
      country: '',
      budget: 0,
      revenue: 0,
      imdbRating: 0,
      imdbId: '',
      status: 'upcoming',
   });

   const [poster, setPoster] = useState<File | null>(null);
   const [posterPreview, setPosterPreview] = useState<string>('');
   const [newGenre, setNewGenre] = useState('');
   const [releaseDate, setReleaseDate] = useState<Date>();
   const statusOptions = ['upcoming', 'released', 'in-production', 'cancelled'];
   const [actors, setActors] = useState<ActorType[]>([]);
   const actorsRef = useRef<HTMLInputElement | null>(null);
   const genreRef = useRef<HTMLInputElement | null>(null);
   const releaseDateRef = useRef<HTMLInputElement | null>(null);

   const setActorsWithRef = (actor: ActorType) => {
      setActors((prev) => [...prev, actor]);
      if (actorsRef.current) {
         actorsRef.current.value = JSON.stringify([...actors, actor]);
      }
   };

   const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         setPoster(file);
         const reader = new FileReader();
         reader.onload = (e) => {
            setPosterPreview(e.target?.result as string);
         };
         reader.readAsDataURL(file);
      }
   };

   const addGenre = (genre: string) => {
      if (genre && !movieData.genre.includes(genre)) {
         setMovieData((prev) => ({
            ...prev,
            genre: [...prev.genre, genre],
         }));
      }
      setNewGenre('');
      if (genreRef.current) {
         genreRef.current.value = JSON.stringify([...movieData.genre, genre]);
      }
   };

   const removeGenre = (genreToRemove: string) => {
      setMovieData((prev) => ({
         ...prev,
         genre: prev.genre.filter((g) => g !== genreToRemove),
      }));

      if (genreRef.current) {
         genreRef.current.value = JSON.stringify(
            movieData.genre.filter((g) => g !== genreToRemove),
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
         setMovieData((prev) => ({
            ...prev,
            releaseDate: format(date, 'yyyy-MM-dd'),
         }));

         if (releaseDateRef.current) {
            releaseDateRef.current.value = format(date, 'yyyy-MM-dd');
         }
      }
   };

   return (
      <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
         <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Create New Movie</h1>
         </div>

         <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
               {/* Poster Upload Section */}
               <Card className="lg:col-span-1">
                  <CardHeader>
                     <CardTitle>Movie Poster</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex flex-col items-center space-y-4">
                        {posterPreview ? (
                           <div className="relative">
                              <img
                                 src={posterPreview}
                                 alt="Poster preview"
                                 className="h-72 w-48 rounded-lg object-cover"
                              />
                              <Button
                                 type="button"
                                 variant="destructive"
                                 size="sm"
                                 className="absolute top-2 right-2"
                                 onClick={() => {
                                    setPoster(null);
                                    setPosterPreview('');
                                 }}
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
                        <Label
                           htmlFor="poster-upload"
                           className="cursor-pointer"
                        >
                           <Button type="button" variant="outline">
                              <Upload className="mr-2 h-4 w-4" />
                              Choose Poster
                           </Button>
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
                           <Label htmlFor="title">Title *</Label>
                           <Input
                              id="title"
                              placeholder="Enter movie title"
                              required
                              name="title"
                           />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="director">Director *</Label>
                           <Input
                              id="director"
                              placeholder="Enter director name"
                              required
                              name="director"
                           />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="language">Language</Label>
                           <Input
                              id="language"
                              placeholder="e.g., English, Bangla"
                              name="language"
                           />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="country">Country</Label>
                           <Input
                              id="country"
                              placeholder="e.g., Bangladesh, USA"
                              name="country"
                           />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="duration">Duration (minutes)</Label>
                           <Input
                              id="duration"
                              type="number"
                              placeholder="120"
                              name="duration"
                           />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="status">Status</Label>
                           <Select name="status">
                              <SelectTrigger>
                                 <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                 {statusOptions.map((status) => (
                                    <SelectItem key={status} value={status}>
                                       {status.charAt(0).toUpperCase() +
                                          status.slice(1)}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
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

                           <input
                              type="date"
                              ref={releaseDateRef}
                              className="sr-only"
                              name="releaseDate"
                           />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="imdbId">IMDB ID</Label>
                           <Input
                              id="imdbId"
                              placeholder="e.g., tt1234567"
                              name="imdbId"
                           />
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
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="description">Full Description</Label>
                        <Textarea
                           id="description"
                           placeholder="Detailed movie description"
                           rows={4}
                        />
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
                           />
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
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
               <Card>
                  <CardHeader>
                     <CardTitle>Genres</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     {movieData.genre.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                           {movieData.genre.map((genre) => (
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
                     <CardTitle>Actors</CardTitle>
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

                     <input type="text" ref={actorsRef} className="sr-only" />
                  </CardContent>
               </Card>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
               <Button type="button" variant="outline">
                  Cancel
               </Button>
               <Button type="submit">Create Movie</Button>
            </div>
         </form>
      </div>
   );
};

export default CreateMovePage;
