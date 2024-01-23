import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import MediaElement from "./el-media";


// import './content-visual-image.scss'

const ModAsset = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok)} key={blok._uid} className="visual image">
        <MediaElement srcImage={blok.asset.filename} />
        {JSON.stringify(blok.asset.filename)}
        !!!
    </div>
  );
};

export default ModAsset;