import React from 'react'
import Lottie from 'lottie-react';
import tickAnimation from '../../../../../public/tick.json';

function CompleteCheck() {
  return (
    <div className='text-center flex items-center justify-center'>
    <p className='text-green-500'>File uploaded successfully!</p>
    <Lottie animationData={tickAnimation} loop={true} style={{ width: 100, height: 100 }} />
  </div>
  )
}

export default CompleteCheck