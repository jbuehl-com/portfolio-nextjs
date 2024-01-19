import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";

const PageTwoColumns = ({ blok }) => {
  return (
    <>
      {blok.left.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
      {blok.right.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </>
  );

};

export default PageTwoColumns;