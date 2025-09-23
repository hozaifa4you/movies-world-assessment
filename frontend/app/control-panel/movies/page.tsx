import { MovieCard, MovieCardProps } from '@/components/admin-only/move-card';
import { MoveHeader } from '@/components/admin-only/movie-header';
import { fetchWithoutAuth } from '@/lib/authFetch';
import { PaginationInfo } from '@/types/common';

const MoviesPage = async ({
   searchParams,
}: {
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
   const params = await searchParams;

   const page = params.page ? parseInt(params.page as string, 10) : 1;
   const pageSize = params.pageSize
      ? parseInt(params.pageSize as string, 10)
      : 9;

   const response = await fetchWithoutAuth(
      `/movies?page=${page}&pageSize=${pageSize}`,
   );
   if (!response.ok) {
      throw new Error('Failed to fetch movies');
   }

   const data = await response.json();
   const movies = data.data;
   const paginationInfo: PaginationInfo = data.pagination;

   return (
      <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
         <MoveHeader />

         <div className="mt-4 grid grid-cols-3 gap-3">
            {movies.map((move: MovieCardProps) => (
               <MovieCard key={move.id} {...move} />
            ))}
         </div>
      </div>
   );
};

export default MoviesPage;
