;
!function(t){var n=self.BENTO=self.BENTO||{};(n.bento=n.bento||[]).push((function(t){"use strict";function n(t,r){return(n=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,r)}function r(t){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,n){if(n&&("object"===o(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}var e={carousel:"carousel-d626044",scrollContainer:"scroll-container-d626044",hideScrollbar:"hide-scrollbar-d626044",horizontalScroll:"horizontal-scroll-d626044",verticalScroll:"vertical-scroll-d626044",slideElement:"slide-element-d626044",thumbnails:"thumbnails-d626044",startAlign:"start-align-d626044",centerAlign:"center-align-d626044",enableSnap:"enable-snap-d626044",disableSnap:"disable-snap-d626044",slideSizing:"slide-sizing-d626044",arrow:"arrow-d626044",ltr:"ltr-d626044",rtl:"rtl-d626044",arrowPrev:"arrow-prev-d626044",arrowNext:"arrow-next-d626044",arrowDisabled:"arrow-disabled-d626044",insetArrow:"inset-arrow-d626044",outsetArrow:"outset-arrow-d626044",defaultArrowButton:"default-arrow-button-d626044",arrowBaseStyle:"arrow-base-style-d626044",arrowFrosting:"arrow-frosting-d626044",arrowBackdrop:"arrow-backdrop-d626044",arrowBackground:"arrow-background-d626044",arrowIcon:"arrow-icon-d626044"},a="arrow-base-style-d626044";function l(t){return t?Array.prototype.slice.call(t):[]}function u(t,n){for(var r=[],o=0,i=0;i<t.length;i++){var e=t[i];n(e,i,t)?r.push(e):(o<i&&(t[o]=e),o++)}return o<t.length&&(t.length=o),r}function c(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,o=new Array(n);r<n;r++)o[r]=t[r];return o}Array.isArray;var s=Object.prototype;function d(t){return 1==(null==(n=t)?void 0:n.nodeType)?(t=t).tagName.toLowerCase()+(t.id?"#".concat(t.id):""):t;var n}function f(t,n,r,o,i,e,a,l,u,c,s){return t}function p(t,n,r,o,i,e,a,l,c,s,f){return function(t,n){var r,o,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Assertion failed";if(n)return n;t&&-1==i.indexOf(t)&&(i+=t);for(var e=3,a=i.split("%s"),l=a.shift(),c=[l];a.length;){var s=arguments[e++],f=a.shift();l+=d(s)+f,c.push(s,f.trim())}var p=new Error(l);throw p.messageArray=u(c,(function(t){return""!==t})),null===(r=(o=self).__AMP_REPORT_ERROR)||void 0===r||r.call(o,p),p}("​​​",t,n,r,o,i,e,a,l,c,s,f)}function b(t){return(t.ownerDocument||t).defaultView}function v(t,n,r){var o=t.hasAttribute(n),i=void 0!==r?r:!o;return i!==o&&(i?t.setAttribute(n,""):t.removeAttribute(n)),i}s.hasOwnProperty,s.toString;var h=/(\S+)(?:\s+(?:(-?\d+(?:\.\d+)?)([a-zA-Z]*)))?\s*(?:,|$)/g;function m(t){var n=t.getAttribute("srcset");if(n)return function(t){for(var n,r=[];n=h.exec(t);){var o=n[1],i=void 0,e=void 0;if(n[2]){var a=n[3].toLowerCase();if("w"==a)i=parseInt(n[2],10);else{if("x"!=a)continue;e=parseFloat(n[2])}}else e=1;r.push({url:o,width:i,dpr:e})}return new x(r)}(n);var r=t.getAttribute("src");return p(r,'Either non-empty "srcset" or "src" attribute must be specified: %s',t),new x([{url:r,width:void 0,dpr:1}])}var g,x=function(){function t(t){p(t.length>0,"Srcset must have at least one source"),this.ox=t;for(var n=!1,r=!1,o=0;o<t.length;o++){var i=t[o];n=n||!!i.width,r=r||!!i.dpr}p(!(n===r),"Srcset must have width or dpr sources, but not both"),t.sort(n?w:y),this.ux=n}var n=t.prototype;return n.select=function(t,n){f(t),f(n);var r;return r=this.ux?this.sx(t*n):this.lx(n),this.ox[r].url},n.sx=function(t){for(var n=this.ox,r=0,o=1/0,i=1/0,e=0;e<n.length;e++){var a,l=null!==(a=n[e].width)&&void 0!==a?a:0,u=Math.abs(l-t);if(!(u<=1.1*o||t/i>1.2))break;r=e,o=u,i=l}return r},n.lx=function(t){for(var n=this.ox,r=0,o=1/0,i=0;i<n.length;i++){var e=Math.abs(n[i].dpr-t);if(!(e<=o))break;r=i,o=e}return r},n.getUrls=function(){return this.ox.map((function(t){return t.url}))},n.stringify=function(t){for(var n=[],r=this.ox,o=0;o<r.length;o++){var i=r[o],e=i.url;t&&(e=t(e)),this.ux?e+=" ".concat(i.width,"w"):e+=" ".concat(i.dpr,"x"),n.push(e)}return n.join(", ")},t}();function w(t,n){return p(t.width!=n.width,"Duplicate width: %s",t.width),t.width-n.width}function y(t,n){return p(t.dpr!=n.dpr,"Duplicate dpr: %s",t.dpr),t.dpr-n.dpr}var k=["Webkit","webkit","Moz","moz","ms","O","o"];function A(t,n,r,o,i){var e=function(t,n,r){if(n.startsWith("--"))return n;var o;g||(o=Object.create(null),g=o);var i=g[n];if(!i||r){if(i=n,void 0===t[n]){var e=function(t){return t.charAt(0).toUpperCase()+t.slice(1)}(n),a=function(t,n){for(var r=0;r<k.length;r++){var o=k[r]+n;if(void 0!==t[o])return o}return""}(t,e);void 0!==t[a]&&(i=a)}r||(g[n]=i)}return i}(t.style,n,i);if(e){var a,l=o?r+o:r;t.style.setProperty((a=e.replace(/[A-Z]/g,(function(t){return"-"+t.toLowerCase()})),k.some((function(t){return a.startsWith(t+"-")}))?"-".concat(a):a),l)}}function C(t,n){void 0===n&&(n=t.hasAttribute("hidden")),n?t.removeAttribute("hidden"):t.setAttribute("hidden","")}var S={arrow:"arrow-066b665",auto:"auto-066b665",caption:"caption-066b665",captionText:"caption-text-066b665",clip:"clip-066b665",closeButton:"close-button-066b665",control:"control-066b665",controlsPanel:"controls-panel-066b665",expanded:"expanded-066b665",hideControls:"hide-controls-066b665",lightbox:"lightbox-066b665",gallery:"gallery-066b665",grid:"grid-066b665",nextArrow:"next-arrow-066b665",prevArrow:"prev-arrow-066b665",showControls:"show-controls-066b665",thumbnail:"thumbnail-066b665",topControl:"top-control-066b665"},j=("".concat(56,"px !important"),"".concat(80,"px !important"),"".concat(5,"px !important"),"0px ".concat(5,"px !important"),"".concat(56,"px !important"),"calc(100% - ".concat(56,"px) !important"),"repeat(4, calc(1024px/4 - ".concat(5,"px * 5 / 4))"),"".concat(80,"px !important"),"calc(100% - ".concat(80,"px) !important"),"".concat(40,"px !important"),"control-066b665"),O="gallery-066b665",z="top-control-066b665";function M(t,n,r){return n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}function B(t,n){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),r.push.apply(r,o)}return r}function L(t){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?B(Object(r),!0).forEach((function(n){M(t,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):B(Object(r)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))}))}return t}function E(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var o,i,e=[],a=!0,l=!1;try{for(r=r.call(t);!(a=(o=r.next()).done)&&(e.push(o.value),!n||e.length!==n);a=!0);}catch(t){l=!0,i=t}finally{try{a||null==r.return||r.return()}finally{if(l)throw i}}return e}}(t,n)||function(t,n){if(t){if("string"==typeof t)return c(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?c(t,n):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function R(t,n){if(null==t)return{};var r,o,i={},e=Object.keys(t);for(o=0;o<e.length;o++)r=e[o],n.indexOf(r)>=0||(i[r]=t[r]);return i}function N(){var t=0;return function(){return String(++t)}}function I(t,n){return t>0&&n>0?t%n:(t%n+n)%n}function T(n){var r=n.advance,o=n.as,i=void 0===o?P:o,e=n.by,a=n.disabled,l=n.outsetArrows,u=n.rtl,c=(0,t.useCallback)((function(){a||r()}),[r,a]);return(0,t.createElement)(i,{"aria-disabled":String(!!a),by:e,class:"arrow-d626044"+(a?" arrow-disabled-d626044":"")+(e<0?" arrow-prev-d626044":"")+(e>0?" arrow-next-d626044":"")+(l?" outset-arrow-d626044":"")+(l?"":" inset-arrow-d626044")+(u?" rtl-d626044":"")+(u?"":" ltr-d626044"),disabled:a,onClick:c,outsetArrows:l,rtl:u.toString()})}function P(n){var r=n["aria-disabled"],o=n.by,i=n.disabled,e=n.onClick,l=n.class;return(0,t.createElement)("div",{class:l},(0,t.createElement)("button",{"aria-disabled":r,"aria-label":o<0?"Previous item in carousel":"Next item in carousel",class:"default-arrow-button-d626044",disabled:i,onClick:e},(0,t.createElement)("div",{class:"".concat(a," ").concat("arrow-frosting-d626044")}),(0,t.createElement)("div",{class:"".concat(a," ").concat("arrow-backdrop-d626044")}),(0,t.createElement)("div",{class:"".concat(a," ").concat("arrow-background-d626044")}),(0,t.createElement)("svg",{class:"arrow-icon-d626044",viewBox:"0 0 24 24"},(0,t.createElement)("path",{d:o<0?"M14,7.4 L9.4,12 L14,16.6":"M10,7.4 L14.6,12 L10,16.6",fill:"none","stroke-width":"2px","stroke-linejoin":"round","stroke-linecap":"round"}))))}var G=(0,t.createContext)({slides:[],setSlides:function(t){}}),D="start",Y="horizontal";function F(t,n){var r=n.getBoundingClientRect(),o=r.bottom,i=r.height,e=r.left,a=r.right,l=r.top,u=r.width;return{start:Math.round(0==t?e:l),end:Math.round(0==t?a:o),length:Math.round(0==t?u:i)}}function Z(t,n){var r=F(t,n),o=r.end;return(r.start+o)/2}function U(t,n){return F(t,n).start}function $(t,n,r){return n==D?U(t,r):Z(t,r)}function _(t,n,r){var o=F(t,n),i=o.end;return o.start<=r&&r<i}function V(t,n){return 0==t?n.scrollLeft:n.scrollTop}function K(t,n){return 0==t?n.scrollWidth:n.scrollHeight}function W(t,n,r){!function(t,n,r){0==t?n.scrollLeft=r:n.scrollTop=r}(t,n,V(t,n)+r)}function X(t,n,r,o){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,e=n==D,a=F(t,o).length,l=e?U(t,o):Z(t,o),u=e?U(t,r):Z(t,r),c=Math.round(l-u-i*a);W(t,r,c);var s=F(t,r).length+V(t,r)+c<K(t,r);return!!c&&s}var q=(0,t.forwardRef)((function(n,r){var o=n._thumbnails,i=n.advanceCount,a=n.alignment,l=n.axis,u=n.children,c=n.lightboxGroup,s=n.loop,d=n.mixedLength,f=n.onClick,p=n.restingIndex,v=n.setRestingIndex,h=n.snap,m=n.snapBy,g=void 0===m?1:m,x=n.visibleCount,w=(0,t.useRef)(null),y=s?Math.floor(u.length/2):p,k=(0,t.useRef)(!1),C=(0,t.useCallback)((function(t){var n=w.current;n&&(M.current=I(M.current+t,u.length),O.current=0,X(l,a,n,n.children[I(y+t,n.children.length)],O.current)||v(M.current))}),[a,l,u.length,y,v]);(0,t.useImperativeHandle)(r,(function(){return{advance:C,next:function(){return C(i)},prev:function(){return C(-i)},get node(){return w.current}}}),[C,i]);var S=e,j=(0,t.useRef)(p),O=(0,t.useRef)(0),z=function(n,r){var o=n._thumbnails,i=n.alignment,e=n.children,a=n.lightboxGroup,l=n.loop,u=n.mixedLength,c=n.offsetRef,s=n.pivotIndex,d=n.restingIndex,f=n.snap,p=n.snapBy,b=n.visibleCount,v=e.length,h=a?yt:"div",m=e.map((function(n,e){var l="slide-".concat(n.key||e);return(0,t.createElement)(h,{caption:n.props.caption,key:l,"data-slide":e,class:"".concat(r.slideSizing," ").concat(r.slideElement," ").concat(f&&0===I(e,p)?r.enableSnap:r.disableSnap," ").concat("center"===i?r.centerAlign:r.startAlign," ").concat(o?r.thumbnails:""," "),group:a||void 0,part:"slide",style:{flex:u?"0 0 auto":"0 0 ".concat(100/b,"%")}},n)}));if(!l)return m;var g=[],x=[],w=I(v-d+s,v);if(d<=s)for(var y=0;y<w;y++)g.unshift(m.pop());else for(var k=0;k<v-w;k++)x.push(m.shift());return c.current=g.length?g.length:-x.length,(0,t.createElement)(t.Fragment,null,g,m,x)}({alignment:a,children:u,loop:s,mixedLength:d,offsetRef:j,lightboxGroup:c,pivotIndex:y,restingIndex:p,snap:h,snapBy:g,visibleCount:x,_thumbnails:o},S),M=(0,t.useRef)(p),B=(0,t.useCallback)((function(){if(w.current&&w.current.children.length){var t=w.current;A(t,"scrollBehavior","auto"),k.current=!0,X(l,a,t,t.children[y],O.current),A(t,"scrollBehavior","smooth")}}),[a,l,y]);(0,t.useLayoutEffect)((function(){w.current&&s&&w.current.children.length&&B()}),[s,p,B]),(0,t.useLayoutEffect)((function(){if(w.current){var t=w.current;if(t){var n=b(t);if(n){var r=new n.ResizeObserver(B);return r.observe(t),function(){return r.disconnect()}}}}}),[B]);var L=(0,t.useMemo)((function(){return function(t,n,r){var o=0,i=0,e=null;function a(){o=0;var l,u=r-(t.Date.now()-i);u>0?o=t.setTimeout(a,u):(l=e,e=null,n.apply(null,l))}return function(){i=t.Date.now();for(var n=arguments.length,l=new Array(n),u=0;u<n;u++)l[u]=arguments[u];e=l,o||(o=t.setTimeout(a,r))}}(w.current?b(w.current):window,(function(){null!==M.current&&M.current!==p&&v(M.current)}),200)}),[p,v]);return(0,t.createElement)("div",{ref:w,onClick:f,onScroll:function(){k.current?k.current=!1:(function(){var t=w.current;if(t){var n=function(t,n,r,o,i){var e=$(t,n,r);if(_(t,o[i],e))return i;for(var a=1;a<=o.length/2;a++){var l=I(i+a,o.length),u=I(i-a,o.length);if(_(t,o[l],e))return l;if(_(t,o[u],e))return u}}(l,a,t,t.children,y);h||(O.current=function(t,n,r,o){return($(t,n,o)-$(t,n,r))/F(t,o).length}(l,a,t,t.children[n])),M.current=I(n-j.current,u.length)}}(),L())},class:"".concat("scroll-container-d626044"," ").concat("hide-scrollbar-d626044"," ").concat(0===l?"horizontal-scroll-d626044":"vertical-scroll-d626044"),tabindex:0},z)}));q.displayName="Scroller";var H=["advanceCount","arrowPrevAs","arrowNextAs","autoAdvance","autoAdvanceCount","autoAdvanceInterval","autoAdvanceLoops","children","controls","defaultSlide","dir","lightbox","loop","mixedLength","onClick","onFocus","onMouseEnter","onSlideChange","onTouchStart","orientation","outsetArrows","snap","snapAlign","snapBy","visibleCount","_thumbnails"],J="auto",Q=N(),tt=(0,t.forwardRef)((function(n,r){var o,i,e=n.advanceCount,a=void 0===e?1:e,l=n.arrowPrevAs,u=n.arrowNextAs,c=n.autoAdvance,s=void 0!==c&&c,d=n.autoAdvanceCount,f=void 0===d?1:d,p=n.autoAdvanceInterval,v=void 0===p?1e3:p,h=n.autoAdvanceLoops,m=void 0===h?Number.POSITIVE_INFINITY:h,g=n.children,x=n.controls,w=void 0===x?"auto":x,y=n.defaultSlide,k=void 0===y?0:y,A=n.dir,C=void 0===A?J:A,S=n.lightbox,j=void 0!==S&&S,O=n.loop,z=n.mixedLength,M=void 0!==z&&z,B=n.onClick,N=n.onFocus,P=n.onMouseEnter,Z=n.onSlideChange,U=n.onTouchStart,$=n.orientation,_=void 0===$?Y:$,V=n.outsetArrows,W=void 0!==V&&V,X=n.snap,tt=void 0===X||X,nt=n.snapAlign,rt=void 0===nt?D:nt,ot=n.snapBy,it=void 0===ot?1:ot,et=n.visibleCount,at=void 0===et?1:et,lt=n._thumbnails,ut=void 0!==lt&&lt,ct=R(n,H),st=(0,t.useMemo)((function(){return t.Children.toArray(g)}),[g]),dt=st.length,ft=(0,t.useContext)(G),pt=E((0,t.useState)(Math.min(Math.max(k,0),dt)),2),bt=pt[0],vt=pt[1],ht=null!==(o=ft.currentSlide)&&void 0!==o?o:bt,mt=null!==(i=ft.setCurrentSlide)&&void 0!==i?i:vt,gt=ut?bt:ht,xt=ut?vt:mt,wt=(0,t.useRef)(gt),yt=_==Y?0:1,kt=E((0,t.useState)(Q),1)[0];(0,t.useLayoutEffect)((function(){xt(ht)}),[ht,xt]);var At=ft.setSlides,Ct=ft.slides,St=(0,t.useRef)(null),jt=(0,t.useRef)(null),Ot=(0,t.useRef)(null),zt=(0,t.useRef)(0),Mt=(0,t.useMemo)((function(){return Math.max(v,1e3)}),[v]),Bt=(0,t.useCallback)((function(){return!(zt.current+at/dt>=m||4!==It.current||(O||wt.current+at<dt?(St.current.advance(f),zt.current+=f/dt):(St.current.advance(-wt.current),zt.current=Math.ceil(zt.current)),0))}),[f,m,dt,O,at]),Lt=(0,t.useCallback)((function(){return St.current.next()}),[]),Et=(0,t.useCallback)((function(){return St.current.prev()}),[]);(0,t.useEffect)((function(){if(s&&jt.current){var t=b(jt.current),n=t.setInterval((function(){Bt()||t.clearInterval(n)}),Mt);return function(){return t.clearInterval(n)}}}),[Bt,Mt,s]);var Rt=(0,t.useCallback)((function(t){dt<=0||isNaN(t)||(t=O?I(t,dt):Math.min(Math.max(t,0),dt-1),xt(t),wt.current!==t&&(wt.current=t,Z&&Z(t)))}),[dt,O,xt,Z]);(0,t.useImperativeHandle)(r,(function(){return{goToSlide:function(t){It.current=0,Rt(t)},next:function(){It.current=0,Lt()},prev:function(){It.current=0,Et()},get root(){return jt.current},get node(){return Ot.current}}}),[Lt,Et,Rt]),(0,t.useEffect)((function(){!ut&&Ct&&Ct.length!==st.length&&At(st)}),[ut,st,At,Ct]);var Nt=function(t){if(O)return!1;if(gt+t<0)return!0;if(gt+at+t>dt)return!0;if(M&&t>0){if(!St.current)return!1;var n=St.current.node;if(!n||!n.children.length)return!1;var r=K(yt,n),o=function(t,n){return 0==t?n.offsetLeft:n.offetTop}(yt,n.children[gt]),i=F(yt,n).length;if(i!==r&&i+o>=r)return!0}return!1},It=(0,t.useRef)(4),Tt=(0,t.useMemo)((function(){return"always"!==w&&!W&&("never"===w||3===It.current)}),[w,W]),Pt=E((0,t.useState)("rtl"===C),2),Gt=Pt[0],Dt=Pt[1];return(0,t.useLayoutEffect)((function(){if(jt.current&&C===J){var t=jt.current.ownerDocument;t&&Dt(function(t){return"rtl"==(t.body.getAttribute("dir")||t.documentElement.getAttribute("dir")||"ltr")}(t))}}),[C,Dt]),(0,t.createElement)(t.ContainWrapper,L({size:!0,layout:!0,paint:!0,contentStyle:{display:"flex",direction:Gt?"rtl":"ltr"},ref:jt,onFocus:function(t){N&&N(t),It.current=1},onMouseEnter:function(t){P&&P(t),It.current=2},onTouchStart:function(t){U&&U(t),It.current=3},tabindex:"0",wrapperClassName:"carousel-d626044",contentRef:Ot},ct),!Tt&&(0,t.createElement)(T,{advance:Et,as:l,by:-a,disabled:Nt(-1),outsetArrows:W,rtl:Gt}),(0,t.createElement)(q,{advanceCount:a,alignment:rt,axis:yt,lightboxGroup:j&&"carousel"+kt,loop:O,mixedLength:M,onClick:B,restingIndex:gt,setRestingIndex:Rt,snap:tt,snapBy:it,ref:St,visibleCount:M?1:at,_thumbnails:ut},st.map((function(n,r){var o=n.props,i=o.alt,e=o["aria-label"];return(0,t.createElement)(t.WithAmpContext,{caption:i||e,key:r,renderable:r==gt,playable:r==gt},(0,t.cloneElement)(n,L(L({},n.props),{},{thumbnailSrc:void 0})))}))),!Tt&&(0,t.createElement)(T,{advance:Lt,by:a,as:u,disabled:Nt(1),outsetArrows:W,rtl:Gt}))}));tt.displayName="BentoBaseCarousel";var nt=["animation","children","closeButtonAs","onAfterClose","onAfterOpen","onBeforeOpen"],rt={"fade-in":[{opacity:0,visibility:"visible"},{opacity:1,visibility:"visible"}],"fly-in-top":[{opacity:0,transform:"translate(0,-100%)",visibility:"visible"},{opacity:1,transform:"translate(0, 0)",visibility:"visible"}],"fly-in-bottom":[{opacity:0,transform:"translate(0, 100%)",visibility:"visible"},{opacity:1,transform:"translate(0, 0)",visibility:"visible"}]},ot={"part":"scroller"},it=(0,t.forwardRef)((function(n,r){var o=n.animation,i=void 0===o?"fade-in":o,e=n.children,a=n.closeButtonAs,l=n.onAfterClose,u=n.onAfterOpen,c=n.onBeforeOpen,s=R(n,nt),d=E((0,t.useState)(!1),2),f=d[0],p=d[1],b=E((0,t.useState)(!1),2),v=b[0],h=b[1],m=(0,t.useRef)(),g=(0,t.useValueRef)(i),x=(0,t.useValueRef)(c),w=(0,t.useValueRef)(l),y=(0,t.useValueRef)(u);return(0,t.useImperativeHandle)(r,(function(){return{open:function(){var t;null===(t=x.current)||void 0===t||t.call(x),p(!0),h(!0)},close:function(){return h(!1)}}}),[x]),(0,t.useLayoutEffect)((function(){var t=m.current;if(t){var n;if(A(t,"visibility",v?"hidden":"visible"),v){var r=function(){var n;A(t,"opacity",1),A(t,"visibility","visible"),function(t){try{t.focus()}catch(t){}}(t),null===(n=y.current)||void 0===n||n.call(y)};if(!t.animate)return void r();(n=t.animate(rt[g.current],{duration:200,fill:"both",easing:"ease-in"})).onfinish=r}else{var o=function(){A(t,"opacity",0),A(t,"visibility","hidden"),w.current&&w.current(),n=null,p(!1)};if(!t.animate)return void o();(n=t.animate(rt[g.current],{duration:200,direction:"reverse",fill:"both",easing:"ease-in"})).onfinish=o}return function(){n&&n.cancel()}}}),[v,g,w,y]),f&&(0,t.createElement)(t.ContainWrapper,L({ref:m,size:!0,layout:!0,paint:!0,part:"lightbox",contentClassName:"content-213f9e3",wrapperClassName:"wrapper-213f9e3",contentProps:ot,role:"dialog",tabindex:"0",onKeyDown:function(t){"Escape"===t.key&&h(!1)}},s),(0,t.createElement)(et,{as:a,onClick:function(){return h(!1)}}),e)}));function et(n){var r=n.onClick,o=n.as,i=void 0===o?at:o;return(0,t.createElement)(i,{"aria-label":"Close the modal",onClick:r})}function at(n){var r=n["aria-label"],o=n.onClick;return(0,t.createElement)("button",{"aria-label":r,class:"close-button-213f9e3",onClick:o,tabindex:-1})}it.displayName="Lightbox";var lt=(0,t.createContext)({deregister:function(){},register:function(){},open:function(){}}),ut="default",ct="auto",st="clip",dt={"aria-label":"Toggle caption expanded state.","role":"button"},ft=(0,t.forwardRef)((function(n,r){var o=n.children,i=n.onAfterClose,e=n.onAfterOpen,a=n.onBeforeOpen,l=n.onToggleCaption,u=n.onViewGrid,c=n.render,s=S,d=(0,t.useRef)(null),f=(0,t.useRef)(null),p=E((0,t.useState)(0),2),b=p[0],v=p[1],h=(0,t.useRef)({}),m=(0,t.useRef)({}),g=(0,t.useRef)({}),x=(0,t.useRef)({}),w=(0,t.useRef)({}),y=E((0,t.useState)(!0),2),k=y[0],A=y[1],C=E((0,t.useState)(!0),2),z=C[0],M=C[1],B=E((0,t.useState)(null),2),R=B[0],N=B[1],T=(0,t.useCallback)((function(n){var r=null!=n?n:Object.keys(h.current)[0];r&&(x.current[r]||(x.current[r]=[],w.current[r]=[],g.current[r]=0),h.current[r].forEach((function(n,o){if(!x.current[r][o]){var i=g.current[r];x.current[r][o]=n(),w.current[r][o]=(0,t.createElement)(ht,{onClick:function(){A(!0),v(i)},render:n}),g.current[r]+=1}})),N(r))}),[]),P=(0,t.useCallback)((function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ut,r=arguments.length>2?arguments[2]:void 0,o=arguments.length>3?arguments[3]:void 0;h.current[n]||(h.current[n]=[],m.current[n]=[]),h.current[n][t-1]=r,m.current[n][t-1]=o}),[]),G=(0,t.useCallback)((function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ut;delete h.current[n][t-1],delete m.current[n][t-1],delete x.current[n][t-1],g.current[n]--}),[]),D=(0,t.useCallback)((function(t,n){var r;T(n),M(!0),A(!0),null!=t&&v(t),null===(r=d.current)||void 0===r||r.open()}),[T]),Y={deregister:G,register:P,open:D},F=(0,t.useRef)(void 0),Z=E((0,t.useState)(null),2),U=Z[0],$=Z[1],_=E((0,t.useState)(ct),2),V=_[0],K=_[1];return(0,t.useLayoutEffect)((function(){var t;if(null===(t=f.current)||void 0===t||t.goToSlide(b),R){var n=h.current[R].length-g.current[R]+I(b,g.current[R]);$(m.current[R][n]),K(ct)}}),[R,b]),(0,t.useLayoutEffect)((function(){var t,n=null!==(t=F.current)&&void 0!==t?t:{},r=n.offsetHeight;n.scrollHeight>r+40&&K(st)}),[U]),(0,t.useImperativeHandle)(r,(function(){return{open:D,close:function(){var t;null===(t=d.current)||void 0===t||t.close()}}}),[D]),(0,t.createElement)(t.Fragment,null,(0,t.createElement)(it,{class:"lightbox-066b665"+(z?" show-controls-066b665":"")+(z?"":" hide-controls-066b665"),closeButtonAs:pt,onBeforeOpen:a,onAfterOpen:e,onAfterClose:i,ref:d},(0,t.createElement)("div",{class:"controls-panel-066b665"},(0,t.createElement)(vt,{onClick:function(){k&&(null==u||u()),A(!k)},showCarousel:k})),(0,t.createElement)(tt,{arrowPrevAs:bt,arrowNextAs:bt,class:O,defaultSlide:I(b,g.current[R])||0,hidden:!k,loop:!0,onClick:function(){return M(!z)},onSlideChange:function(t){return v(t)},ref:f},x.current[R]),(0,t.createElement)("div",L({hidden:!k,class:"caption-066b665 "+j+" "+s[V],ref:F},V===ct?null:L({onClick:function(){null==l||l(),K(V===st?"expanded":st)}},dt)),(0,t.createElement)("div",{class:"caption-text-066b665 amp-lightbox-gallery-caption",part:"caption"},U)),!k&&(0,t.createElement)("div",{class:O+" grid-066b665"},w.current[R])),(0,t.createElement)(lt.Provider,{value:Y},c?c():o))}));function pt(n){var r=n.onClick;return(0,t.createElement)("svg",{"aria-label":"Close the lightbox",class:j+" "+z+" close-button-066b665",onClick:r,role:"button",tabindex:"0",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,t.createElement)("path",{d:"M6.4 6.4 L17.6 17.6 Z M17.6 6.4 L6.4 17.6 Z",stroke:"#fff","stroke-width":"2","stroke-linejoin":"round"}))}function bt(n){var r=n["aria-disabled"],o=n.by,i=n.disabled,e=n.onClick;return(0,t.createElement)("svg",{"aria-disabled":r,class:"arrow-066b665 "+j+(o<0?" prev-arrow-066b665":"")+(o>0?" next-arrow-066b665":""),disabled:i,onClick:e,role:"button",tabindex:"0",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,t.createElement)("path",{d:o<0?"M14,7.4 L9.4,12 L14,16.6":"M10,7.4 L14.6,12 L10,16.6",fill:"none",stroke:"#fff","stroke-width":"2","stroke-linejoin":"round","stroke-linecap":"round"}))}function vt(n){var r=n.onClick,o=n.showCarousel;return(0,t.createElement)("svg",{"aria-label":o?"Switch to grid view":"Switch to carousel view",class:j+" "+z,onClick:r,role:"button",tabindex:"0",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},o?(0,t.createElement)("g",{fill:"#fff"},(0,t.createElement)("rect",{x:"3",y:"3",width:"6",height:"8",rx:"1",ry:"1"}),(0,t.createElement)("rect",{x:"15",y:"13",width:"6",height:"8",rx:"1",ry:"1"}),(0,t.createElement)("rect",{x:"11",y:"3",width:"10",height:"8",rx:"1",ry:"1"}),(0,t.createElement)("rect",{x:"3",y:"13",width:"10",height:"8",rx:"1",ry:"1"})):(0,t.createElement)(t.Fragment,null,(0,t.createElement)("rect",{x:"4",y:"4",width:"16",height:"16",rx:"1","stroke-width":"2",stroke:"#fff",fill:"none"}),(0,t.createElement)("circle",{fill:"#fff",cx:"15.5",cy:"8.5",r:"1.5"}),(0,t.createElement)("polygon",{fill:"#fff",points:"5,19 5,13 8,10 13,15 16,12 19,15 19,19"})))}function ht(n){var r=n.onClick,o=n.render;return(0,t.createElement)("div",{"aria-label":"View in carousel",class:"thumbnail-066b665",onClick:r,role:"button",tabindex:"0"},o())}ft.displayName="BentoLightboxGalleryProvider";var mt=["alt","aria-label","as","caption","children","enableActivation","group","onMount","render","srcset"],gt=N(),xt={"aria-label":"Open content in a lightbox view.",role:"button",tabIndex:0},wt=function(n){return(0,t.cloneElement)(n)};function yt(n){var r=n.alt,o=n["aria-label"],i=n.as,e=void 0===i?"div":i,a=n.caption,l=n.children,u=n.enableActivation,c=void 0===u||u,s=n.group,d=n.onMount,f=n.render,p=n.srcset,b=R(n,mt),v=E((0,t.useState)(gt),1)[0],h=(0,t.useContext)(lt),m=h.deregister,g=h.open,x=h.register,w=(0,t.useCallback)((function(){return f?f():l?t.Children.map(l,wt):(0,t.createElement)(e,{srcset:p})}),[l,f,p,e]),y=(0,t.useMemo)((function(){return a||r||o}),[r,o,a]);(0,t.useLayoutEffect)((function(){return x(v,s,w,y),function(){return m(v,s)}}),[y,v,s,m,x,w]),(0,t.useLayoutEffect)((function(){return null==d?void 0:d(Number(v)-1)}),[v,d]);var k=(0,t.useMemo)((function(){return c&&L(L({},xt),{},{onClick:function(){g(Number(v)-1,s)}})}),[c,v,s,g]);return(0,t.createElement)(e,L(L({},k),{},{srcset:p},b),l)}var kt=["AMP-IMG","IMG"],At=["AMP-BASE-CAROUSEL[lightbox]","AMP-STREAM-GALLERY[lightbox]","BENTO-BASE-CAROUSEL[lightbox]","BENTO-STREAM-GALLERY[lightbox]"],Ct="lightbox",St=0,jt=function(t){!function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),r&&n(t,r)}(u,t);var o,e,a=(o=u,e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,n=r(o);if(e){var a=r(this).constructor;t=Reflect.construct(n,arguments,a)}else t=n.apply(this,arguments);return i(this,t)});function u(t){var n;return(n=a.call(this,t)).xD=!1,n}var c=u.prototype;return c.mountCallback=function(){var t;St++&&(console.warn("".concat(this.element.tagName," already exists in the document. Removing additional instance: ").concat(this.element)),null===(t=this.element.parentNode)||void 0===t||t.removeChild(this.element))},c.init=function(){var t=this,n=function(t,n){var r=[];return l(t.querySelectorAll(kt)).forEach((function(o){o.hasAttribute(Ct)&&r.push(Ot("default",t,o,n))})),l(t.querySelectorAll(At)).forEach((function(o,i){var e=o.getAttribute(Ct)||"carousel"+i;l(o.children).forEach((function(o,i){return r.push(Ot(e,t,o,n,i))}))})),r}(this.element.ownerDocument,(function(n,r){return t.api().open(n,r)}));return{"onBeforeOpen":function(){return t.beforeOpen()},"onAfterOpen":function(){return t.afterOpen()},"onAfterClose":function(){return t.afterClose()},"onViewGrid":function(){return t.onViewGrid()},"onToggleCaption":function(){return t.onToggleCaption()},"render":function(){return n}}},c.unmountCallback=function(){St--},c.beforeOpen=function(){this.xD=!0,v(this.element,"open",!0),C(this.element,!0)},c.afterOpen=function(){},c.afterClose=function(){this.xD=!1,v(this.element,"open",!1),C(this.element,!1)},c.onViewGrid=function(){},c.onToggleCaption=function(){},c.mutationObserverCallback=function(){var t=this.element.hasAttribute("open");t!==this.xD&&(this.xD=t,t?this.api().open():this.api().close())},u}(t.PreactBaseElement);function Ot(n,r,o,i,e){var a=o.getAttribute(Ct)||n,l=zt(o)?o:function(t,n){for(var r=t.firstElementChild;r;r=r.nextElementSibling)if(n(r))return r;return null}(o,zt);return(0,t.createElement)(yt,{group:a,as:"img",caption:Mt(r,l),onMount:function(t){var n=function(){return i(null!=e?e:t,a)};return o.addEventListener("click",n),function(){o.removeEventListener("click",n)}},srcset:m(l).stringify()})}function zt(t){return-1!==kt.indexOf(t.tagName)}function Mt(t,n){var r,o=function(t,n){return t.closest?t.closest(n):function(t,n,r){var o;for(o=t;o&&undefined!==o;o=o.parentElement)if(n(o))return o;return null}(t,(function(t){return function(t,n){var r=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector;return!!r&&r.call(t,"figure")}(t)}))}(n,"figure");if(o){var i=function(t,n){return f(/^[\w-]+$/.test(n)),t.querySelector(n)}(o,"figcaption");if(i)return i.textContent}var e=n.getAttribute("aria-describedby");if(e){var a=t.getElementById(e);if(a)return a.textContent}var l=n.getAttribute("aria-labelledby");if(l){var u=t.getElementById(l);if(u)return u.innerText}return null!==(r=n.getAttribute("alt"))&&void 0!==r?r:n.getAttribute("aria-label")}jt.Component=ft,jt.usesShadowDom=!0,jt.shadowCss="@keyframes keyframes-fade-in-066b665{0%{opacity:0}to{opacity:1;visibility:visible}}@keyframes keyframes-fade-out-066b665{0%{opacity:1}to{opacity:0;visibility:hidden}}.arrow-066b665{top:0!important;width:40px;bottom:0!important;filter:drop-shadow(0 0 1px black)!important;height:40px;margin:auto!important;padding:20px}.arrow-066b665.next-arrow-066b665{left:auto!important;right:0!important}.arrow-066b665.prev-arrow-066b665{left:0!important;right:auto!important}.caption-066b665{color:#fff;bottom:0;overflow:hidden;box-sizing:border-box!important;max-height:calc(80px + 3rem)!important;transition:max-height 0.3s ease-out!important;padding-top:40px!important;text-shadow:1px 0 5px rgba(0,0,0,0.4)!important;pointer-events:none!important}.caption-066b665.auto-066b665{cursor:auto!important}.caption-066b665.clip-066b665{-webkit-mask-image:linear-gradient(0deg,transparent 0rem,rgba(0,0,0,0.2) 1rem,rgba(0,0,0,0.55) 2rem,#000 3rem);mask-image:linear-gradient(0deg,transparent 0rem,rgba(0,0,0,0.2) 1rem,rgba(0,0,0,0.55) 2rem,#000 3rem)}.caption-066b665.expanded-066b665{-webkit-mask-image:linear-gradient(0deg,transparent 0rem,rgba(0,0,0,0.2) 0.5rem,rgba(0,0,0,0.55) 1rem,#000 2rem);mask-image:linear-gradient(0deg,transparent 0rem,rgba(0,0,0,0.2) 0.5rem,rgba(0,0,0,0.55) 1rem,#000 2rem);max-height:100%!important;overflow-y:auto!important;transition:max-height 0.7s ease-in-out!important;-webkit-overflow-scrolling:touch!important}.caption-text-066b665{padding:20px!important;pointer-events:all!important}.caption-text-066b665:empty{display:none!important}.close-button-066b665{top:0;right:0}.control-066b665{cursor:pointer!important;z-index:2;position:absolute!important;box-sizing:content-box;animation-duration:400ms;animation-fill-mode:forwards}.controls-panel-066b665{width:100%!important;height:56px!important;z-index:1;position:absolute!important;background:linear-gradient(rgba(0,0,0,0.3),transparent)}@media (min-width:1024px){.controls-panel-066b665{height:80px!important}}.lightbox-066b665.show-controls-066b665 .control-066b665{animation-name:keyframes-fade-in-066b665;animation-timing-function:ease-in}.lightbox-066b665.hide-controls-066b665 .control-066b665{animation-name:keyframes-fade-out-066b665;animation-timing-function:linear}.gallery-066b665{top:0!important;left:0!important;right:0!important;width:100%;bottom:0!important;height:100%;overflow:auto!important;position:absolute!important}.grid-066b665{top:56px!important;width:calc(100% - 10px)!important;height:calc(100% - 56px)!important;display:grid!important;padding:0px 5px!important;grid-gap:5px!important;grid-auto-rows:-webkit-min-content!important;grid-auto-rows:min-content!important;-ms-flex-pack:center!important;justify-content:center!important;grid-template-columns:repeat(3,1fr)}@media (min-width:1024px){.grid-066b665{top:80px!important;height:calc(100% - 80px)!important;grid-template-columns:repeat(4,249.75px)}}.thumbnail-066b665{position:relative!important;padding-top:100%!important}.thumbnail-066b665>img{top:0!important;width:100%!important;cursor:pointer!important;height:100%!important;position:absolute!important;-o-object-fit:cover!important;object-fit:cover!important}.top-control-066b665{width:24px;height:24px;padding:16px}@media (min-width:1024px){.top-control-066b665{width:40px;height:40px;padding:20px}}.close-button-213f9e3{top:0;left:0;width:2px;border:none;height:2px;margin:0;display:block;opacity:0;padding:0;overflow:hidden;position:fixed;visibility:visible}.wrapper-213f9e3{top:0;left:0;color:#fff;right:0;width:100%;bottom:0;height:100%;z-index:1000;position:fixed;box-sizing:border-box;background-color:rgba(0,0,0,0.9)}.content-213f9e3{overflow:auto!important;-ms-scroll-chaining:none!important;overscroll-behavior:none!important}.carousel-d626044{-ms-scroll-chaining:none;overscroll-behavior:contain}.scroll-container-d626044{width:100%;height:100%;display:-ms-flexbox;display:flex;outline:none;position:relative;-ms-flex-positive:1;flex-grow:1;-ms-flex-wrap:nowrap;flex-wrap:nowrap;box-sizing:content-box!important;scroll-behavior:smooth;-webkit-overflow-scrolling:touch}.hide-scrollbar-d626044{scrollbar-width:none}.hide-scrollbar-d626044::-webkit-scrollbar{display:none;box-sizing:content-box!important}.horizontal-scroll-d626044{overflow-x:auto;overflow-y:hidden;-ms-touch-action:pan-x pinch-zoom;touch-action:pan-x pinch-zoom;-ms-flex-direction:row;flex-direction:row;scroll-snap-type:x mandatory;scroll-snap-type-x:mandatory}.horizontal-scroll-d626044.hide-scrollbar-d626044{padding-bottom:20px}.vertical-scroll-d626044{overflow-x:hidden;-ms-touch-action:pan-y pinch-zoom;touch-action:pan-y pinch-zoom;-ms-flex-direction:column;flex-direction:column;scroll-snap-type:y mandatory;scroll-snap-type-y:mandatory}.slide-element-d626044{display:-ms-flexbox;display:flex;overflow:hidden;position:relative;-ms-flex-align:center;align-items:center;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}.enable-snap-d626044{scroll-snap-stop:always}.enable-snap-d626044.start-align-d626044{scroll-snap-align:start}.enable-snap-d626044.center-align-d626044{scroll-snap-align:center}.disable-snap-d626044{scroll-snap-stop:none;scroll-snap-align:none;scroll-snap-coordinate:none}.slide-sizing-d626044>::slotted(*),.slide-sizing-d626044>:first-child{margin:0!important;max-width:100%;box-sizing:border-box!important;max-height:100%;-ms-flex-negative:0!important;flex-shrink:0!important}.slide-sizing-d626044>::slotted(*){width:100%}.slide-sizing-d626044.thumbnails-d626044{padding:0px 4px}.arrow-d626044{top:50%;display:-ms-flexbox;display:flex;z-index:1;-ms-flex-align:center;align-items:center;-ms-flex-direction:row;flex-direction:row;pointer-events:auto;-ms-flex-pack:justify;justify-content:space-between}.arrow-d626044.ltr-d626044{transform:translateY(-50%)}.arrow-d626044.rtl-d626044{transform:scaleX(-1) translateY(-50%)}.arrow-d626044.arrow-next-d626044.rtl-d626044,.arrow-d626044.arrow-prev-d626044.ltr-d626044{left:0}.arrow-d626044.arrow-next-d626044.ltr-d626044,.arrow-d626044.arrow-prev-d626044.rtl-d626044{right:0}.arrow-disabled-d626044{pointer-events:none}.arrow-disabled-d626044.inset-arrow-d626044{opacity:0}.arrow-disabled-d626044.outset-arrow-d626044{opacity:0.5}.inset-arrow-d626044{padding:12px;position:absolute}.outset-arrow-d626044{top:50%;height:100%;position:relative;transform:translateY(-50%);-ms-flex-align:center;align-items:center;-ms-flex-negative:0;flex-shrink:0;border-radius:50%;pointer-events:auto;background-size:24px 24px}.outset-arrow-d626044.arrow-prev-d626044{margin-inline-end:10px;margin-inline-start:4px}.outset-arrow-d626044.arrow-next-d626044{margin-inline-end:4px;margin-inline-start:10px}.default-arrow-button-d626044{color:#fff;width:36px;border:none;height:36px;stroke:currentColor;display:-ms-flexbox;display:flex;outline:none;padding:0;position:relative;transition:stroke 200ms;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:transparent}.default-arrow-button-d626044:hover:not([disabled]){color:#222}.default-arrow-button-d626044:active:not([disabled]){transition-duration:0ms}.default-arrow-button-d626044:hover:not([disabled]) .arrow-background-d626044{background-color:hsla(0,0%,100%,0.8)}.default-arrow-button-d626044:active:not([disabled]) .arrow-background-d626044{background-color:#fff;transition-duration:0ms}.default-arrow-button-d626044:focus{border:1px solid #000;box-shadow:0 0 0 1pt #fff;border-radius:50%}.arrow-base-style-d626044{top:0;left:0;width:100%;height:100%;position:absolute;border-radius:50%}.arrow-frosting-d626044{-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}.arrow-backdrop-d626044{opacity:0.5;-webkit-backdrop-filter:blur(12px) invert(1) grayscale(0.6) brightness(0.8);backdrop-filter:blur(12px) invert(1) grayscale(0.6) brightness(0.8)}.arrow-background-d626044{box-shadow:inset 0 0 0px 1px rgba(0,0,0,0.08),0 1px 4px 1px rgba(0,0,0,0.2);transition:background-color 200ms;background-color:rgba(0,0,0,0.3)}.arrow-icon-d626044{width:24px;height:24px;position:relative}",(0,t.defineBentoElement)("bento-lightbox-gallery",jt,undefined)}))}();
//# sourceMappingURL=bento-lightbox-gallery-1.0.js.map