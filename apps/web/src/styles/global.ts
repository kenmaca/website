/**
 * Document-level CSS for the web build. Component styling lives in React
 * Native StyleSheets; this only covers what RN can't express: the document
 * reset, selection, focus, scroll behaviour and a few keyframe animations
 * targeted through `data-*` attributes (react-native-web's `dataSet`).
 */
export const globalCss = /* css */ `
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:88px}
html,body{margin:0;padding:0;background-color:var(--kui-background);color:var(--kui-text)}
body{min-height:100vh;min-height:100svh;overflow-x:hidden;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;transition:background-color .3s ease}
#root{display:flex;flex-direction:column;min-height:100vh;min-height:100svh}
::selection{background:var(--kui-accent-soft);color:var(--kui-text)}
a{-webkit-tap-highlight-color:transparent}
:focus:not(:focus-visible){outline:none}

/* Hero ambience */
@keyframes km-drift{0%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(4%,-6%,0) scale(1.08)}100%{transform:translate3d(-3%,4%,0) scale(.96)}}
[data-km-glow]{animation:km-drift 18s ease-in-out infinite alternate;will-change:transform}
[data-km-glow="b"]{animation-duration:24s;animation-direction:alternate-reverse}
@keyframes km-ken-burns{from{transform:scale(1.12)}to{transform:scale(1)}}

@keyframes km-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
[data-km-bob]{animation:km-bob 1.8s ease-in-out infinite}
@keyframes km-pulse{0%{box-shadow:0 0 0 0 rgba(52,211,153,.55)}80%,100%{box-shadow:0 0 0 10px rgba(52,211,153,0)}}
[data-km-pulse]{animation:km-pulse 2s ease-out infinite}

/* Hero photo: framed per breakpoint so Ken (second from left: ~27–42% across,
   head at ~37% down the photo) stays clear of the intro text. */
[data-km-hero-photo]{position:absolute!important;background-image:url(/images/hero.jpg);background-repeat:no-repeat;filter:grayscale(1) contrast(1.1);opacity:.55;transform-origin:34% 40%;animation:km-ken-burns 2.4s cubic-bezier(.16,1,.3,1) both}

/* Phones & tablets: the intro is vertically centred and the photo is a band
   across the top that fades out behind it; Ken's head, shoulders and upper
   arms stay in view while his lower half may sit behind the text. */
@media (max-width:1023.98px){
  [data-km-hero]{justify-content:center!important;padding-top:88px!important;padding-bottom:132px!important}
  [data-km-hero-photo]{top:0;left:0;right:0;-webkit-mask-image:linear-gradient(to bottom,#000 62%,transparent);mask-image:linear-gradient(to bottom,#000 62%,transparent)}
}
/* Phones: centred horizontally. */
@media (max-width:767.98px){
  [data-km-hero-photo]{height:44%;background-size:auto 160%;background-position:22% 63%}
}
/* Tablets: in the space to the right of the name, above the intro. */
@media (min-width:768px) and (max-width:1023.98px){
  [data-km-hero-photo]{height:60%;background-size:auto 204%;background-position:7% 49%}
}

/* Wide screens: the photo is scaled to the hero's height and slid sideways so
   Ken sits just clear of the text column, at about where the signature
   starts; the left of the photo fades out behind the text. */
@media (min-width:1024px){
  [data-km-hero-photo]{
    --km-hero-h:max(100svh,720px);
    --km-text-end:calc(max(20px,50vw - 540px) + 620px);
    --km-content-right:calc(min(100vw,50vw + 560px) - 20px);
    --km-ken-x:max(calc(var(--km-text-end) + var(--km-hero-h) * 0.1125 + 24px),calc(var(--km-content-right) - 320px));
    --km-photo-x:calc(var(--km-ken-x) - var(--km-hero-h) * 0.51);
    inset:0;background-size:auto var(--km-hero-h);background-position:var(--km-photo-x) 0;
    -webkit-mask-image:linear-gradient(to right,transparent calc(var(--km-text-end) - 240px),#000 calc(var(--km-text-end) + 20px));
    mask-image:linear-gradient(to right,transparent calc(var(--km-text-end) - 240px),#000 calc(var(--km-text-end) + 20px))
  }
}

/* Experience sidebar: sticky only on wide screens, where it sits beside the
   timeline. When the columns stack, sticking would let the timeline slide
   over it. */
@media (min-width:1024px){[data-km-sticky]{position:sticky!important;top:112px}}

/* Signature: each stroke draws in sequence, like the original site */
[data-km-signature] path{fill:none;stroke:currentColor;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}
[data-km-signature] [data-stroke]{animation-duration:2.4s;animation-delay:1.1s;animation-fill-mode:both;animation-iteration-count:1}
[data-stroke="s"]{stroke-dasharray:470;animation-name:km-sig-s;animation-timing-function:ease-in}
[data-stroke="dot"]{stroke-dasharray:2;animation-name:km-sig-dot;animation-timing-function:linear}
[data-stroke="letters"]{stroke-width:4!important;stroke-dasharray:205;animation-name:km-sig-letters;animation-timing-function:ease-in-out}
[data-stroke="m"]{stroke-width:4!important;stroke-dasharray:177;animation-name:km-sig-m;animation-timing-function:ease-in}
[data-stroke="a"]{stroke-dasharray:72;animation-name:km-sig-a;animation-timing-function:ease-in}
[data-stroke="k"]{stroke-dasharray:60;animation-name:km-sig-k;animation-timing-function:ease-in}
/* Each path stays invisible until its turn: round line caps would otherwise
   render a dot at the start of an undrawn stroke. */
@keyframes km-sig-s{0%{stroke-dashoffset:470;opacity:0}.1%{opacity:1}30%,100%{stroke-dashoffset:0;opacity:1}}
@keyframes km-sig-dot{0%,30%{stroke-dashoffset:2;opacity:0}30.1%{opacity:1}35%,100%{stroke-dashoffset:0;opacity:1}}
@keyframes km-sig-letters{0%,35%{stroke-dashoffset:205;opacity:0}35.1%{opacity:1}75%,100%{stroke-dashoffset:0;opacity:1}}
@keyframes km-sig-m{0%,75%{stroke-dashoffset:177;opacity:0}75.1%{opacity:1}85%,100%{stroke-dashoffset:0;opacity:1}}
@keyframes km-sig-a{0%,85%{stroke-dashoffset:72;opacity:0}85.1%{opacity:1}95%,100%{stroke-dashoffset:0;opacity:1}}
@keyframes km-sig-k{0%,95%{stroke-dashoffset:60;opacity:0}95.1%{opacity:1}100%{stroke-dashoffset:0;opacity:1}}

@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation-duration:.01ms!important;animation-delay:0ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
}
`;
