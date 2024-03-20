import { TransitionProvider } from '../context/TransitionContext';
import TransitionComponent from '../components/Transition';
import Config from "./../components/config"
import Logo from "./../components/logo"
import PropTypes from 'prop-types'
import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../helpers/isomorphicEffect';
import {
  animatePosToRef,
  animateMotionBar,
  animateVisualIn,
  animateVisualOut,
} from '../components/animations';
import { cPropertyVH } from '../helpers/cproperty-vh'
import Head from 'next/head'

const timeout = 500

const Layout = ({ children, pageProps }) => {

  let motionBar = useRef(null),
    logoEl = useRef(null),
    pageActive = useRef(0),
    initialLoadDone = useRef(false),
    vpHeight = useRef(null),
    vpWidth = useRef(null),
    initialMotionBarTop = useRef(vpHeight.current / 2);

  useIsomorphicLayoutEffect(() => {
    vpHeight.current = window.innerHeight;
    vpWidth.current = window.innerWidth;
    initialMotionBarTop.current = vpHeight.current / 2;

    pageActive.current = document.querySelector('nav.nav-main .is-active');
    if (initialLoadDone.current === false) {
      let headlineX = null,
        headlineW = null;
      if (document.querySelector('.textblock-headline')) {
        headlineX = document.querySelector('.textblock-headline').getBoundingClientRect().x;
        headlineW = document.querySelector('.textblock-headline').childNodes[0].clientWidth;
      } else {
        headlineX = 200;
        headlineW = 400;
      }

      animatePosToRef(logoEl.current, headlineX)
      animateMotionBar(
        motionBar.current,
        document.querySelector('main'),
        vpWidth.current,
        vpHeight.current,
        initialMotionBarTop.current,
        timeout,
        headlineX,
        headlineW
      )
      initialLoadDone.current = true;
    }

    cPropertyVH();
    // START: Resize-Animations
    const handleResize = () => {
      let headline = document.querySelector('.textblock-headline');
      vpHeight.current = window.innerHeight;
      vpWidth.current = window.innerWidth;
      initialMotionBarTop.current = vpHeight.current / 2;
      if (headline) {
        animatePosToRef(logoEl.current, headline.getBoundingClientRect().x)
        animateMotionBar(
          motionBar.current,
          document.querySelector('main'),
          vpWidth.current,
          vpHeight.current,
          initialMotionBarTop.current,
          timeout,
          headline.getBoundingClientRect().x,
          headline.childNodes[0].clientWidth
        )
      }
    }

    window.addEventListener('resize', () => {
      handleResize();
    });

    return _ => {
      // resize-docu + clear from: https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
      window.removeEventListener('resize', handleResize)
    }
    // END: Resize-Animations


  }, [])

  return (
    <>
      <Head>
        <title id="title" key="title">Portfolio und Vita von Johannes Bühl</title>
        <meta id="description" name="description" content="Portfolio und Website von Johannes Bühl (Teamleitung Konzeption und Projektmanagement)" />
        <meta name="icon" href="/favicon/favicon.ico" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#ffcc00" />
        <meta name="msapplication-TileColor" content="#ffcc00" />

      </Head>
      <Logo
        ref={logoEl}
        menuItems={pageProps.config.content.header_menu}
        activePage={pageProps.story.full_slug}
      />
      <Config configContent={pageProps.config.content} pageProps={pageProps} />
      <TransitionProvider>
        <TransitionComponent
          pageProps={pageProps}
          logo={logoEl.current}
          motionBar={motionBar.current}
          vpWidth={vpWidth.current}
          vpHeight={vpHeight.current}
          initialMotionBarTop={initialMotionBarTop.current}
        >
          <main>
            {children}
          </main>
        </TransitionComponent>
      </TransitionProvider>
      <div ref={motionBar} className="mod-motion-bar" />
    </>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
export default Layout;
