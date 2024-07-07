import React from 'react'
import imgUrl from '../assets/lion_image.jpg'
const LionImage = () => {
  return (
    <div className=''>
        <img 
            className='rounded-xl mt-1 '
            src={imgUrl}
            alt = "Login Page"
        />
    </div>
  )
}

export default LionImage