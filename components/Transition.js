import { useContext } from 'react';
import { SwitchTransition, Transition } from 'react-transition-group';
import gsap from 'gsap/dist/gsap';

import TransitionContext from '../context/TransitionContext';

const TransitionComponent = ({ children, pageProps }) => {
  const { toggleCompleted } = useContext(TransitionContext);
  return (
    <SwitchTransition>
      <Transition
        // key={router.pathname}
        key={pageProps.story.full_slug}
        timeout={500}
        onEnter={(node) => {
          console.log('onEnter')
          toggleCompleted(false);
          gsap.set(node, { autoAlpha: 0, scale: 0.8, xPercent: -100 });
          gsap.fromTo(['h1'], {
            opacity: 0,
            x: 10,
          }, {
            opacity: 1,
            x: 0,
            delay: 0.5,
          })
          gsap
            .timeline({
              paused: true,
              onComplete: () => toggleCompleted(true),
            })
            .to(node, { autoAlpha: 1, xPercent: 0, duration: 0.25 })
            .to(node, { scale: 1, duration: 0.25 })
            .play();
        }}
        onExit={(node) => {
          gsap
            .timeline({ paused: true })
            .to(node, { scale: 0.8, duration: 0.2 })
            .to(node, { xPercent: 100, autoAlpha: 0, duration: 0.2 })
            .play();
        }}
      >
        {children}
      </Transition>
    </SwitchTransition>
  );
};

export default TransitionComponent;
