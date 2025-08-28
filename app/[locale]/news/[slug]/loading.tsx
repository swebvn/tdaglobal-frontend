export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-20 animate-in fade-in duration-300">
          <div className="text-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            </div>
            <p className="text-gray-600 font-medium">Đang tải bài viết...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
