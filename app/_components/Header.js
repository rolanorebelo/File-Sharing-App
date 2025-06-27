import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-950 via-blue-900 to-purple-900 shadow-lg border-b border-blue-900/40">
      <div className="mx-auto flex h-32 max-w-screen-xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <Image src='/logo.png' width={180} height={100} alt="Logo" className="rounded-xl shadow" />
      </div>
    </header>
  )
}

export default Header