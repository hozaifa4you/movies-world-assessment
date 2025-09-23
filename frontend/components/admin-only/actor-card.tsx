import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Actor } from '@/types/actors';
import { MoreHorizontal, Calendar, Globe, Film } from 'lucide-react';

export function ActorCard({ actor }: { actor: Actor }) {
   const getAge = () => {
      if (!actor.birthDate) return null;
      const birth = new Date(actor.birthDate);
      const end = actor.deathDate ? new Date(actor.deathDate) : new Date();
      const age = end.getFullYear() - birth.getFullYear();
      return age;
   };

   const formatDate = (dateString: string | null) => {
      if (!dateString) return null;
      return new Date(dateString).getFullYear();
   };

   return (
      <Card className="group border-border bg-card max-w-xs overflow-hidden p-0 transition-all duration-300 hover:shadow-md">
         <CardContent className="p-0">
            {/* Actor Photo */}
            <div className="bg-muted relative aspect-[4/5] overflow-hidden">
               {actor.photoUrl ? (
                  <img
                     src={actor.photoUrl}
                     alt={actor.name}
                     className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
               ) : (
                  <div className="from-muted to-muted/50 flex h-full w-full items-center justify-center bg-gradient-to-br">
                     <div className="text-muted-foreground/40 text-4xl font-bold">
                        {actor.name.charAt(0).toUpperCase()}
                     </div>
                  </div>
               )}

               {/* Status Badge */}
               {actor.deathDate && (
                  <div className="absolute top-2 left-2">
                     <Badge
                        variant="destructive"
                        className="border-0 bg-red-500/90 px-2 py-0.5 text-xs text-white backdrop-blur-sm"
                     >
                        Deceased
                     </Badge>
                  </div>
               )}
            </div>

            {/* Actor Info */}
            <div className="space-y-2 p-3">
               {/* Name */}
               <div>
                  <h3 className="line-clamp-1 text-base leading-tight font-semibold">
                     {actor.name}
                  </h3>
                  {actor.called && actor.called.length > 0 && (
                     <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                        Also: {actor.called.join(', ')}
                     </p>
                  )}
               </div>

               {/* Details */}
               <div className="space-y-1 text-xs">
                  {/* Birth/Death and Age */}
                  {actor.birthDate && (
                     <div className="text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 flex-shrink-0" />
                        <span className="line-clamp-1">
                           {formatDate(actor.birthDate)}
                           {actor.deathDate &&
                              ` - ${formatDate(actor.deathDate)}`}
                           {getAge() && (
                              <span className="ml-1">
                                 ({getAge()}
                                 {actor.deathDate ? ' years old' : ' years'})
                              </span>
                           )}
                        </span>
                     </div>
                  )}

                  {/* Nationality */}
                  {actor.nationality && (
                     <div className="text-muted-foreground flex items-center gap-1.5">
                        <Globe className="h-3 w-3 flex-shrink-0" />
                        <span className="line-clamp-1">
                           {actor.nationality}
                        </span>
                     </div>
                  )}

                  {/* Movie Count */}
                  <div className="text-muted-foreground flex items-center gap-1.5">
                     <Film className="h-3 w-3 flex-shrink-0" />
                     <span className="line-clamp-1">
                        {actor.movieCount}{' '}
                        {actor.movieCount === 1 ? 'movie' : 'movies'}
                     </span>
                  </div>
               </div>

               {/* Bio */}
               {actor.bio && (
                  <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
                     {actor.bio}
                  </p>
               )}

               {/* Action Buttons */}
               <div className="flex gap-1.5 pt-1">
                  <Button
                     variant="outline"
                     size="sm"
                     className="h-7 flex-1 px-2 text-xs"
                  >
                     Edit
                  </Button>
                  <Button
                     variant="outline"
                     size="sm"
                     className="h-7 flex-1 px-2 text-xs"
                  >
                     Delete
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
