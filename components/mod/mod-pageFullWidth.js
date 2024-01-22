import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";

const PageTwoColumns = ({ blok, colType }) => {
  console.log('blok', blok)
  return (
    <>
      {blok.content.map((nestedBlok) => (
        <StoryblokComponent 
        blok={nestedBlok} 
        key={nestedBlok._uid} 
        colType={colType}
        />
      ))}
    </>
  );

};

export default PageTwoColumns;