import { Card, CardContent } from "@/components/ui/card"

export default function PositionsLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Loading */}
      <section className="relative bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="h-12 w-96 mx-auto mb-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-2/3 mx-auto mb-8 bg-gray-200 rounded animate-pulse" />
            <div className="flex items-center justify-center space-x-4">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Loading */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="h-12 w-full mb-6 bg-gray-200 rounded animate-pulse" />
            <div className="flex flex-wrap gap-3">
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-18 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Grid Loading */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Results Info Loading */}
            <div className="flex items-center justify-between mb-8">
              <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Job Cards Loading */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-xl mb-4 bg-gray-200 animate-pulse" />
                    <div className="h-6 w-full mb-3 bg-gray-200 rounded animate-pulse" />
                    <div className="space-y-2 mb-4">
                      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="h-6 w-20 mb-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination Loading */}
            <div className="flex justify-center items-center space-x-2 mt-12">
              <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
