import React from 'react'


const ImageLinkForm = ({onInputChange, onButtonClick}) => {
  
  return (
    <div>
    <p className='text-lg text-center'>
        {'This magic Brain will detect faces in your pictures. Give it a try.'}
    </p>

    <div className='center'>
        <div className='form center p-4 m-2 rounded-[4px] shadow-lg '>
            <input type='text' 
            onChange={onInputChange}
            className='w-[70%] p-2 text-lg rounded-[5px]' />
            <button onClick={onButtonClick} type='submit'
             className='w-[30%] text-xl rounded-[5px] hover:scale-105  text-white bg-purple-500'>
             Detect
            </button>
        </div>
    </div>
    </div>
  )
}

export default ImageLinkForm