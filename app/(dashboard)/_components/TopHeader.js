import { UserButton } from '@clerk/nextjs'
import { AlignJustify } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function TopHeader({showSideNav}) {
  console.log('showSideNav', showSideNav)
  
console.log('API=========',process.env.RESEND_API_KEY);
  return (
    <div className='flex p-5 border-b items-center justify-between md:justify-end'>
       { !showSideNav ?
        <AlignJustify className='md:hidden'/>
        : null }
        <Image className="md:hidden" src='/logo.png' width={150} height={100}/> 
        <UserButton/>
    </div>
  )
}

export default TopHeader