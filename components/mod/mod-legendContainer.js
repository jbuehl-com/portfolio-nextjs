import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";

// import './legend.sass'

const Legend = ({ blok }) => {
  return (
    <section className="mod-reflegend" {...storyblokEditable(blok)} key={blok._uid}>
      {blok.container.map((blok) => (
        <StoryblokComponent blok={blok} key={blok._uid} />
      ))}
    </section>
  );
};

export default Legend;