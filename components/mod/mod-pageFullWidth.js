import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import { Fragment } from 'react';

const PageTwoColumns = ({ blok, colType }) => {
  return (
    <Fragment key={blok._uid}>

      {blok.content.map((nestedBlok) => (
        <StoryblokComponent 
        blok={nestedBlok} 
        key={nestedBlok._uid} 
        colType={colType}
        />
      ))}
    </Fragment>
  );

};

export default PageTwoColumns;