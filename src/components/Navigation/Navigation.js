import React from 'react'

const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn) {
      return (
     <nav className='flex justify-end p-5 '>
        <p onClick={() => onRouteChange('signout')} className=' font-bold cursor-pointer text-2xl underline text-black hover:text-gray-500 '>Sign out</p>
      </nav> 
      )
    } 
    else {
      return (
        <nav className='flex justify-end p-5 '>
          <p onClick={() => onRouteChange('signin')} className=' font-bold cursor-pointer text-2xl underline text-black hover:text-gray-500 '>Sign In/ </p>
          
          <p onClick={() => onRouteChange('register')} className=' font-bold cursor-pointer text-2xl underline text-black hover:text-gray-500 '> Register</p>
        </nav>
      )
    }
}

export default Navigation