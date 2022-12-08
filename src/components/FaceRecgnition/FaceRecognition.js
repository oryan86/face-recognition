import React from 'react'

const FaceRecognition = ({imageUrl, box}) => {
  return (
    <div className='relative ml-auto mr-auto w-[500px]'>
      <div className=''>
        <img id='inputimage' className=" w-[500px] h-auto p-1" alt='' src={imageUrl}/>
      </div>
      <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
    </div>
  )
}

export default FaceRecognition