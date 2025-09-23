import { ActorCard } from '@/components/admin-only/actor-card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Search, Plus, SlidersHorizontal } from 'lucide-react';
import { Actor } from '@/types/actors';
import { fetchWithAuth } from '@/lib/authFetch';
import Link from 'next/link';

const ActorsPage = async () => {
   const response = await fetchWithAuth('/actors');
   const result = await response.json();
   if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch actors');
   }

   const actors = result.data as Actor[];

   return (
      <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
         <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
               <div className="space-y-1">
                  <h1 className="text-3xl font-bold tracking-tight">Actors</h1>
                  <p className="text-muted-foreground">
                     Manage your actor profiles ({actors.length} actors)
                  </p>
               </div>
               <Link
                  className={buttonVariants({})}
                  href="/control-panel/actors/new"
               >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Actor
               </Link>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
               <div className="relative max-w-md flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                     placeholder="Search actors by name or nationality..."
                     className="bg-background border-border focus:ring-primary h-10 pr-4 pl-10"
                  />
               </div>

               <div className="flex flex-wrap items-center gap-3">
                  <Select>
                     <SelectTrigger className="h-10 w-[140px]">
                        <SelectValue placeholder="Nationality" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        <SelectItem value="american">American</SelectItem>
                        <SelectItem value="british">British</SelectItem>
                        <SelectItem value="australian">Australian</SelectItem>
                        <SelectItem value="canadian">Canadian</SelectItem>
                     </SelectContent>
                  </Select>

                  {/* Status Filter */}
                  <Select>
                     <SelectTrigger className="h-10 w-[120px]">
                        <SelectValue placeholder="Status" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="living">Living</SelectItem>
                        <SelectItem value="deceased">Deceased</SelectItem>
                     </SelectContent>
                  </Select>

                  <Button variant="outline" size="sm" className="h-10">
                     <SlidersHorizontal className="mr-2 h-4 w-4" />
                     Filters
                  </Button>
               </div>
            </div>
         </div>

         {/* Actors Grid */}
         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {actors.map((actor) => (
               <ActorCard key={actor.id} actor={actor} />
            ))}
         </div>
      </div>
   );
};

export default ActorsPage;
