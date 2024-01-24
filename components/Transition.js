import { useContext } from 'react';
import { SwitchTransition, Transition } from 'react-transition-group';
import gsap from 'gsap/dist/gsap';
import {
  animatePosToRef,
  animateMotionBar,
  animateVisualIn,
  animateVisualOut,
} from '../components/animations';
import TransitionContext from '../context/TransitionContext';

const TransitionComponent = ({ 
  children, 
  pageProps, 
  logo,
  motionBar,
  vpWidth,
  vpHeight,
  initialMotionBarTop,
}) => {
  const { toggleCompleted } = useContext(TransitionContext);
  return (
    <SwitchTransition>
      <Transition
        key={pageProps.story.full_slug}
        timeout={500}
        onEnter={(node) => {
          toggleCompleted(false);
          console.log('onEnter')
          let headline = node.querySelector('.textblock-headline'),
          visualEl = node.querySelectorAll('.visual > *');
          if (visualEl.length > 0) {
            animateVisualIn(visualEl);
          }
          if (headline !== null) {
            animatePosToRef(logo, headline.getBoundingClientRect().x)
          } else {
            animatePosToRef(logo, '100')
          }
          animateMotionBar(
            motionBar,
            document.querySelector('main'),
            vpWidth,
            vpHeight,
            initialMotionBarTop,
            "0",
            headline.getBoundingClientRect().x,
            headline.childNodes[0].clientWidth
    )
          if (headline !== null) {
            gsap.fromTo(headline.childNodes[0], {
              opacity: 0,
              y: 200,
              x: 0,
            },
              {
                opacity: 1,
                y: 0,
                x: 0,
                ease: 'Expo.easeOut',
                duration: 1,
                delay: .2,
              });
          }
          gsap.from('.textblock-text', {
            opacity: 0,
            y: 30,
            delay: 0.2,
            duration: 1,
          })
          // gsap.fromTo(['.is-prev', '.prev-line'], {
          //   opacity: 0,
          //   x: 10,
          // }, {
          //   opacity: 1,
          //   x: 0,
          //   delay: 0.5,
          // })
          // gsap.fromTo(['.is-next', '.next-line'], {
          //   opacity: 0,
          //   x: -10,
          // }, {
          //   opacity: 1,
          //   x: 0,
          //   delay: 0.5,
          // })
          // gsap
          //   .timeline({
          //     paused: true,
          //     onComplete: () => toggleCompleted(true),
          //   })
          //   .to(node, { autoAlpha: 1, xPercent: 0, duration: 0.25 })
          //   .to(node, { scale: 1, duration: 0.25 })
          //   .play();
        }}
        onExit={(node) => {
          // gsap
          //   .timeline({ paused: true })
          //   .to(node, { scale: 0.8, duration: 0.2 })
          //   .to(node, { xPercent: 100, autoAlpha: 0, duration: 0.2 })
          //   .play();
          let headline = node.querySelector('.textblock-headline'),
          visual = node.getElementsByClassName('visual');
        if (visual.length > 0) {
          animateVisualOut(visual);
        }
        gsap.to('.textblock-text', {
          opacity: 0,
          y: 30,
        })
        // gsap.to(['.is-prev', '.prev-line'], {
        //   opacity: 0,
        //   x: 10,
        // })
        // gsap.to(['.is-next', '.next-line'], {
        //   opacity: 0,
        //   x: -10,
        // })
        gsap.to(node, {
          autoAlpha: 0,
          duration: 100,
          delay: .3,
        })
        if (headline !== null) {
          gsap.to(headline.childNodes[0], {
            y: 200,
            x: 0,
            ease: 'Expo.easeIn',
            duration: 0.3,
          });
        }



        }}
      >
        {children}
      </Transition>
    </SwitchTransition>
  );
};

export default TransitionComponent;
