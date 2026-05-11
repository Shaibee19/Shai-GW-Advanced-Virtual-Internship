export default function BookSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Title + Subtitle */}
      <div className="space-y-3">
        <div className="h-7 w-2/3 bg-gray-200 rounded-md" />
        <div className="h-5 w-1/2 bg-gray-200 rounded-md" />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left column */}
        <div className="space-y-4">
          <div className="h-48 bg-gray-200 rounded-md" />
          <div className="h-4 w-3/4 bg-gray-200 rounded-md" />
          <div className="h-4 w-2/3 bg-gray-200 rounded-md" />
          <div className="h-4 w-1/2 bg-gray-200 rounded-md" />
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-200 rounded-md" />
          <div className="h-4 w-5/6 bg-gray-200 rounded-md" />
          <div className="h-4 w-4/6 bg-gray-200 rounded-md" />
          <div className="h-4 w-3/6 bg-gray-200 rounded-md" />
        </div>
      </div>

      {/* Bottom section */}
      <div className="space-y-4">
        <div className="h-5 w-1/3 bg-gray-200 rounded-md" />
        <div className="h-4 w-full bg-gray-200 rounded-md" />
        <div className="h-4 w-11/12 bg-gray-200 rounded-md" />
        <div className="h-4 w-10/12 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
}
