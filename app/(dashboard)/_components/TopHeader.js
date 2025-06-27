import { UserButton } from '@clerk/nextjs'
import { AlignJustify } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function TopHeader({ showSideNav }) {
  return (
    <div className="flex items-center justify-between md:justify-end px-6 py-4 bg-gradient-to-r from-blue-950 via-blue-900 to-purple-900 shadow-lg border-b border-blue-900/40">
      <div className="flex items-center gap-4">
        {!showSideNav && (
          <AlignJustify className="md:hidden text-blue-300 hover:text-blue-400 cursor-pointer transition" size={28} />
        )}
        <Image
          className="md:hidden"
          src="/logo.png"
          width={120}
          height={60}
          alt="Logo"
          priority
        />
      </div>
      <UserButton />
    </div>
  )
}

export default TopHeader