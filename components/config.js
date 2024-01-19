import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import React from 'react'
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from "gsap/dist/Draggable";
import { InertiaPlugin } from '../helpers/gsap/InertiaPlugin';
import { useIsomorphicLayoutEffect } from '../helpers/isomorphicEffect';
import { useRouter } from 'next/router';


const Config = ({ blok }) => {

  gsap.registerPlugin(Draggable, InertiaPlugin);

  let pageAllSlugs = [],
   router = useRouter(),
   currentRoute = router.asPath,
    activeSlug = currentRoute;
  blok.header_menu.forEach(menuItem => {
    // console.log("menuitem" + menuItem.link.cached_url)
    // pageAllSlugs.push("/" + menuItem.link.cached_url)
  })
  console.log("pageAllSlugs: " + pageAllSlugs)
  console.log("activeSlug: " + activeSlug)
  // START: get the positions for the pagination
  let activeSlugPosition = activeSlug ? pageAllSlugs.findIndex(o => o === activeSlug) + 1 : 1;
  let navItemsTotal = useRef(pageAllSlugs.length)
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
  if (menuIsActive === false) {
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
    navNextPrev = useRef(null),
    pageActive = useState(0),
    pageNext = useState(0),
    pageNextPath = useState(0),
    pagePrev = useState(0),
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


    // // get the next and previous pages
    // pageActive = menu.current.querySelector('.nav-item .is-active');
    // if (pageActive.current !== null) {

    //   if (navNextPrev.current !== null) {
    //     navNextPrev.current.querySelector('.is-next').classList.remove('is-next')
    //   }
    //   if (navNextPrev.current.querySelector('.is-prev') !== null) {
    //     navNextPrev.current.querySelector('.is-prev').classList.remove('is-prev')
    //   }
    //   if (pageActive.current.parentNode.nextSibling === null) {
    //     pageNext.current = navNextPrev.current.querySelector('.nav-item').childNodes[0]
    //     navNextPrev.current.querySelector('.nav-item').classList.add('is-next')
    //   } else {
    //     pageNext.current = pageActive.current.parentNode.nextSibling.childNodes[0]
    //     pageActive.current.parentNode.nextSibling.classList.add('is-next')
    //   }
    //   pageNextPath.current = pageNext.current.getAttribute("href");

    //   if (pageActive.current.parentNode.previousSibling === null) {
    //     pagePrev.current = navNextPrev.current.getElementsByClassName('nav-item')[navItemsTotal.current - 1].childNodes[0];
    //     navNextPrev.current.getElementsByClassName('nav-item')[navItemsTotal.current - 1].classList.add('is-prev')
    //   } else {
    //     pagePrev.current = pageActive.current.parentNode.previousSibling.childNodes[0];
    //     pageActive.current.parentNode.previousSibling.classList.add('is-prev')
    //   }
    //   pagePrevPath.current = pagePrev.current.getAttribute("href");
    // }

    function navKeypress(e) {
      if (e.keyCode === 40 || e.keyCode === 39) {
        navigate(pageNextPath.current);
      } else if (e.keyCode === 37 || e.keyCode === 38) {
        navigate(pagePrevPath.current);
      }
    }
    document.addEventListener('keydown', navKeypress, false)

  }, [pageActive, pageNext, pagePrev, pageNextPath, pagePrevPath]); // <- empty dependency Array so it doesn't re-run on every render

  return (
    <div id="navigation" {...storyblokEditable(blok)} key={blok._uid}>

      <button aria-label={menuButtonText.current} id="nav-menu-button" className={navButtonClass.current} onClick={handleClickMenu}>
        <div className="icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="button-text">{menuButtonText.current}</div>
      </button>

      <div id="pagination">
        <div className="pgi-current">{activeSlugPosition}</div>
        <hr />
        <div className="pgi-total">{navItemsTotal.current}</div>
      </div>

      <nav ref={navigationEl} className={'nav-main ' + navMainClass.current}>
        <ul ref={menu}>
          {blok.header_menu.map((nestedBlok, index) => (
              <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} number={index} />
          ))}
        </ul>
      </nav>

      <div id="nav-nextprev">
        <ul ref={navNextPrev}>

          {blok.header_menu.map((nestedBlok, index) => (
              <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} number={index} />
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