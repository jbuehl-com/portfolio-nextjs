import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";

const PageTwoColumns = ({ blok, color }) => {
  return (
    <>
      {blok.left.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
      {blok.right.map((nestedBlok) => (
        <StoryblokComponent
          blok={nestedBlok}
          key={nestedBlok._uid}
          color={color}
        />
      ))}
    </>
  );

};

export default PageTwoColumns;