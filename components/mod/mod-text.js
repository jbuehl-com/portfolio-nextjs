import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import { renderRichText } from "@storyblok/react";
// import './mod-textblock.scss'

const Text = ({ blok, children, color }) => {
  const renderedRichText = renderRichText(blok.bodyText);
  const headline = (blok.headline) ? <div className='textblock-headline'><h1 style={{ color: color.type }}>{blok.headline}</h1></div> : "false"

  return (
    <div {...storyblokEditable(blok)} key={blok._uid} className="textblock">
      {headline}
      <div className='textblock-text' style={{ color: color.type }}>
        <div dangerouslySetInnerHTML={{ __html: renderedRichText }} />
        {blok.plainText}
        {children}
      </div>
    </div>
  );
};

export default Text;