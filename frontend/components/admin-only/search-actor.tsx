'use client';
import { useEffect, useId, useState } from 'react';
import {
   ArrowRightIcon,
   LoaderCircleIcon,
   SearchIcon,
   User,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

interface SearchResult {
   id: number;
   name: string;
   avatarUrl: string | null;
}

export function SearchActor() {
   const id = useId();
   const [inputValue, setInputValue] = useState('');
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
   const [showResults, setShowResults] = useState<boolean>(false);

   // Demo data for search results
   const demoActors: SearchResult[] = [
      {
         id: 1,
         name: 'Leonardo DiCaprio',
         avatarUrl:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      },
      {
         id: 2,
         name: 'Margot Robbie',
         avatarUrl:
            'https://images.unsplash.com/photo-1494790108755-2616b612b1c5?w=150&h=150&fit=crop&crop=face',
      },
      {
         id: 3,
         name: 'Robert Downey Jr.',
         avatarUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      },
      {
         id: 4,
         name: 'Emma Stone',
         avatarUrl: null,
      },
      {
         id: 5,
         name: 'Ryan Gosling',
         avatarUrl:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      },
      {
         id: 6,
         name: 'Scarlett Johansson',
         avatarUrl:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      },
   ];

   useEffect(() => {
      if (inputValue.trim()) {
         setIsLoading(true);
         setShowResults(true);

         const timer = setTimeout(() => {
            const filtered = demoActors.filter((actor) =>
               actor.name.toLowerCase().includes(inputValue.toLowerCase()),
            );
            setSearchResults(filtered);
            setIsLoading(false);
         }, 500);

         return () => clearTimeout(timer);
      } else {
         setIsLoading(false);
         setShowResults(false);
         setSearchResults([]);
      }
   }, [inputValue]);

   const handleActorSelect = (actor: SearchResult) => {
      console.log('Selected actor:', actor);
      setInputValue(actor.name);
      setShowResults(false);
   };

   const handleInputFocus = () => {
      if (inputValue.trim() && searchResults.length > 0) {
         setShowResults(true);
      }
   };

   const handleInputBlur = () => {
      setTimeout(() => setShowResults(false), 200);
   };

   return (
      <div className="relative w-full *:not-first:mt-2">
         <div className="relative">
            <Input
               id={id}
               className="peer ps-9 pe-9"
               placeholder="Search actors..."
               type="search"
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
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

         {/* Search Results Dropdown */}
         {showResults && (
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
      </div>
   );
}
