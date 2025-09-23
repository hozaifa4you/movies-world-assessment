'use client';
import { useActionState, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
   Upload,
   X,
   Plus,
   ArrowLeft,
   Save,
   User,
   Calendar,
   Globe,
   FileText,
   Camera,
} from 'lucide-react';
import Link from 'next/link';
import Form from 'next/form';
import { actorActions } from '@/actions/actor.action';
import { toast } from 'sonner';

const NewActorPage = () => {
   const [newAlias, setNewAlias] = useState('');
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
   const [aliasList, setAliasList] = useState<string[]>([]);
   const [state, action, pending] = useActionState(actorActions, null);
   const calledRef = useRef<HTMLInputElement | null>(null);

   const addAlias = () => {
      if (newAlias.trim() && !aliasList.includes(newAlias.trim())) {
         setAliasList([...aliasList, newAlias.trim()]);
         if (calledRef.current) {
            calledRef.current.value = [...aliasList, newAlias.trim()].join(',');
         }
         setNewAlias('');
      }
   };

   const removeAlias = (alias: string) => {
      setAliasList(aliasList.filter((a) => a !== alias));
      if (calledRef.current) {
         calledRef.current.value = aliasList
            .filter((a) => a !== alias)
            .join(',');
      }
   };

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
         setSelectedFile(file);
         const url = URL.createObjectURL(file);
         setPreviewUrl(url);
      }
   };

   const removePhoto = () => {
      setSelectedFile(null);
      setPreviewUrl(null);
   };

   useEffect(() => {
      if (!state?.success && state?.error) {
         toast.error('New Actor', {
            description: state.error,
         });
      }
   }, [state?.error, state?.success]);

   return (
      <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-6">
         {/* Header */}
         <div className="flex items-center justify-between">
            <div className="space-y-1">
               <div className="flex items-center gap-3">
                  <Link href="/control-panel/actors">
                     <Button variant="ghost" size="sm" className="p-2">
                        <ArrowLeft className="h-4 w-4" />
                     </Button>
                  </Link>
                  <h1 className="text-3xl font-bold tracking-tight">
                     Add New Actor
                  </h1>
               </div>
               <p className="text-muted-foreground">
                  Create a new actor profile for your movie database
               </p>
            </div>
         </div>

         <Form action={action} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
               {/* Photo Upload Section */}
               <div className="lg:col-span-1">
                  <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                           <Camera className="h-5 w-5" />
                           Actor Photo
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        {/* Photo Preview */}
                        <div className="flex justify-center">
                           <div className="relative">
                              {previewUrl ? (
                                 <div className="relative">
                                    <img
                                       src={previewUrl}
                                       alt="Actor preview"
                                       className="border-border h-48 w-36 rounded-lg border-2 object-cover"
                                    />
                                    <Button
                                       type="button"
                                       variant="destructive"
                                       size="sm"
                                       className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                       onClick={removePhoto}
                                    >
                                       <X className="h-3 w-3" />
                                    </Button>
                                 </div>
                              ) : (
                                 <div className="border-border bg-muted text-muted-foreground flex h-48 w-36 flex-col items-center justify-center rounded-lg border-2 border-dashed">
                                    <Camera className="mb-2 h-8 w-8" />
                                    <span className="text-center text-sm">
                                       No photo selected
                                    </span>
                                 </div>
                              )}
                           </div>
                        </div>

                        {/* Upload Button */}
                        <div className="space-y-2">
                           <Label
                              htmlFor="photo-upload"
                              className="cursor-pointer"
                           >
                              <div className="border-border bg-background hover:bg-muted/50 flex w-full items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors">
                                 <div className="text-center">
                                    <Upload className="text-muted-foreground mx-auto mb-2 h-6 w-6" />
                                    <span className="text-sm font-medium">
                                       Upload Photo
                                    </span>
                                    <p className="text-muted-foreground mt-1 text-xs">
                                       PNG, JPG up to 5MB
                                    </p>
                                 </div>
                              </div>
                           </Label>
                           <input
                              id="photo-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                           />
                        </div>
                     </CardContent>
                  </Card>
               </div>

               {/* Main Form */}
               <div className="space-y-6 lg:col-span-2">
                  {/* Basic Information */}
                  <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                           <User className="h-5 w-5" />
                           Basic Information
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        {/* Actor Name */}
                        <div className="space-y-2">
                           <Label htmlFor="name">Full Name *</Label>
                           <Input
                              id="name"
                              placeholder="Enter actor's full name"
                              name="name"
                           />

                           {state?.errors?.name && (
                              <p className="text-secondary text-sm">
                                 {state.errors.name}
                              </p>
                           )}
                        </div>

                        {/* Nationality */}
                        <div className="space-y-2">
                           <Label htmlFor="nationality">Nationality</Label>
                           <Input
                              id="nationality"
                              placeholder="e.g., American, British, Australian"
                              name="nationality"
                           />
                           {state?.errors?.nationality && (
                              <p className="text-secondary text-sm">
                                 {state.errors.nationality}
                              </p>
                           )}
                        </div>

                        {/* Bio */}
                        <div className="space-y-2">
                           <Label htmlFor="bio">Biography</Label>
                           <Textarea
                              id="bio"
                              placeholder="Brief description of the actor's career and achievements"
                              rows={4}
                              name="bio"
                           />
                           {state?.errors?.bio && (
                              <p className="text-secondary text-sm">
                                 {state.errors.bio}
                              </p>
                           )}
                        </div>
                     </CardContent>
                  </Card>

                  {/* Dates */}
                  <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                           <Calendar className="h-5 w-5" />
                           Important Dates
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                           {/* Birth Date */}
                           <div className="space-y-2">
                              <Label htmlFor="birthDate">Birth Date</Label>
                              <Input
                                 id="birthDate"
                                 type="date"
                                 name="birthDate"
                              />
                              {state?.errors?.birthDate && (
                                 <p className="text-secondary text-sm">
                                    {state.errors.birthDate}
                                 </p>
                              )}
                           </div>

                           {/* Death Date */}
                           <div className="space-y-2">
                              <Label htmlFor="deathDate">
                                 Death Date (if applicable)
                              </Label>
                              <Input
                                 id="deathDate"
                                 type="date"
                                 name="deathDate"
                              />

                              {state?.errors?.deathDate && (
                                 <p className="text-secondary text-sm">
                                    {state.errors.deathDate}
                                 </p>
                              )}
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Aliases */}
                  <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                           <FileText className="h-5 w-5" />
                           Also Known As
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        {/* Add Alias */}
                        <div className="flex gap-2">
                           <Input
                              placeholder="e.g. Actor, Director, Singer"
                              value={newAlias}
                              onChange={(e) => setNewAlias(e.target.value)}
                              onKeyPress={(e) =>
                                 e.key === 'Enter' &&
                                 (e.preventDefault(), addAlias())
                              }
                           />
                           <Button
                              type="button"
                              variant="outline"
                              onClick={addAlias}
                           >
                              <Plus className="h-4 w-4" />
                           </Button>

                           <input
                              type="text"
                              name="called"
                              className="sr-only"
                              ref={calledRef}
                           />
                        </div>

                        {state?.errors?.called && (
                           <p className="text-secondary text-sm">
                              {state.errors.called}
                           </p>
                        )}

                        {/* Display Aliases */}
                        {aliasList.length > 0 && (
                           <div className="flex flex-wrap gap-2">
                              {aliasList.map((alias, index) => (
                                 <Badge
                                    key={index}
                                    variant="secondary"
                                    className="gap-1"
                                 >
                                    {alias}
                                    <button
                                       type="button"
                                       onClick={() => removeAlias(alias)}
                                       className="hover:bg-muted-foreground/20 ml-1 rounded-full p-0.5"
                                    >
                                       <X className="h-3 w-3" />
                                    </button>
                                 </Badge>
                              ))}
                           </div>
                        )}
                     </CardContent>
                  </Card>
               </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4 border-t pt-6">
               <Link href="/control-panel/actors">
                  <Button type="button" variant="outline" size="lg">
                     Cancel
                  </Button>
               </Link>
               <Button type="submit" isLoading={pending} size="lg">
                  <Save className="mr-2 h-4 w-4" />
                  Create Actor
               </Button>
            </div>
         </Form>
      </div>
   );
};

export default NewActorPage;
