'use client';
import { useCallback, useEffect, useId, useState } from 'react';
import {
   ArrowRightIcon,
   LoaderCircleIcon,
   SearchIcon,
   User,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { Label } from '../ui/label';
import { ActorType } from '@/app/control-panel/movies/new/page';
import { env } from '@/config/env';

interface SearchResult {
   id: number;
   name: string;
   avatarUrl: string | null;
}

interface SearchActorProps {
   setActors: (actor: ActorType) => void;
   actors: ActorType[];
}

export function SearchActor({ actors, setActors }: SearchActorProps) {
   const id = useId();
   const [inputValue, setInputValue] = useState('');
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
   const session = useAuth();
   const [selectedActor, setSelectedActor] = useState<ActorType | null>(null);

   const handleActorSelect = (actor: SearchResult) => {
      setSelectedActor({
         actorId: actor.id,
         character: '',
         role: '',
         order: actors.length + 1,
         name: actor.name,
      });
      setSearchResults([]);
   };

   const handleInputFocus = () => {
      if (inputValue.trim() && searchResults.length > 0) {
      }
   };

   const handleInputBlur = () => {};

   const handleAddActor = () => {
      setActors(selectedActor!);
      setSelectedActor(null);
      setInputValue('');
   };

   const handleSearch = useCallback(
      async (query: string) => {
         if (!query.trim()) {
            setSearchResults([]);
            setIsLoading(false);
            return;
         }

         setIsLoading(true);
         try {
            const response = await fetch(
               `${env.nextPublicApiUrl}/api/v1/actors/search?q=${query}`,
               {
                  headers: {
                     Authorization: `Bearer ${session?.access_token}`,
                     'Content-Type': 'application/json',
                  },
               },
            );

            if (response.ok) {
               const data = await response.json();
               setSearchResults(data);
            } else {
               setSearchResults([]);
            }
         } catch (error) {
            setSearchResults([]);
         } finally {
            setIsLoading(false);
         }
      },
      [session?.access_token],
   );

   useEffect(() => {
      const timeoutId = setTimeout(() => {
         if (inputValue.trim()) {
            handleSearch(inputValue.trim());
         } else {
            setSearchResults([]);
            setIsLoading(false);
         }
      }, 500);

      return () => clearTimeout(timeoutId);
   }, [inputValue, handleSearch]);

   return (
      <div className="relative w-full *:not-first:mt-2">
         {!selectedActor && (
            <div className="relative">
               <Input
                  id={id}
                  className="peer ps-9 pe-9"
                  placeholder="Search actors..."
                  type="search"
                  value={inputValue}
                  onChange={(e) => {
                     setInputValue(e.target.value);
                  }}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
               />
               <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  {isLoading ? (
                     <LoaderCircleIcon
                        className="animate-spin"
                        size={16}
                        role="status"
                        aria-label="Loading..."
                     />
                  ) : (
                     <SearchIcon size={16} aria-hidden="true" />
                  )}
               </div>
               <button
                  className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Search"
                  type="submit"
               >
                  <ArrowRightIcon size={16} aria-hidden="true" />
               </button>
            </div>
         )}

         {/* Search Results Dropdown */}
         {searchResults.length > 0 && (
            <Card className="absolute top-full right-0 left-0 z-50 mt-1 max-h-80 overflow-y-auto">
               <CardContent className="p-2">
                  {isLoading ? (
                     <div className="flex items-center justify-center py-4">
                        <LoaderCircleIcon
                           className="mr-2 animate-spin"
                           size={20}
                        />
                        <span className="text-muted-foreground text-sm">
                           Searching...
                        </span>
                     </div>
                  ) : searchResults.length > 0 ? (
                     <div className="space-y-1">
                        {searchResults.map((actor) => (
                           <div
                              key={actor.id}
                              className="hover:bg-accent flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors"
                              onClick={() => handleActorSelect(actor)}
                           >
                              <Avatar className="h-8 w-8">
                                 {actor.avatarUrl ? (
                                    <AvatarImage
                                       src={actor.avatarUrl}
                                       alt={actor.name}
                                    />
                                 ) : null}
                                 <AvatarFallback>
                                    <User size={16} />
                                 </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0 flex-1">
                                 <p className="truncate text-sm font-medium">
                                    {actor.name}
                                 </p>
                                 <p className="text-muted-foreground text-xs">
                                    ID: {actor.id}
                                 </p>
                              </div>
                           </div>
                        ))}
                     </div>
                  ) : inputValue.trim() ? (
                     <div className="flex items-center justify-center py-4">
                        <span className="text-muted-foreground text-sm">
                           No actors found
                        </span>
                     </div>
                  ) : null}
               </CardContent>
            </Card>
         )}

         {selectedActor && (
            <div className="border-border grid gap-2 border p-4 md:grid-cols-2">
               <div>
                  <Label htmlFor="actor-id" className="mb-1">
                     Actor ID (read-only)
                  </Label>
                  <Input
                     id="actor-id"
                     placeholder="Enter actor Id"
                     value={selectedActor.actorId}
                     onChange={(event) => {
                        setSelectedActor((prev) => ({
                           ...prev!,
                           actorId: Number(event.target.value),
                        }));
                     }}
                     disabled
                  />
               </div>

               <div>
                  <Label htmlFor="actor-name" className="mb-1">
                     Actor Name (read-only)
                  </Label>
                  <Input
                     id="actor-name"
                     placeholder="Enter actor name"
                     disabled
                     value={selectedActor.name}
                     onChange={(event) => {
                        setSelectedActor((prev) => ({
                           ...prev!,
                           name: event.target.value,
                        }));
                     }}
                  />
               </div>

               <div>
                  <Label htmlFor="actor-character" className="mb-1">
                     Character
                  </Label>
                  <Input
                     id="actor-character"
                     placeholder="Enter actor character"
                     value={selectedActor.character}
                     onChange={(event) => {
                        setSelectedActor((prev) => ({
                           ...prev!,
                           character: event.target.value,
                        }));
                     }}
                  />
               </div>

               <div>
                  <Label htmlFor="actor-role" className="mb-1">
                     Role
                  </Label>
                  <Input
                     id="actor-role"
                     placeholder="Enter actor role"
                     value={selectedActor.role}
                     onChange={(event) => {
                        setSelectedActor((prev) => ({
                           ...prev!,
                           role: event.target.value,
                        }));
                     }}
                  />
               </div>

               <div>
                  <Label htmlFor="actor-order" className="mb-1">
                     Order
                  </Label>
                  <Input
                     id="actor-order"
                     placeholder="Enter actor order"
                     value={selectedActor.order}
                     type="number"
                     onChange={(event) =>
                        setSelectedActor((prev) => ({
                           ...prev!,
                           order: Number(event.target.value),
                        }))
                     }
                  />
               </div>

               <div>
                  <Label htmlFor="actor-action" className="mb-1 text-right">
                     Action
                  </Label>
                  <div className="flex items-center justify-end space-x-2">
                     <button
                        onClick={() => setSelectedActor(null)}
                        className="border px-2 py-1 text-sm"
                        type="button"
                     >
                        Cancel
                     </button>
                     <button
                        onClick={handleAddActor}
                        className="border px-2 py-1 text-sm"
                        type="button"
                     >
                        Add
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
