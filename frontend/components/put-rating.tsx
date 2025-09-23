'use client';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { IconStarFilled } from '@tabler/icons-react';
import { StarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface PutRatingProps {
   movieId: number;
   userRating?: boolean;
}

export function PutRating({ movieId, userRating }: PutRatingProps) {
   const session = useAuth();
   const router = useRouter();
   const [rating, setRating] = useState({ rating: 0, review: '' });

   function handleSubmit() {
      if (session) {
         router.push('/signin');
      }
   }

   console.log(rating);

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button
               disabled={userRating}
               className={cn('group font-semibold text-white transition-all', {
                  'text-secondary': userRating,
               })}
               size="sm"
               variant="outline"
            >
               {userRating ? (
                  <IconStarFilled className="text-secondary mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
               ) : (
                  <StarIcon className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
               )}
               Rate
            </Button>
         </DialogTrigger>
         <DialogContent className="flex flex-col gap-0 p-0 [&>button:last-child]:top-3.5">
            <DialogHeader className="contents space-y-0 text-left">
               <DialogTitle className="border-b px-6 py-4 text-base">
                  Rate Movie
               </DialogTitle>
            </DialogHeader>
            <div className="px-6 py-4">
               <form className="space-y-5">
                  <div className="space-y-4">
                     <div>
                        <fieldset className="space-y-4">
                           <legend className="text-foreground text-lg leading-none font-semibold">
                              How would you rate this movie?
                           </legend>
                           <RadioGroup className="flex gap-0 -space-x-px rounded-md shadow-xs">
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                                 <label
                                    key={number}
                                    className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex size-9 flex-1 cursor-pointer flex-col items-center justify-center gap-3 border text-center text-sm transition-[color,box-shadow] outline-none first:rounded-s-md last:rounded-e-md has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 has-data-[state=checked]:z-10"
                                 >
                                    <RadioGroupItem
                                       id={`radio-17-r${number}`}
                                       value={number.toString()}
                                       className="sr-only after:absolute after:inset-0"
                                       onClick={() =>
                                          setRating((prev) => ({
                                             ...prev,
                                             rating: number,
                                          }))
                                       }
                                       checked={rating.rating === number}
                                    />
                                    {number}
                                 </label>
                              ))}
                           </RadioGroup>
                        </fieldset>
                        <div className="text-muted-foreground mt-2 flex justify-between text-xs">
                           <p>Very Bad</p>
                           <p>Excellent</p>
                        </div>
                     </div>

                     <div className="*:not-first:mt-2">
                        <Label>Why did you give this rating?</Label>
                        <Textarea
                           id="feedback"
                           placeholder="Your feedback"
                           aria-label="Send feedback"
                           onChange={(e) =>
                              setRating((prev) => ({
                                 ...prev,
                                 review: e.target.value,
                              }))
                           }
                           value={rating.review}
                        />
                     </div>
                  </div>
                  <Button
                     onClick={handleSubmit}
                     type="button"
                     className="w-full"
                  >
                     Send feedback
                  </Button>
               </form>
            </div>
         </DialogContent>
      </Dialog>
   );
}
