import React from 'react'

const FaceRecognition = ({imageUrl, box}) => {
  return (
    <div className='center'>
      <div className=' absolute mt-1'>
        <img id='inputimage' className="w-[500px] h-auto " alt='' src={imageUrl}/>
      </div>
      <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
    </div>
  )
}

export default FaceRecognition