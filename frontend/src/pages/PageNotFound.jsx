import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-xl font-semibold text-gray-700 mb-5">Oops! Page not found.</p>
      <p className="mb-8 text-gray-600">We can't find the page you're looking for. You might have the wrong address, or the page may have moved.</p>
      <Link to="/" className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out">
        Go Home
      </Link>
      <div className="mt-10">
        <img src="https://webhostingmedia.net/wp-content/uploads/2018/01/http-error-404-not-found.png" alt="Not Found" className="opacity-80" />
      </div>
    </div>
  )
}

export default PageNotFound;
