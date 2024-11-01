import React from 'react'

function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Tune Up</h1>
          <p className="text-lg mb-6">Discover fresh, new music and provide feedback to upcoming artists.</p>
          <a href="/signup" className="px-6 py-3 bg-white text-blue-500 font-bold rounded-full hover:bg-gray-200">
            Get Started
          </a>
        </div>
      </section>


      {/* Featured Tracks Section */}
      <section className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Tracks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Placeholder track cards */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Track Title</h3>
            <p className="text-gray-600 mb-2">Genre: Pop</p>
            <p className="text-gray-600">Artist: Sample Artist</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Track Title</h3>
            <p className="text-gray-600 mb-2">Genre: Rock</p>
            <p className="text-gray-600">Artist: Sample Artist</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Track Title</h3>
            <p className="text-gray-600 mb-2">Genre: Hip-Hop</p>
            <p className="text-gray-600">Artist: Sample Artist</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Track Title</h3>
            <p className="text-gray-600 mb-2">Genre: EDM</p>
            <p className="text-gray-600">Artist: Sample Artist</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-200 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to share your music?</h2>
          <p className="text-gray-700 mb-6">Join our community of creators and listeners today.</p>
          <a href="/signup" className="px-6 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600">
            Sign Up
          </a>
        </div>
      </section>
    </div>
  )
}

export default Home
