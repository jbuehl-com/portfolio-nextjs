import React from 'react'
import Image from "next/image";

const MediaElement = ({srcImage, srcVideo, alt}) => {

  // if srcImage is defined set the width and height via split
  let width = 10, 
   height = 10
  srcImage ? width = srcImage.split("/")[5].split("x")[0] : false;
  srcImage ? height = srcImage.split("/")[5].split("x")[1] : false;


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
      <>
      {/* // <picture>  */}
        {/* <source srcSet={srcImage} type="image/webp" /> */}
        {/* <img 
        src={srcImage} 
        alt={alt} 
        // style={{position: "absolute"}}
        style={{display: "none"}}
      /> */}

        <Image
        src={srcImage}
        alt={alt}
        width={width}
        height={height}
        // placeholder="blur"
        loading="eager"
        priority= "true"
        
        sizes="(max-width: 420px) 375px, (max-width: 640px) 100vw, 1200px, "
        // sizes="(max-width: 768px) 100px,
        // (max-width: 1200px) 50px,
        // 33px"
        
        />

      {/* // </picture> */}
      </>
    )
  }
};

export default MediaElement