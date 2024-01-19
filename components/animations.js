import { gsap } from 'gsap';
const timing = 0.2;


export const animateColBg = (el, col) => {
  gsap.to(el, {
    backgroundColor: col,
    duration: timing,
    delay: 0
  });
};

export const animateCssVarCols = (colBackground,  colLogo, colType, colAccent, colNav) => {
  gsap.to("html", {
    "--colorBackground": colBackground,
    "--colorLogo": colLogo,
    "--colorType": colType,
    "--colorAccent": colAccent,
    "--colorNav": colNav,
    "--colorNavBtn": '#fff',
    duration: timing,
    delay: 0
  });
  if ( colNav === '#fff') {
    gsap.to("html", {
      "--colorNavBtn": "#000",
      duration: timing,
      delay: 0
    });
  }
  if ( colBackground === '#000') {
    gsap.to("html", {
      "--colorShadow": 'rgba(255, 255, 255, .2)',
      "--colorShadowOverlay": 'rgba(0, 0, 0, 1)',
      duration: timing,
      delay: 0
    });
  } else {
    gsap.to("html", {
      "--colorShadow": 'rgba(0, 0, 0, .2)',
      "--colorShadowOverlay": 'rgba(255, 255, 255, 1)',
      duration: timing,
      delay: 0
    });
  }
};

export const animateColText = (el, col, invert) => {
  if (invert) {
    gsap.to(el, {
      color: "#fff",
      duration: timing,
      delay: 0
    });
  } else {
    gsap.to(el, {
      color: col,
      duration: timing,
      delay: 0
    });
  }
};

export const animatePosToRef = (el, ref) => {
  if (el === null) return;
  gsap.to(el, {
    x: ref,
    duration: timing,
    ease: 'Expo.easeOut'
  });
};


export const animateStaggerEntry = (el, offset) => {
  gsap.from(el, {
    opacity: 0,
    y: 20,
    delay: 0.4,
    stagger: 0.08,
    duration: 1,
    ease: 'Expo.easeOut'
  })
}

export const animateSetAttr = (el, attr) => {
  // svg, for example vita
  gsap.set(el, {
    attr: attr,
  });
};
export const animateFromToAttr = (el, attrFrom, attrTo) => {
  // svg, for example vita
  gsap.fromTo(el, {
    attr: attrFrom,
  }, {
    attr: attrTo,
    delay: 0.4,
    duration: timing + 1.5,
    ease: 'Expo.easeOut'
  })
};

export const animateMotionBar = (el, mainContainer, vpWidth, vpHeight, initialMotionBarTop, timeout, headlineX, headlineWidth) => {
  const durationPos1 = 0.4, 
    durationPos2 = 0.6;
    console.log('the classlist is ' + mainContainer.classList)
  if (mainContainer == null) {
    console.log('the classlist is null')
  } else if (mainContainer.classList.contains('m-pd-mobile')) {
    let mbTL = gsap.timeline();
    mbTL.to(el, {
      opacity: 1,
      x: 0,
      width: vpWidth,
      zIndex: -1,
      duration: durationPos1,
      ease: 'Expo.easeInOut'
    })
      .to(el, {
        y: 0,
        top: 0,
        height: vpHeight,
        duration: durationPos2,
        ease: 'Expo.easeOut'
      })
      console.log('if the pd one ')

  } else if (mainContainer.classList.contains('m-timeline')) {
    let mbTL = gsap.timeline();
    mbTL.to(el, {
      opacity: 1,
      x: 0,
      top: initialMotionBarTop,
      width: 30,
      height: 10,
      duration: durationPos1 + 0.2,
      ease: 'Expo.easeInOut'
    })
      .to(el, {
        top: 0,
        zIndex: 2,
        height: vpHeight,
        duration: durationPos2,
        ease: 'Expo.easeOut'
      })
  } else {
    let mbTL = gsap.timeline();
    mbTL.to(el, {
      opacity: 1,
      y: 0,
      top: initialMotionBarTop,
      height: 10,
      duration: durationPos1,
      ease: 'Expo.easeInOut'

    })
    .to(el, {
      x: headlineX,
      width: headlineWidth,
      zIndex: 2,
      duration: durationPos2,
      ease: 'Expo.easeOut'
    })
  }
}

export const animateVisualIn = (el) => {
  gsap.from(el, {
    opacity: 0,
    y: 200,
    stagger: 0.15,
    delay: 0.25,
    duration: 1,
    ease: "power3.out"
  })
}
export const animateVisualOut = (el) => {
  gsap.to(el, {
    opacity: 0,
    y: -200,
    duration: .3,
    ease: "power3.in"
  })
}