"use client"

import React from 'react'

function ProgressBar({progress}) {
  return (
        <div className=' bg-gray-400 w-full h-4 mt-3 rounded-full'>
            <div className=' bg-primary h-4 p-0.5 rounded-full text-[10px]' style={{width:`${progress}%`}}>{`${Number(progress).toFixed(0)}%`}</div>
        </div>
  )
}

export default ProgressBar