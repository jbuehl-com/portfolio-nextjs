import React from "react";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import MediaElement from "./el-media";
import Image from 'next/image'
import deviceLaptop from '../../assets/images/device-laptop.png'
import deviceMobile from '../../assets/images/dev-375x746.png'

const RefDesktopMobile = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok)} key={blok._uid} className="visual portfolio">
      <div className="dev-laptop">
        <div className="device">
          <Image src={deviceLaptop} alt="Device Laptop" />
          </div>
        <div className="screen">
          <MediaElement srcVideo={blok.desktopVideo.filename} srcImage={blok.desktopImage.filename} />
        </div>
      </div>
      <div className="dev-mobile">
        <div className="device">
          {/* ![Mobile](./../images/dev-375x746.png) */}
          <Image src={deviceMobile} alt="Device Mobile" />
        </div>
        <div className="screen">
          <MediaElement srcVideo={blok.mobileVideo.filename} srcImage={blok.mobileImage.filename} />
        </div>
      </div>
    </div>
  );
};

export default RefDesktopMobile;