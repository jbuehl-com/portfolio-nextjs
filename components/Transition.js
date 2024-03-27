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
  const timing = 500;
  return (
    <SwitchTransition>
      <Transition
        key={pageProps.story.full_slug}

        timeout={timing}

        onEnter={(node) => {
          toggleCompleted(false);

          let headline = node.querySelector('h1')
          let visualEl = node.querySelectorAll('.visual > *')
          let headlineAnimationOffset = null

          if (visualEl.length > 0) {
            animateVisualIn(visualEl);
          }


          if (headline !== null) {
            headlineAnimationOffset = vpWidth > 768 ? headline.clientHeight + 30 : headline.clientHeight + vpHeight / 2 - headline.getBoundingClientRect().y;
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
            headline ? headline.getBoundingClientRect().x : "0",
            headline ? headline.clientWidth : "10"
          )
          if (headline !== null) {
            gsap.fromTo(headline, {
              opacity: 0,
              y: headlineAnimationOffset,
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
            duration: timing / 1000,
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
          let headline = node.querySelector('h1'),
            visual = node.getElementsByClassName('visual'),
            headlineAnimationOffset = null;

            if (headline !== null) {
              headlineAnimationOffset = vpWidth > 768 ? headline.clientHeight + 30 : headline.clientHeight + vpHeight / 2 - headline.getBoundingClientRect().y;
            }
          if (visual.length > 0) {
            animateVisualOut(visual);
          }
          gsap.to('.textblock-text, .c-item', {
            opacity: 0,
            y: headlineAnimationOffset,
            ease: 'Expo.easeIn',
            duration: 0.3,
          })
          // gsap.to(['.is-prev', '.prev-line'], {
          //   opacity: 0,
          //   x: 10,
          // })
          // gsap.to(['.is-next', '.next-line'], {
          //   opacity: 0,
          //   x: -10,
          // })
          // gsap.to(node, {
          //   autoAlpha: 0,
          //   duration: 100,
          //   delay: .3,
          // })
          if (headline !== null) {
            gsap.to(headline, {
              y: 200,
              x: 0,
              ease: 'Expo.easeIn',
              duration: timing / 1000 / 2,
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
