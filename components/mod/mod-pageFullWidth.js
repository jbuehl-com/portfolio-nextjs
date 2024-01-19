import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";

const PageTwoColumns = ({ blok }) => {
  return (
    <>
      {blok.content.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </>
  );

};

export default PageTwoColumns;