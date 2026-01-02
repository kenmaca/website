$(() => {

  // animate intro
  tl = new TimelineMax();
  tl.to($('#hero'), 0.5, {opacity: 0.1}, 'startIntro')
    .to($('#intro .subtitle'), 0.5, {
      ease: Expo.easeInOut, opacity: 1, y: -50
    }, 'startIntro')
    .to($('#intro .feature'), 0.5, {
      ease: Expo.easeInOut, opacity: 1, y: -50
    })
    .to($('#intro .print'), 0.5, {
      ease: Expo.easeInOut, opacity: 1, y: -50
    }, 'endIntro')
    .to($('#intro .divider'), 0.5, {
      ease: Expo.easeInOut, opacity: 1, y: -50
    }, 'endIntro')
    .to($('#signature'), 0.5, {opacity: 0.9});

  sm = new ScrollMagic.Controller();
});
