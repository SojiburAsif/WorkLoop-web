const CardLoader = () => {
  return (
    <div className="card w-96 shadow-sm border border-gray-800 rounded-lg animate-pulse flex flex-col" style={{ minHeight: '500px' }}>
      {/* Image placeholder */}
      <div className="h-56 bg-gray-300 dark:bg-gray-700 rounded-md overflow-hidden mb-4"></div>

      <div className="card-body flex flex-col flex-grow px-4">
        {/* Title placeholder */}
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>

        {/* Description placeholder */}
        <div className="space-y-2 flex-grow">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
        </div>

        {/* Posted by placeholder */}
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mt-4"></div>

        {/* Areas badges placeholder */}
        <div className="flex flex-wrap gap-2 mt-3">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
        </div>

        {/* Footer placeholder */}
        <div className="flex justify-between items-center mt-6 pt-2">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
          <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default CardLoader;
