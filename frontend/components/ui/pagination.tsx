'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
   currentPage: number;
   totalPages: number;
   hasNext: boolean;
   hasPrev: boolean;
   total: number;
   pageSize: number;
}

export function Pagination({
   currentPage,
   totalPages,
   hasNext,
   hasPrev,
   total,
   pageSize,
}: PaginationProps) {
   const router = useRouter();
   const searchParams = useSearchParams();

   const createPageUrl = (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', page.toString());
      return `?${params.toString()}`;
   };

   const goToPage = (page: number) => {
      router.push(createPageUrl(page));
   };

   // Calculate the range of items being shown
   const startItem = (currentPage - 1) * pageSize + 1;
   const endItem = Math.min(currentPage * pageSize, total);

   // Generate page numbers to show
   const getVisiblePages = () => {
      const pages = [];
      const maxVisible = 5;

      if (totalPages <= maxVisible) {
         for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
         }
      } else {
         let start = Math.max(1, currentPage - 2);
         let end = Math.min(totalPages, start + maxVisible - 1);

         if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
         }

         for (let i = start; i <= end; i++) {
            pages.push(i);
         }
      }

      return pages;
   };

   const visiblePages = getVisiblePages();

   return (
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
         {/* Results info */}
         <div className="text-muted-foreground text-sm">
            Showing {startItem} to {endItem} of {total} results
         </div>

         {/* Pagination controls */}
         <div className="flex items-center gap-1">
            {/* Previous button */}
            <Button
               variant="outline"
               size="sm"
               onClick={() => goToPage(currentPage - 1)}
               disabled={!hasPrev}
               className="flex items-center gap-1"
            >
               <ChevronLeft className="h-4 w-4" />
               Previous
            </Button>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
               {/* First page if not visible */}
               {visiblePages[0] > 1 && (
                  <>
                     <Button
                        variant={1 === currentPage ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => goToPage(1)}
                        className="w-10"
                     >
                        1
                     </Button>
                     {visiblePages[0] > 2 && (
                        <span className="text-muted-foreground px-2">...</span>
                     )}
                  </>
               )}

               {/* Visible page numbers */}
               {visiblePages.map((page) => (
                  <Button
                     key={page}
                     variant={page === currentPage ? 'default' : 'outline'}
                     size="sm"
                     onClick={() => goToPage(page)}
                     className="w-10"
                  >
                     {page}
                  </Button>
               ))}

               {/* Last page if not visible */}
               {visiblePages[visiblePages.length - 1] < totalPages && (
                  <>
                     {visiblePages[visiblePages.length - 1] <
                        totalPages - 1 && (
                        <span className="text-muted-foreground px-2">...</span>
                     )}
                     <Button
                        variant={
                           totalPages === currentPage ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => goToPage(totalPages)}
                        className="w-10"
                     >
                        {totalPages}
                     </Button>
                  </>
               )}
            </div>

            {/* Next button */}
            <Button
               variant="outline"
               size="sm"
               onClick={() => goToPage(currentPage + 1)}
               disabled={!hasNext}
               className="flex items-center gap-1"
            >
               Next
               <ChevronRight className="h-4 w-4" />
            </Button>
         </div>
      </div>
   );
}
