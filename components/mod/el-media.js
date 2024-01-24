import React from 'react'

const MediaElement = ({srcImage, srcVideo, alt}) => {

  if (srcVideo) {
    return (
      <video 
        playsInline={true} 
        muted={true} 
        autoPlay={true} 
        loop={true} 
        src={srcVideo}
        poster={srcImage}
        >
      </video>
    )
  } else {
    return (
      <picture> 
        <source srcSet={srcImage} type="image/webp" />
        <img src={srcImage} alt={alt} />
      </picture>
    )
  }
};

export default MediaElement