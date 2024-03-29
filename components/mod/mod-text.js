import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import { renderRichText } from "@storyblok/react";

const Text = ({ blok, children, color }) => {
  let colType = color ? color.type : '#000';
  const renderedRichText = renderRichText(blok.bodyText);
  const headline = (blok.headline) ? <div className='textblock-headline'><h1 style={{ color: colType }}>{blok.headline}</h1></div> : "false"
  return (
    <div {...storyblokEditable(blok)} className="textblock">
      {headline}
      <div className='textblock-text' key={blok._uid} style={{ color: colType }}>
        <div dangerouslySetInnerHTML={{ __html: renderedRichText }} />
        {blok.plainText}
        {children}
      </div>
    </div>
  );
};

export default Text;