import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '../../helpers/isomorphicEffect';

const LinkList = ({ blok }) => {

  useIsomorphicLayoutEffect(() => {

    gsap.fromTo('.c-item .i-image', {
      scale: 0,
      y: 20
    },
      {
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: .5,
        ease: 'Expo.easeOut',
      });
    gsap.fromTo('.c-item .i-value', {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.7,
      ease: 'Expo.easeOut'
    });
    
  }, []);


  return (
    <div className="mod-linklist" {...storyblokEditable(blok)} key={blok._uid}>
      <ul>
        {blok.elements.map((blok) => (
          <StoryblokComponent blok={blok} key={blok._uid} />
        ))}
      </ul>
    </div>
  );
};

export default LinkList;