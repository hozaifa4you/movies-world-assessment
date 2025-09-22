import { MovieCard } from '@/components/admin-only/move-card';
import { MoveHeader } from '@/components/admin-only/movie-header';

const movies = [
   {
      id: 1,
      title: 'The X Man',
      year: '2023',
      genre: 'Action',
      shortDescription: 'A thrilling action movie.',
      rating: 8.5,
      poster: '/horror-comedy-movie-poster-with-zombie-theme.jpg',
   },
   {
      id: 2,
      title: 'Midnight Runner',
      year: '2022',
      genre: 'Thriller',
      shortDescription: 'A suspenseful chase through the city.',
      rating: 7.8,
      poster: '/thriller-movie-poster.jpg',
   },
   {
      id: 3,
      title: 'Space Odyssey',
      year: '2024',
      genre: 'Sci-Fi',
      shortDescription: 'An epic journey through the cosmos.',
      rating: 9.1,
      poster: '/sci-fi-space-poster.jpg',
   },
   {
      id: 4,
      title: 'Love in Paris',
      year: '2021',
      genre: 'Romance',
      shortDescription: 'A heartwarming love story in the city of lights.',
      rating: 6.9,
      poster: '/romance-paris-poster.jpg',
   },
   {
      id: 5,
      title: 'The Last Kingdom',
      year: '2023',
      genre: 'Fantasy',
      shortDescription: 'A medieval fantasy adventure.',
      rating: 8.3,
      poster: '/fantasy-kingdom-poster.jpg',
   },
   {
      id: 6,
      title: 'Laugh Out Loud',
      year: '2022',
      genre: 'Comedy',
      shortDescription: 'A hilarious comedy that will keep you laughing.',
      rating: 7.2,
      poster: '/comedy-poster.jpg',
   },
   {
      id: 7,
      title: 'Ghost Town',
      year: '2024',
      genre: 'Horror',
      shortDescription: 'A spine-chilling horror experience.',
      rating: 8.0,
      poster: '/horror-ghost-town-poster.jpg',
   },
   {
      id: 8,
      title: 'Ocean Deep',
      year: '2023',
      genre: 'Adventure',
      shortDescription: 'An underwater adventure like no other.',
      rating: 7.6,
      poster: '/adventure-ocean-poster.jpg',
   },
   {
      id: 9,
      title: 'The Detective',
      year: '2021',
      genre: 'Mystery',
      shortDescription: 'A gripping mystery that keeps you guessing.',
      rating: 8.7,
      poster: '/mystery-detective-poster.jpg',
   },
   {
      id: 10,
      title: 'Racing Hearts',
      year: '2024',
      genre: 'Sports',
      shortDescription: 'A high-speed racing drama.',
      rating: 7.4,
      poster: '/sports-racing-poster.jpg',
   },
];

const MoviesPage = () => {
   return (
      <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
         <MoveHeader />

         <div className="mt-4 grid grid-cols-3 gap-3">
            {movies.map((move) => (
               <MovieCard key={move.id} {...move} />
            ))}
         </div>
      </div>
   );
};

export default MoviesPage;
