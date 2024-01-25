import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import Image from "next/image";


const LinkListElement = ({ blok }) => {
  // if blok.linkIcon.filename is defined set the width and height via split
  let width = 10, 
   height = 10
  blok.linkIcon.filename ? width = blok.linkIcon.filename.split("/")[5].split("x")[0] : false;
  blok.linkIcon.filename ? height = blok.linkIcon.filename.split("/")[5].split("x")[1] : false;

  return (
    <li className="c-item" {...storyblokEditable(blok)} key={blok._uid}>
      <a href={blok.link.cached_url} target="_blank" rel="noopener noreferrer">
        <div className="i-image">
          
        <Image
        src={blok.linkIcon.filename}
        alt={blok.linkIcon.alt}
        width={width}
        height={height}
        // placeholder="blur"
        loading="eager"
        priority= "true"
        
        sizes="(max-width: 420px) 375px, (max-width: 640px) 100vw, 1200px, "
       
        />
        
          
          </div>


        
        <div className="i-value">{blok.linkText}</div>
      </a>
    </li>
  );
};

export default LinkListElement;