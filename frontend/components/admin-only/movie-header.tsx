'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Plus, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

type FilterKey = 'search' | 'genre' | 'year' | 'rating';

const MoveHeader = () => {
   const searchParams = useSearchParams();
   const params = new URLSearchParams(searchParams.toString());
   const route = useRouter();
   const pathname = usePathname();

   const year = params.get('year');
   const rating = params.get('rating');
   const genre = params.get('genre');
   const search = params.get('search');

   const removeFilter = (filterKey: FilterKey) => {
      params.delete(filterKey);
      const newPath = `/control-panel/movies?${params.toString()}`;
      route.push(newPath);
   };

   const removeAllFilters = () => {
      params.delete('search');
      params.delete('genre');
      params.delete('year');
      params.delete('rating');

      const newPath = `/control-panel/movies?${params.toString()}`;
      route.push(newPath);
   };

   const setParams = (key: FilterKey, value: string) => {
      params.set(key, value);
      const newPath = `/control-panel/movies?${params.toString()}`;
      route.push(newPath);
   };

   const handleSearch = (value: string) => {
      if (value) {
         setParams('search', value);
      }
   };

   return (
      <div className="space-y-6">
         {/* Title and Add Button */}
         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
               <h1 className="text-3xl font-bold tracking-tight">Movies</h1>
               <p className="text-muted-foreground">
                  {pathname === '/movies'
                     ? 'Browse and explore all movies'
                     : 'Manage movies in the database'}
               </p>
            </div>
            {pathname !== '/movies' && (
               <Link
                  href="/control-panel/movies/new"
                  className={buttonVariants({})}
               >
                  <Plus />
                  Add Movie
               </Link>
            )}
         </div>

         {/* Search and Filters */}
         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Bar */}
            <div className="relative max-w-md flex-1">
               <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
               <Input
                  onChange={(event) => handleSearch(event.target.value)}
                  placeholder="Search movies by title, genre, or year..."
                  className="bg-background border-border focus:ring-primary h-10 pr-4 pl-10"
               />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
               {/* Genre Filter */}
               <Select onValueChange={(value) => setParams('genre', value)}>
                  <SelectTrigger className="h-10 w-[140px]">
                     <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="action">Action</SelectItem>
                     <SelectItem value="thriller">Thriller</SelectItem>
                     <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                     <SelectItem value="romance">Romance</SelectItem>
                     <SelectItem value="fantasy">Fantasy</SelectItem>
                     <SelectItem value="comedy">Comedy</SelectItem>
                     <SelectItem value="horror">Horror</SelectItem>
                     <SelectItem value="adventure">Adventure</SelectItem>
                     <SelectItem value="mystery">Mystery</SelectItem>
                     <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
               </Select>

               {/* Year Filter */}
               <Select onValueChange={(value) => setParams('year', value)}>
                  <SelectTrigger className="h-10 w-[120px]">
                     <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="2024">2024</SelectItem>
                     <SelectItem value="2023">2023</SelectItem>
                     <SelectItem value="2022">2022</SelectItem>
                     <SelectItem value="2021">2021</SelectItem>
                     <SelectItem value="2020">2020</SelectItem>
                     <SelectItem value="2019">2019</SelectItem>
                     <SelectItem value="2018">2018</SelectItem>
                     <SelectItem value="2017">2017</SelectItem>
                     <SelectItem value="2016">2016</SelectItem>
                     <SelectItem value="2015">2015</SelectItem>
                     <SelectItem value="2010">2010</SelectItem>
                     <SelectItem value="2005">2005</SelectItem>
                     <SelectItem value="2000">2000</SelectItem>
                     <SelectItem value="1995">1995</SelectItem>
                     <SelectItem value="1990">1990</SelectItem>
                     <SelectItem value="1980">1980</SelectItem>
                     <SelectItem value="1970">1970</SelectItem>
                  </SelectContent>
               </Select>

               {/* Rating Filter */}
               <Select onValueChange={(value) => setParams('rating', value)}>
                  <SelectTrigger className="h-10 w-[130px]">
                     <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="9">9.0+ ⭐</SelectItem>
                     <SelectItem value="8">8.0+ ⭐</SelectItem>
                     <SelectItem value="7">7.0+ ⭐</SelectItem>
                     <SelectItem value="6">6.0+ ⭐</SelectItem>
                     <SelectItem value="5">5.0+ ⭐</SelectItem>
                     <SelectItem value="4">4.0+ ⭐</SelectItem>
                     <SelectItem value="3">3.0+ ⭐</SelectItem>
                     <SelectItem value="2">2.0+ ⭐</SelectItem>
                     <SelectItem value="1">1.0+ ⭐</SelectItem>
                  </SelectContent>
               </Select>

               {/* Advanced Filters Button */}
               <Button disabled variant="outline" size="sm" className="h-10">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
               </Button>
            </div>
         </div>

         {/* Active Filters */}
         {(search || genre || rating || year) && (
            <div className="flex flex-wrap items-center gap-2">
               <span className="text-muted-foreground text-sm">
                  Active filters:
               </span>
               {genre && (
                  <Badge variant="secondary" className="gap-1">
                     {genre}
                     <button
                        onClick={() => removeFilter('genre')}
                        className="hover:bg-muted-foreground/20 ml-1 rounded-full p-0.5"
                     >
                        ×
                     </button>
                  </Badge>
               )}
               {year && (
                  <Badge variant="secondary" className="gap-1">
                     {year}
                     <button
                        onClick={() => removeFilter('year')}
                        className="hover:bg-muted-foreground/20 ml-1 rounded-full p-0.5"
                     >
                        ×
                     </button>
                  </Badge>
               )}
               {search && (
                  <Badge variant="secondary" className="gap-1">
                     {search}
                     <button
                        onClick={() => removeFilter('search')}
                        className="hover:bg-muted-foreground/20 ml-1 rounded-full p-0.5"
                     >
                        ×
                     </button>
                  </Badge>
               )}
               {rating && (
                  <Badge variant="secondary" className="gap-1">
                     {rating}
                     <button
                        onClick={() => removeFilter('rating')}
                        className="hover:bg-muted-foreground/20 ml-1 rounded-full p-0.5"
                     >
                        ×
                     </button>
                  </Badge>
               )}

               <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={removeAllFilters}
               >
                  Clear all
               </Button>
            </div>
         )}
      </div>
   );
};

export { MoveHeader };
