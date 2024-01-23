import React from "react";
import { useLayoutEffect, useRef } from 'react';
import {
  animateSetAttr,
  animateStaggerEntry,
  animateFromToAttr
} from './../animations';
import debounce from 'lodash.debounce';
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { useIsomorphicLayoutEffect } from '../../helpers/isomorphicEffect';

const TimelineContainer = ({ blok }) => {
  let vita = useRef(null),
    vitaHeight = useRef(null),
    vitaRightColumn = useRef(null);

    useIsomorphicLayoutEffect(() => {
      // height is wrong, because of the delay of the animation
    vitaHeight.current = vita.current.offsetHeight + 50;
    let vitaElements = vita.current.querySelectorAll('.el-vita');
    vitaRightColumn.current = vitaElements[vitaElements.length - 1].getBoundingClientRect().left - vita.current.getBoundingClientRect().left;

    // console.log('vita height current : ' + vitaHeight.current);

    animateStaggerEntry('.el-vita', 100)

    // org value M1 757V0
    animateSetAttr('svg .left-vert', { d: "M1 " + vitaHeight.current + "V-300" })

    // org value M1 757c0 27.614 22.386 50 50 50
    animateSetAttr('svg .left-corner', { d: "M1 " + vitaHeight.current + "c0 27.614 22.386 50 50 50" })

    // org value M51 807h473
    animateSetAttr('svg .left-hor', { d: "M51 " + (vitaHeight.current + 50) + "h" + (vitaRightColumn.current - 161) })

    // org value M574 757c0 27.614-22.386 50-50 50
    animateSetAttr('svg .right-left-bottom-corner', { d: "M" + (vitaRightColumn.current - 60) + " " + vitaHeight.current + "c0 27.614-22.386 50-50 50" })

    // org value M574 757V53
    animateSetAttr('svg .right-left-vert', { d: "M" + (vitaRightColumn.current - 60) + " " + vitaHeight.current + "V53" })

    // org value M633 53V33c0-16.569-13.431-30-30-30
    animateSetAttr('svg .right-right-top-corner', { d: "M" + (vitaRightColumn.current) + " 53V33c0-16.569-13.431-30-30-30" })

    // org value M574 53V33c0-16.569 13.431-30 30-30
    animateSetAttr('svg .right-left-corner', { d: "M" + (vitaRightColumn.current - 60) + " 53V33c0-16.569 13.431-30 30-30" })

    // org value M633 859V53
    animateFromToAttr('svg .right-right-vert', { d: "M" + (vitaRightColumn.current) + " 100V53" }, { d: "M" + (vitaRightColumn.current) + " " + (vitaHeight.current + 500) + "V53" })


    // START: Resize-Animations
    const debouncedHandleResize = debounce(function handleResize() {
      vitaHeight.current = vita.current.offsetHeight + 50;
      vitaRightColumn.current = vitaElements[vitaElements.length - 1].getBoundingClientRect().left - vita.current.getBoundingClientRect().left;

      animateSetAttr('svg .left-vert', { d: "M1 " + vitaHeight.current + "V-200" })
      animateSetAttr('svg .left-corner', { d: "M1 " + vitaHeight.current + "c0 27.614 22.386 50 50 50" })
      animateSetAttr('svg .left-hor', { d: "M51 " + (vitaHeight.current + 50) + "h" + (vitaRightColumn.current - 161) })
      animateSetAttr('svg .right-left-bottom-corner', { d: "M" + (vitaRightColumn.current - 60) + " " + vitaHeight.current + "c0 27.614-22.386 50-50 50" })
      animateSetAttr('svg .right-left-vert', { d: "M" + (vitaRightColumn.current - 60) + " " + vitaHeight.current + "V53" })
      animateSetAttr('svg .right-right-top-corner', { d: "M" + (vitaRightColumn.current) + " 53V33c0-16.569-13.431-30-30-30" })
      animateSetAttr('svg .right-left-corner', { d: "M" + (vitaRightColumn.current - 60) + " 53V33c0-16.569 13.431-30 30-30" })
      animateFromToAttr('svg .right-right-vert', { d: "M" + (vitaRightColumn.current) + " 100V53" }, { d: "M" + (vitaRightColumn.current) + " " + (vitaHeight.current + 500) + "V53" })
    }, 200)

    window.addEventListener('resize', debouncedHandleResize)
    return _ => {
      // resize-docu + clear from: https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
      window.removeEventListener('resize', debouncedHandleResize)
    }
    // END: Resize-Animations

  }, []); // <- empty dependency Array so it doesn't re-run on every render

  return (
    <section className="mod-timeline visual" {...storyblokEditable(blok)} key={blok._uid}>
      <div className="m-vitawraper" ref={vita}>
      <div className="m-elements">
        {blok.timeline.map((blok) => (
          <StoryblokComponent blok={blok} key={blok._uid} />
        ))}
      </div>
      <div>
        <svg fill="none">
          <path stroke="#FFCFF8" strokeWidth="2" d="M1 757c0 27.614 22.386 50 50 50" className="left-corner" />
          <path stroke="#FFCFF8" strokeWidth="2" d="M1 757V0" className="left-vert" />
          <path stroke="#FFCFF8" strokeWidth="2" d="M51 807h473" className="left-hor" />
          <path stroke="#FFCFF8" strokeWidth="2" d="M574 757V53" className="right-left-vert" />
          <path stroke="#FFCFF8" strokeWidth="2" d="M633 859V53" className="right-right-vert" />
          <path stroke="#FFCFF8" strokeWidth="2" d="M633 53V33c0-16.569-13.431-30-30-30" className="right-right-top-corner" />
          <path stroke="#FFCFF8" strokeWidth="2" d="M574 53V33c0-16.569 13.431-30 30-30" className="right-left-corner" />
          <path stroke="#FFCFF8" strokeWidth="2" d="M574 757c0 27.614-22.386 50-50 50" className="right-left-bottom-corner" />
        </svg>
      </div>
      </div>
    </section>
  );
};

export default TimelineContainer;