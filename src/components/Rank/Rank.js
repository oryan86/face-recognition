import React from 'react'

const Ranks = ({name, entries}) => {
  return (
    <div className='text-center'>
      <div className='text-white text-base'>
        {`${name}, your current entries count is...`}
      </div>
      <div className='text-white text-lg'>
        {`${entries}`}
      </div>
    </div>
  )
}

export default Ranks