import React from 'react'
import Tilt from 'react-parallax-tilt'
import brain from './brain.png'

const Logo = () => {
  return (
    <div className='m-4 mt-0'>
      <Tilt className='border-1  shadow-xl w-[150px] rounded-[4px] h-[150px] bg-gradient-to-r from-[#ff5edf] to-[#04c8De]'>
        <img src={brain} alt="Logo" className='p-3' /> 
      </Tilt>
    </div>
  )
}

export default Logo