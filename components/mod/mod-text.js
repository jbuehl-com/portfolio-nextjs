import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import { renderRichText } from "@storyblok/react";
// import './mod-textblock.scss'

const Text = ({ blok, children, color }) => {
  let colType = color ? color.type : '#000';
  const renderedRichText = renderRichText(blok.bodyText);
  const headline = (blok.headline) ? <div className='textblock-headline'><h1 style={{ color: colType }}>{blok.headline}</h1></div> : "false"
  return (
    <div {...storyblokEditable(blok)} key={blok._uid} className="textblock">
      {headline}
      <div className='textblock-text' style={{ color: colType }}>
        <div dangerouslySetInnerHTML={{ __html: renderedRichText }} />
        {blok.plainText}
        {children}
      </div>
    </div>
  );
};

export default Text;