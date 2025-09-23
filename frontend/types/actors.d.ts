export interface Actor {
   id: number;
   name: string;
   bio: string | null;
   birthDate: string | null;
   deathDate: string | null;
   nationality: string | null;
   photoUrl: string | null;
   called: string[];
   movieCount: number;
}
