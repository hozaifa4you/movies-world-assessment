interface SectionHeaderProps {
   titlePrimary: string;
   titleSecondary: string;
   description?: string;
}

const SectionHeader = ({
   titlePrimary,
   titleSecondary,
   description,
}: SectionHeaderProps) => {
   return (
      <div className="mb-12 text-center md:mb-16">
         <h2 className="mb-4 text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent uppercase">
               {titlePrimary}
            </span>{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent uppercase">
               {titleSecondary}
            </span>
         </h2>
         {description && (
            <p className="mx-auto max-w-2xl text-balance text-gray-400">
               {description}
            </p>
         )}
      </div>
   );
};

export { SectionHeader };
