$(() => {

  // animate intro
  tl = new TimelineMax();
  tl.to($('#cover'), 0.5, {opacity: 0.1}, 'startIntro')
    .to($('#intro h1:nth-child(1)'), 0.5, {
      ease: Expo.easeInOut, opacity: 1, y: -50
    }, 'startIntro')
    .to($('#intro h1:nth-child(2)'), 0.5, {
      ease: Expo.easeInOut, opacity: 1, y: -50
    })
    .to($('#intro h1:nth-child(3)'), 0.5, {
      ease: Expo.easeInOut, opacity: 1, y: -50
    }, 'endIntro')
    .to($('#intro .divider'), 0.5, {
      ease: Expo.easeInOut, opacity: 1, y: -50
    }, 'endIntro')
    .to($('#signature'), 0.5, {opacity: 0.9})
    .to($('header ul'), 0.5, {
      ease: Expo.easeInOut, opacity: 1, transform: 'translateY(1vh)'
    });

  sm = new ScrollMagic.Controller();
});
