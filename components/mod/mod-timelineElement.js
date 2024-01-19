import React from "react";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const TimelineElement = ({ blok }) => {
    function ContentValue({ value }) {
      if (value) {
        return <p className='m-value'>{value}</p>
      }
    }
    let classNameVita = "el-vita";
    if (!blok.description) {
      classNameVita = "el-vita is-small"
    }
    return (
      <div className={classNameVita} {...storyblokEditable(blok)} key={blok._uid}>
        <div className="m-year">
          <time>
            {blok.time.split(" ").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </time>
        </div>
        <div className="m-content">
          <h2 className="m-headline">{blok.headline}</h2>
          <ContentValue value={blok.description} />
        </div>
      </div>
    );
 
};

export default TimelineElement;