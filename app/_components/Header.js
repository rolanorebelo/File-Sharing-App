import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div>
        <header class="bg-gray-200">
  <div class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 border-b">
    <Image src='/logo.svg' width={150} height={100}/>
    <div class="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Global" class="hidden md:block">
        <ul class="flex items-center gap-6 text-sm">
          <li>
            <a class="text-gray-500 transition hover:text-gray-500/75" href="#"> Home </a>
          </li>

          <li>
            <a class="text-gray-500 transition hover:text-gray-500/75" href="/upload"> Upload </a>
          </li>

          <li>
            <a class="text-gray-500 transition hover:text-gray-500/75" href="#"> About Us </a>
          </li>

          <li>
            <a class="text-gray-500 transition hover:text-gray-500/75" href="#"> Contact Us</a>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-4">
        <div class="sm:flex sm:gap-4">
          <a
            class="block rounded-md 
            bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            href="/files"
          >
            Get Started
          </a>

        </div>

        <button
          class="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
        >
          <span class="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>

    </div>
  )
}

export default Header

