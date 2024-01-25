import React from 'react'
import Image from "next/image";

const MediaElement = ({srcImage, srcVideo, alt}) => {

  const width = +srcImage.split("/")[5].split("x")[0];
  const height = +srcImage.split("/")[5].split("x")[1];

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
        <img 
        src={srcImage} 
        alt={alt} 
        // style={{position: "absolute"}}
        style={{display: "none"}}
        />

        <Image
        src={srcImage}
        alt={alt}
        width={width}
        height={height}
        priority= "true"
        sizes="(max-width: 640px) 100vw, 1200px"
      />

      </picture>
    )
  }
};

export default MediaElement