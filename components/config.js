import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import React from 'react'
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from "gsap/dist/Draggable";
import { InertiaPlugin } from '../helpers/gsap/InertiaPlugin';
import { useIsomorphicLayoutEffect } from '../helpers/isomorphicEffect';

const Config = ({ configContent, pageProps }) => {

  gsap.registerPlugin(Draggable, InertiaPlugin);

  // START: get the positions for the pagination
  let activeSlugPosition = useRef(0),
    navItemsTotal = useRef(0);
    
  if (configContent.header_menu) {
    navItemsTotal.current = configContent.header_menu.length
  }
  if (pageProps && configContent.header_menu && configContent.header_menu[0].link) {
    configContent.header_menu.forEach((el, i) => {
      pageProps.story.full_slug === el.link.cached_url ? 
      activeSlugPosition.current = i + 1 : false
    })
  }
  // END: get the positions for the pagination
  // START: Click menu variables + conditional rendering 
  const [menuIsActive, setMenuIsActive] = React.useState(false)
  let menuButtonText = useRef('Menü öffnen'),
    navMainClass = useRef('is-closed'),
    navButtonClass = useRef('is-not-active')
  const handleClickMenu = () => {
    setMenuIsActive(!menuIsActive)
    gsap.set(navigationEl.current, { rotation: navItemsTotal.current * 25 / navItemsTotal.current * (activeSlugPosition - 1) });
  }

  if (menuIsActive !== false) {
    menuButtonText.current = 'Menü schließen'
    navMainClass.current = 'is-open'
    navButtonClass.current = 'is-active'
    // gsap.set('main', { zIndex: 50 });
  } else {
    menuButtonText.current = 'Menü öffnen'
    navMainClass.current = 'is-closed'
    navButtonClass.current = 'is-not-active'
    // gsap.set('main', { zIndex: 0 });
  }
  // END: Click menu variables + conditional rendering 

  let navigationEl = useRef(null),
    menu = useRef(null),
    pageNextPath = useState(0),
    pagePrevPath = useState(0);



  useIsomorphicLayoutEffect(() => {
    const navItems = gsap.utils.toArray(".nav-main .nav-item");
    navItems.forEach((item, i) => {
      gsap.set(item, { rotation: - navItemsTotal.current * 25 / navItemsTotal.current * i });
    })

    Draggable.create(navigationEl.current, {
      type: "rotation",
      allowNativeTouchScrolling: false,
      inertia: true,
      dragClickables: true,
      allowEventDefault: true,
    });

  //  function navKeypress(e) {
  //     if (e.keyCode === 40 || e.keyCode === 39) {
  //       navigate(pageNextPath.current);
  //     } else if (e.keyCode === 37 || e.keyCode === 38) {
  //       navigate(pagePrevPath.current);
  //     }
  //   }
    // document.addEventListener('keydown', navKeypress, false)

  }, [pageNextPath, pagePrevPath]); // <- empty dependency Array so it doesn't re-run on every render

  return (
    <div id="navigation" {...storyblokEditable(configContent)}>

      <button aria-label={menuButtonText.current} id="nav-menu-button" className={navButtonClass.current} onClick={handleClickMenu}>
        <div className="icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="button-text">{menuButtonText.current}</div>
      </button>

      <nav ref={navigationEl} className={'nav-main ' + navMainClass.current}>
      {/* {console.log("configContent.header_menu " + JSON.stringify(configContent.header_menu))} */}

        <ul ref={menu}>
          {configContent.header_menu.map((nestedBlok, index) => (
            <>
              {/* link */}
              {/* theoretisch kann ich via classe auch hier schon die active setzen und in menulink auf router verzichten */}
              <StoryblokComponent
                blok={nestedBlok}
                key={nestedBlok._uid}
                number={index}
              />
            </>
          ))}
        </ul>
      </nav>

      <div id="pagination">
        <div className="pgi-current">{activeSlugPosition.current}</div>
        <hr />
        <div className="pgi-total">{navItemsTotal.current}</div>
      </div>
      <div id="nav-nextprev">
        <ul>
          {configContent.header_menu.map((nestedBlok, index) => (
            <>
            {/* the first one */}
            { index === 0 && activeSlugPosition.current === 1 ?
            <StoryblokComponent blok={configContent.header_menu[configContent.header_menu.length - 1]} key={configContent.header_menu[configContent.header_menu.length-1]._uid} number={configContent.header_menu.length-1} className={"is-prev"} />
            : false}       
            {/* all the others */}
            { index === activeSlugPosition.current -2 ? 
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} number={index} className={"is-prev"} />
            : false}
            { index === activeSlugPosition.current -1 ? 
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} number={index} className={"is-active"} />
            : false}
            { index === activeSlugPosition.current ?
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} number={index} className={"is-next"} />
            : false}            
            {/* and the last one */}
            { index === configContent.header_menu.length - 1 && activeSlugPosition.current === configContent.header_menu.length  ?
            <StoryblokComponent blok={configContent.header_menu[0]} key={configContent.header_menu[0]._uid} number={0} className={"is-next"} />
            : false}            
            </>


          ))}

        </ul>
        <div className="next-line"></div>
        <div className="prev-line"></div>
        <div className="n-prev">
        </div>
      </div>


    </div>
  );
};
export default Config;