import { MovieCard, MovieCardProps } from '@/components/admin-only/move-card';
import { MoveHeader } from '@/components/admin-only/movie-header';
import { fetchWithoutAuth } from '@/lib/authFetch';
import { PaginationInfo } from '@/types/common';
import { Pagination } from '@/components/ui/pagination';

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
   const year = params.year;
   const rating = params.rating;
   const genre = params.genre;
   const search = params.search;

   let url = `/movies?page=${page}&pageSize=${pageSize}`;

   if (search) {
      url += `&search=${encodeURIComponent(search as string)}`;
   }
   if (year) {
      url += `&year=${encodeURIComponent(year as string)}`;
   }
   if (rating) {
      url += `&rating=${encodeURIComponent(rating as string)}`;
   }
   if (genre) {
      url += `&genre=${encodeURIComponent(genre as string)}`;
   }

   const response = await fetchWithoutAuth(url);
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

         {/* Pagination */}
         {paginationInfo.totalPages > 1 && (
            <div className="mt-6">
               <Pagination
                  currentPage={paginationInfo.page}
                  totalPages={paginationInfo.totalPages}
                  hasNext={paginationInfo.hasNext}
                  hasPrev={paginationInfo.hasPrev}
                  total={paginationInfo.total}
                  pageSize={paginationInfo.limit}
               />
            </div>
         )}
      </div>
   );
};

export default MoviesPage;
