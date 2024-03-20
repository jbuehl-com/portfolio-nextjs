import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";


const LegendElement = ({ blok }) => {
  return (
    <div className="item" {...storyblokEditable(blok)}>
      <div>{blok.legendName}</div>
      <div className="m-value">{blok.legendValue}</div>
    </div>
  );
};

export default LegendElement;