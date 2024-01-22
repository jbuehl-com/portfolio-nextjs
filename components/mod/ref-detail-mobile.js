import React from "react";
import './ref-detail-mobile.scss'
import MediaElement from "./el-media";
import {
  storyblokEditable
} from "gatsby-source-storyblok";

const RefDetailMobile = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok)} key={blok._uid} className="visual portfolio">
      <figure>
        <MediaElement srcVideo={blok.video1.filename} srcImage={blok.image1.filename} alt={blok.alt1}/>
        <figcaption>
        {blok.figcaption1}
        </figcaption>
      </figure>
      <figure>
        <MediaElement srcVideo={blok.video2.filename} srcImage={blok.image2.filename} alt={blok.alt2}/>
        <figcaption>
        {blok.figcaption2}
        </figcaption>
      </figure>
      <figure>
        <MediaElement srcVideo={blok.video3.filename} srcImage={blok.image3.filename} alt={blok.alt3}/>
        <figcaption>
        {blok.figcaption3}
        </figcaption>
      </figure>
    </div>
  );
};

export default RefDetailMobile;