import React from 'react'

function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* Manage Tracks Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Tracks</h2>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-gray-600 mb-4">Manage your uploaded tracks here.</p>
            <button className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600">
              Upload New Track
            </button>

            {/* Placeholder for uploaded tracks */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Track Title</h3>
                <p className="text-gray-500">Genre: Pop</p>
                <p className="text-gray-500">Rating: 4.5</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Track Title</h3>
                <p className="text-gray-500">Genre: Rock</p>
                <p className="text-gray-500">Rating: 4.0</p>
              </div>
              {/* Add more track placeholders as needed */}
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Feedback Received</h2>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-gray-600 mb-4">View the latest feedback on your tracks.</p>

            {/* Placeholder for feedback items */}
            <div className="divide-y divide-gray-200">
              <div className="py-2">
                <h4 className="text-lg font-semibold">Track Title</h4>
                <p className="text-gray-500">"Great track! Really enjoyed the vocals." - Listener123</p>
              </div>
              <div className="py-2">
                <h4 className="text-lg font-semibold">Track Title</h4>
                <p className="text-gray-500">"Love the beat and rhythm." - MusicLover45</p>
              </div>
              {/* Add more feedback items as needed */}
            </div>
          </div>
        </section>

        {/* Rating Summary Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Rating Summary</h2>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-gray-600 mb-4">Check the average rating of all your tracks.</p>

            {/* Placeholder for rating summary */}
            <div className="text-gray-800 text-lg font-semibold">
              Average Rating: 4.3
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
