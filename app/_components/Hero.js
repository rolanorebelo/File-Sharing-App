import React from 'react'
import Constant from '../_utils/Constant'
function Hero() {
  return (
    <section className="bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1
            className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
          >
            <span className='text-gray-200'>Upload, Save </span>and easily  
            <span className='text-gray-500'> Share</span> your files all in one place.
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-yellow-200">
            {Constant.desc}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="/files"
            >
              Get Started
            </a>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero