'use client';
import { Button } from '@/components/ui/button';
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

const MoveHeader = () => {
   return (
      <div className="space-y-6">
         {/* Title and Add Button */}
         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
               <h1 className="text-3xl font-bold tracking-tight">Movies</h1>
               <p className="text-muted-foreground">
                  Manage your movie collection ({10} movies)
               </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 self-start">
               <Plus className="mr-2 h-4 w-4" />
               Add Movie
            </Button>
         </div>

         {/* Search and Filters */}
         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Bar */}
            <div className="relative max-w-md flex-1">
               <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
               <Input
                  placeholder="Search movies by title, genre, or year..."
                  className="bg-background border-border focus:ring-primary h-10 pr-4 pl-10"
               />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
               {/* Genre Filter */}
               <Select>
                  <SelectTrigger className="h-10 w-[140px]">
                     <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Genres</SelectItem>
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
               <Select>
                  <SelectTrigger className="h-10 w-[120px]">
                     <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Years</SelectItem>
                     <SelectItem value="2024">2024</SelectItem>
                     <SelectItem value="2023">2023</SelectItem>
                     <SelectItem value="2022">2022</SelectItem>
                     <SelectItem value="2021">2021</SelectItem>
                  </SelectContent>
               </Select>

               {/* Rating Filter */}
               <Select>
                  <SelectTrigger className="h-10 w-[130px]">
                     <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Ratings</SelectItem>
                     <SelectItem value="9+">9.0+ ⭐</SelectItem>
                     <SelectItem value="8+">8.0+ ⭐</SelectItem>
                     <SelectItem value="7+">7.0+ ⭐</SelectItem>
                     <SelectItem value="6+">6.0+ ⭐</SelectItem>
                  </SelectContent>
               </Select>

               {/* Advanced Filters Button */}
               <Button variant="outline" size="sm" className="h-10">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
               </Button>
            </div>
         </div>

         {/* Active Filters */}
         <div className="flex flex-wrap items-center gap-2">
            <span className="text-muted-foreground text-sm">
               Active filters:
            </span>
            <Badge variant="secondary" className="gap-1">
               Action
               <button className="hover:bg-muted-foreground/20 ml-1 rounded-full p-0.5">
                  ×
               </button>
            </Badge>
            <Badge variant="secondary" className="gap-1">
               2023
               <button className="hover:bg-muted-foreground/20 ml-1 rounded-full p-0.5">
                  ×
               </button>
            </Badge>
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
               Clear all
            </Button>
         </div>
      </div>
   );
};

export { MoveHeader };
