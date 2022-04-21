;
var t={carousel:"carousel-d626044",scrollContainer:"scroll-container-d626044",hideScrollbar:"hide-scrollbar-d626044",horizontalScroll:"horizontal-scroll-d626044",verticalScroll:"vertical-scroll-d626044",slideElement:"slide-element-d626044",thumbnails:"thumbnails-d626044",startAlign:"start-align-d626044",centerAlign:"center-align-d626044",enableSnap:"enable-snap-d626044",disableSnap:"disable-snap-d626044",slideSizing:"slide-sizing-d626044",arrow:"arrow-d626044",ltr:"ltr-d626044",rtl:"rtl-d626044",arrowPrev:"arrow-prev-d626044",arrowNext:"arrow-next-d626044",arrowDisabled:"arrow-disabled-d626044",insetArrow:"inset-arrow-d626044",outsetArrow:"outset-arrow-d626044",defaultArrowButton:"default-arrow-button-d626044",arrowBaseStyle:"arrow-base-style-d626044",arrowFrosting:"arrow-frosting-d626044",arrowBackdrop:"arrow-backdrop-d626044",arrowBackground:"arrow-background-d626044",arrowIcon:"arrow-icon-d626044"};function o(t){return t?Array.prototype.slice.call(t):[]}function r(t,o){const r=[];let n=0;for(let e=0;e<t.length;e++){const i=t[e];o(i,e,t)?r.push(i):(n<e&&(t[n]=i),n++)}return n<t.length&&(t.length=n),r}var{hasOwnProperty:n,toString:e}=Object.prototype;function i(t){return 1==(null==(o=t)?void 0:o.nodeType)?(t=t).tagName.toLowerCase()+(t.id?`#${t.id}`:""):t;var o}function a(t,o,r,n,e,i,a,l,s,c,d){return t}function l(t,o,n,e,a,l,s,c,d,u,p){return function(t,o,n="Assertion failed",e){var a,l;if(o)return o;t&&-1==n.indexOf(t)&&(n+=t);let s=3;const c=n.split("%s");let d=c.shift();const u=[d];for(;c.length;){const t=arguments[s++],o=c.shift();d+=i(t)+o,u.push(t,o.trim())}const p=new Error(d);throw p.messageArray=r(u,(t=>""!==t)),null===(a=(l=self).__AMP_REPORT_ERROR)||void 0===a||a.call(l,p),p}("​​​",t,o,n,e,a,l,s,c,d,u,p)}function s(t){return(t.ownerDocument||t).defaultView}function c(t,o,r){const n=t.hasAttribute(o),e=void 0!==r?r:!n;return e!==n&&(e?t.setAttribute(o,""):t.removeAttribute(o)),e}var d=/(\S+)(?:\s+(?:(-?\d+(?:\.\d+)?)([a-zA-Z]*)))?\s*(?:,|$)/g;function u(t){const o=t.getAttribute("srcset");if(o)return function(t){const o=[];let r;for(;r=d.exec(t);){const t=r[1];let n,e;if(r[2]){const t=r[3].toLowerCase();if("w"==t)n=parseInt(r[2],10);else{if("x"!=t)continue;e=parseFloat(r[2])}}else e=1;o.push({url:t,width:n,dpr:e})}return new b(o)}(o);const r=t.getAttribute("src");return l(r,'Either non-empty "srcset" or "src" attribute must be specified: %s',t),new b([{url:r,width:void 0,dpr:1}])}var p,b=class{constructor(t){l(t.length>0,"Srcset must have at least one source"),this.kw=t;let o=!1,r=!1;for(let n=0;n<t.length;n++){const e=t[n];o=o||!!e.width,r=r||!!e.dpr}l(!(o===r),"Srcset must have width or dpr sources, but not both"),t.sort(o?f:m),this.jw=o}select(t,o){a(t),a(o);let r=0;return r=this.jw?this.Ow(t*o):this.Tw(o),this.kw[r].url}Ow(t){const o=this.kw;let r=0,n=1/0,e=1/0;for(let a=0;a<o.length;a++){var i;const l=null!==(i=o[a].width)&&void 0!==i?i:0,s=Math.abs(l-t);if(!(s<=1.1*n||t/e>1.2))break;r=a,n=s,e=l}return r}Tw(t){const o=this.kw;let r=0,n=1/0;for(let e=0;e<o.length;e++){const i=Math.abs(o[e].dpr-t);if(!(i<=n))break;r=e,n=i}return r}getUrls(){return this.kw.map((t=>t.url))}stringify(t){const o=[],r=this.kw;for(let n=0;n<r.length;n++){const e=r[n];let i=e.url;t&&(i=t(i)),this.jw?i+=` ${e.width}w`:i+=` ${e.dpr}x`,o.push(i)}return o.join(", ")}};function f(t,o){return l(t.width!=o.width,"Duplicate width: %s",t.width),t.width-o.width}function m(t,o){return l(t.dpr!=o.dpr,"Duplicate dpr: %s",t.dpr),t.dpr-o.dpr}var h=["Webkit","webkit","Moz","moz","ms","O","o"];function g(t,o,r,n,e){const i=function(t,o,r){if(o.startsWith("--"))return o;p||(p=Object.create(null));let n=p[o];if(!n||r){if(n=o,void 0===t[o]){const r=function(t){return t.charAt(0).toUpperCase()+t.slice(1)}(o),e=function(t,o){for(let r=0;r<h.length;r++){const n=h[r]+o;if(void 0!==t[n])return n}return""}(t,r);void 0!==t[e]&&(n=e)}r||(p[o]=n)}return n}(t.style,o,e);if(!i)return;const a=n?r+n:r;t.style.setProperty(function(t){const o=t.replace(/[A-Z]/g,(t=>"-"+t.toLowerCase()));return h.some((t=>o.startsWith(t+"-")))?`-${o}`:o}(i),a)}function x(t,o){void 0===o&&(o=t.hasAttribute("hidden")),o?t.removeAttribute("hidden"):t.setAttribute("hidden","")}import{createElement as w}from"../bento.mjs";import{PreactBaseElement as v}from"../bento.mjs";var y={arrow:"arrow-066b665",auto:"auto-066b665",caption:"caption-066b665",captionText:"caption-text-066b665",clip:"clip-066b665",closeButton:"close-button-066b665",control:"control-066b665",controlsPanel:"controls-panel-066b665",expanded:"expanded-066b665",hideControls:"hide-controls-066b665",lightbox:"lightbox-066b665",gallery:"gallery-066b665",grid:"grid-066b665",nextArrow:"next-arrow-066b665",prevArrow:"prev-arrow-066b665",showControls:"show-controls-066b665",thumbnail:"thumbnail-066b665",topControl:"top-control-066b665"},k="control-066b665";function C(t,o,r){return o in t?Object.defineProperty(t,o,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[o]=r,t}function A(t,o){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);o&&(n=n.filter((function(o){return Object.getOwnPropertyDescriptor(t,o).enumerable}))),r.push.apply(r,n)}return r}function j(t){for(var o=1;o<arguments.length;o++){var r=null!=arguments[o]?arguments[o]:{};o%2?A(Object(r),!0).forEach((function(o){C(t,o,r[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):A(Object(r)).forEach((function(o){Object.defineProperty(t,o,Object.getOwnPropertyDescriptor(r,o))}))}return t}function S(t,o){if(null==t)return{};var r,n,e={},i=Object.keys(t);for(n=0;n<i.length;n++)r=i[n],o.indexOf(r)>=0||(e[r]=t[r]);return e}function O(){let t=0;return()=>String(++t)}function M(t,o){return t>0&&o>0?t%o:(t%o+o)%o}import{createElement as E}from"../bento.mjs";import{cloneElement as L,useCallback as B,useContext as z,useEffect as R,useImperativeHandle as T,useLayoutEffect as I,useMemo as N,useRef as P,useState as $}from"../bento.mjs";import{Children as G,forwardRef as _}from"../bento.mjs";import{ContainWrapper as V}from"../bento.mjs";import{WithAmpContext as F}from"../bento.mjs";import{createElement as H}from"../bento.mjs";import{useCallback as Y}from"../bento.mjs";import{useCallback as D,useLayoutEffect as U}from"../bento.mjs";import{useAmpContext as Z}from"../bento.mjs";function W({advance:t,as:o=K,by:r,disabled:n,outsetArrows:e,rtl:i}){const a=Y((()=>{n||t()}),[t,n]);return H(o,{"aria-disabled":String(!!n),by:r,class:"arrow-d626044"+(n?" arrow-disabled-d626044":"")+(r<0?" arrow-prev-d626044":"")+(r>0?" arrow-next-d626044":"")+(e?" outset-arrow-d626044":"")+(e?"":" inset-arrow-d626044")+(i?" rtl-d626044":"")+(i?"":" ltr-d626044"),disabled:n,onClick:a,outsetArrows:e,rtl:i.toString()})}function K({"aria-disabled":t,by:o,disabled:r,onClick:n,"class":e}){return H("div",{class:e},H("button",{"aria-disabled":t,"aria-label":o<0?"Previous item in carousel":"Next item in carousel",class:"default-arrow-button-d626044",disabled:r,onClick:n},H("div",{class:"arrow-base-style-d626044 arrow-frosting-d626044"}),H("div",{class:"arrow-base-style-d626044 arrow-backdrop-d626044"}),H("div",{class:"arrow-base-style-d626044 arrow-background-d626044"}),H("svg",{class:"arrow-icon-d626044",viewBox:"0 0 24 24"},H("path",{d:o<0?"M14,7.4 L9.4,12 L14,16.6":"M10,7.4 L14.6,12 L10,16.6",fill:"none","stroke-width":"2px","stroke-linejoin":"round","stroke-linecap":"round"}))))}import{createContext as X}from"../bento.mjs";var q=X({slides:[],setSlides:t=>{}}),J={START:"start",CENTER:"center"},Q={HORIZONTAL:"horizontal",VERTICAL:"vertical"};function tt(t,o){const{bottom:r,height:n,left:e,right:i,top:a,width:l}=o.getBoundingClientRect();return{start:Math.round(0==t?e:a),end:Math.round(0==t?i:r),length:Math.round(0==t?l:n)}}function ot(t,o){const{end:r,start:n}=tt(t,o);return(n+r)/2}function rt(t,o){const{start:r}=tt(t,o);return r}function nt(t,o,r){return o==J.START?rt(t,r):ot(t,r)}function et(t,o,r){const{end:n,start:e}=tt(t,o);return e<=r&&r<n}function it(t,o){return 0==t?o.scrollLeft:o.scrollTop}function at(t,o){return 0==t?o.scrollWidth:o.scrollHeight}function lt(t,o,r,n,e=0){const i=o==J.START,{length:a}=tt(t,n),l=i?rt(t,n):ot(t,n),s=i?rt(t,r):ot(t,r),c=Math.round(l-s-e*a);!function(t,o,r){!function(t,o,r){0==t?o.scrollLeft=r:o.scrollTop=r}(t,o,it(t,o)+r)}(t,r,c);const{length:d}=tt(t,r),u=d+it(t,r)+c<at(t,r);return!!c&&u}import{Fragment as st,createElement as ct}from"../bento.mjs";import{useCallback as dt,useImperativeHandle as ut,useLayoutEffect as pt,useMemo as bt,useRef as ft}from"../bento.mjs";import{forwardRef as mt}from"../bento.mjs";var ht=mt((function({_thumbnails:o,advanceCount:r,alignment:n,axis:e,children:i,lightboxGroup:a,loop:l,mixedLength:c,onClick:d,restingIndex:u,setRestingIndex:p,snap:b,snapBy:f=1,visibleCount:m},h){const x=ft(null),w=l?Math.floor(i.length/2):u,v=ft(!1),y=dt((t=>{const o=x.current;o&&(S.current=M(S.current+t,i.length),A.current=0,lt(e,n,o,o.children[M(w+t,o.children.length)],A.current)||p(S.current))}),[n,e,i.length,w,p]);ut(h,(()=>({advance:y,next:()=>y(r),prev:()=>y(-r),get node(){return x.current}})),[y,r]);const k=t,C=ft(u),A=ft(0),j=function({_thumbnails:t,alignment:o,children:r,lightboxGroup:n,loop:e,mixedLength:i,offsetRef:a,pivotIndex:l,restingIndex:s,snap:c,snapBy:d,visibleCount:u},p){const{length:b}=r,f=n?po:"div",m=r.map(((r,e)=>{const a=`slide-${r.key||e}`;return ct(f,{caption:r.props.caption,key:a,"data-slide":e,class:`${p.slideSizing} ${p.slideElement} ${c&&0===M(e,d)?p.enableSnap:p.disableSnap} ${o===J.CENTER?p.centerAlign:p.startAlign} ${t?p.thumbnails:""} `,group:n||void 0,part:"slide",style:{flex:i?"0 0 auto":`0 0 ${100/u}%`}},r)}));if(!e)return m;const h=[],g=[],x=M(b-s+l,b);if(s<=l)for(let t=0;t<x;t++)h.unshift(m.pop());else for(let t=0;t<b-x;t++)g.push(m.shift());return a.current=h.length?h.length:-g.length,ct(st,null,h,m,g)}({alignment:n,children:i,loop:l,mixedLength:c,offsetRef:C,lightboxGroup:a,pivotIndex:w,restingIndex:u,snap:b,snapBy:f,visibleCount:m,_thumbnails:o},k),S=ft(u),O=dt((()=>{if(!x.current||!x.current.children.length)return;const t=x.current;g(t,"scrollBehavior","auto"),v.current=!0,lt(e,n,t,t.children[w],A.current),g(t,"scrollBehavior","smooth")}),[n,e,w]);pt((()=>{x.current&&l&&x.current.children.length&&O()}),[l,u,O]),pt((()=>{if(!x.current)return;const t=x.current;if(!t)return;const o=s(t);if(!o)return;const r=new o.ResizeObserver(O);return r.observe(t),()=>r.disconnect()}),[O]);const E=bt((()=>function(t,o,r){let n=0,e=0,i=null;function a(){n=0;const r=200-(t.Date.now()-e);var l;r>0?n=t.setTimeout(a,r):(l=i,i=null,o.apply(null,l))}return function(...o){e=t.Date.now(),i=o,n||(n=t.setTimeout(a,200))}}(x.current?s(x.current):window,(()=>{null!==S.current&&S.current!==u&&p(S.current)}))),[u,p]);return ct("div",{ref:x,onClick:d,onScroll:()=>{v.current?v.current=!1:((()=>{const t=x.current;if(!t)return;const o=function(t,o,r,n,e){const i=nt(t,o,r);if(et(t,n[e],i))return e;for(let o=1;o<=n.length/2;o++){const r=M(e+o,n.length),a=M(e-o,n.length);if(et(t,n[r],i))return r;if(et(t,n[a],i))return a}}(e,n,t,t.children,w);b||(A.current=function(t,o,r,n){const e=nt(t,o,n),i=nt(t,o,r),{length:a}=tt(t,n);return(e-i)/a}(e,n,t,t.children[o])),S.current=M(o-C.current,i.length)})(),E())},class:"scroll-container-d626044 hide-scrollbar-d626044 "+(0===e?"horizontal-scroll-d626044":"vertical-scroll-d626044"),tabindex:0},j)}));ht.displayName="Scroller";var gt=["advanceCount","arrowPrevAs","arrowNextAs","autoAdvance","autoAdvanceCount","autoAdvanceInterval","autoAdvanceLoops","children","controls","defaultSlide","dir","lightbox","loop","mixedLength","onClick","onFocus","onMouseEnter","onSlideChange","onTouchStart","orientation","outsetArrows","snap","snapAlign","snapBy","visibleCount","_thumbnails"],xt={ALWAYS:"always",NEVER:"never",AUTO:"auto"},wt={LTR:"ltr",RTL:"rtl",AUTO:"auto"},vt=1e3,yt=O(),kt=_((function(t,o){var r,n;let{advanceCount:e=1,arrowPrevAs:i,arrowNextAs:a,autoAdvance:l=!1,autoAdvanceCount:c=1,autoAdvanceInterval:d=vt,autoAdvanceLoops:u=Number.POSITIVE_INFINITY,children:p,controls:b=xt.AUTO,defaultSlide:f=0,dir:m=wt.AUTO,lightbox:h=!1,loop:g,mixedLength:x=!1,onClick:w,onFocus:v,onMouseEnter:y,onSlideChange:k,onTouchStart:C,orientation:A=Q.HORIZONTAL,outsetArrows:O=!1,snap:_=!0,snapAlign:H=J.START,snapBy:Y=1,visibleCount:D=1,_thumbnails:U=!1}=t,Z=S(t,gt);const K=N((()=>G.toArray(p)),[p]),{length:X}=K,ot=z(q),[rt,nt]=$(Math.min(Math.max(f,0),X)),et=null!==(r=ot.currentSlide)&&void 0!==r?r:rt,it=null!==(n=ot.setCurrentSlide)&&void 0!==n?n:nt,lt=U?rt:et,st=U?nt:it,ct=P(lt),dt=A==Q.HORIZONTAL?0:1,[ut]=$(yt);I((()=>{st(et)}),[et,st]);const{setSlides:pt,slides:bt}=ot,ft=P(null),mt=P(null),kt=P(null),Ct=P(0),At=N((()=>Math.max(d,vt)),[d]),jt=B((()=>!(Ct.current+D/X>=u||4!==Lt.current||(g||ct.current+D<X?(ft.current.advance(c),Ct.current+=c/X):(ft.current.advance(-ct.current),Ct.current=Math.ceil(Ct.current)),0))),[c,u,X,g,D]),St=B((()=>ft.current.next()),[]),Ot=B((()=>ft.current.prev()),[]);R((()=>{if(!l||!mt.current)return;const t=s(mt.current),o=t.setInterval((()=>{jt()||t.clearInterval(o)}),At);return()=>t.clearInterval(o)}),[jt,At,l]);const Mt=B((t=>{X<=0||isNaN(t)||(t=g?M(t,X):Math.min(Math.max(t,0),X-1),st(t),ct.current!==t&&(ct.current=t,k&&k(t)))}),[X,g,st,k]);T(o,(()=>({goToSlide:t=>{Lt.current=0,Mt(t)},next:()=>{Lt.current=0,St()},prev:()=>{Lt.current=0,Ot()},get root(){return mt.current},get node(){return kt.current}})),[St,Ot,Mt]),R((()=>{!U&&bt&&bt.length!==K.length&&pt(K)}),[U,K,pt,bt]);const Et=t=>{if(g)return!1;if(lt+t<0)return!0;if(lt+D+t>X)return!0;if(x&&t>0){if(!ft.current)return!1;const t=ft.current.node;if(!t||!t.children.length)return!1;const o=at(dt,t),r=function(t,o){return 0==t?o.offsetLeft:o.offetTop}(dt,t.children[lt]),{length:n}=tt(dt,t);if(n!==o&&n+r>=o)return!0}return!1},Lt=P(4),Bt=N((()=>b!==xt.ALWAYS&&!O&&(b===xt.NEVER||3===Lt.current)),[b,O]),[zt,Rt]=$(m===wt.RTL);return I((()=>{if(!mt.current||m!==wt.AUTO)return;const t=mt.current.ownerDocument;t&&Rt(function(t){return"rtl"==(t.body.getAttribute("dir")||t.documentElement.getAttribute("dir")||"ltr")}(t))}),[m,Rt]),E(V,j({size:!0,layout:!0,paint:!0,contentStyle:{display:"flex",direction:zt?wt.RTL:wt.LTR},ref:mt,onFocus:t=>{v&&v(t),Lt.current=1},onMouseEnter:t=>{y&&y(t),Lt.current=2},onTouchStart:t=>{C&&C(t),Lt.current=3},tabindex:"0",wrapperClassName:"carousel-d626044",contentRef:kt},Z),!Bt&&E(W,{advance:Ot,as:i,by:-e,disabled:Et(-1),outsetArrows:O,rtl:zt}),E(ht,{advanceCount:e,alignment:H,axis:dt,lightboxGroup:h&&"carousel"+ut,loop:g,mixedLength:x,onClick:w,restingIndex:lt,setRestingIndex:Mt,snap:_,snapBy:Y,ref:ft,visibleCount:x?1:D,_thumbnails:U},K.map(((t,o)=>{const{alt:r,"aria-label":n}=t.props;return E(F,{caption:r||n,key:o,renderable:o==lt,playable:o==lt},L(t,j(j({},t.props),{},{thumbnailSrc:void 0})))}))),!Bt&&E(W,{advance:St,by:e,as:a,disabled:Et(1),outsetArrows:O,rtl:zt}))}));kt.displayName="BentoBaseCarousel";import{createElement as Ct}from"../bento.mjs";import{useImperativeHandle as At,useLayoutEffect as jt,useRef as St,useState as Ot}from"../bento.mjs";import{forwardRef as Mt}from"../bento.mjs";import{ContainWrapper as Et,useValueRef as Lt}from"../bento.mjs";var Bt=["animation","children","closeButtonAs","onAfterClose","onAfterOpen","onBeforeOpen"],zt={"fade-in":[{opacity:0,visibility:"visible"},{opacity:1,visibility:"visible"}],"fly-in-top":[{opacity:0,transform:"translate(0,-100%)",visibility:"visible"},{opacity:1,transform:"translate(0, 0)",visibility:"visible"}],"fly-in-bottom":[{opacity:0,transform:"translate(0, 100%)",visibility:"visible"},{opacity:1,transform:"translate(0, 0)",visibility:"visible"}]},Rt={"part":"scroller"},Tt=Mt((function(t,o){let{animation:r="fade-in",children:n,closeButtonAs:e,onAfterClose:i,onAfterOpen:a,onBeforeOpen:l}=t,s=S(t,Bt);const[c,d]=Ot(!1),[u,p]=Ot(!1),b=St(),f=Lt(r),m=Lt(l),h=Lt(i),x=Lt(a);return At(o,(()=>({open:()=>{var t;null===(t=m.current)||void 0===t||t.call(m),d(!0),p(!0)},close:()=>p(!1)})),[m]),jt((()=>{const t=b.current;if(!t)return;let o;if(g(t,"visibility",u?"hidden":"visible"),u){const r=()=>{var o;g(t,"opacity",1),g(t,"visibility","visible"),function(t){try{t.focus()}catch(t){}}(t),null===(o=x.current)||void 0===o||o.call(x)};if(!t.animate)return void r();o=t.animate(zt[f.current],{duration:200,fill:"both",easing:"ease-in"}),o.onfinish=r}else{const r=()=>{g(t,"opacity",0),g(t,"visibility","hidden"),h.current&&h.current(),o=null,d(!1)};if(!t.animate)return void r();o=t.animate(zt[f.current],{duration:200,direction:"reverse",fill:"both",easing:"ease-in"}),o.onfinish=r}return()=>{o&&o.cancel()}}),[u,f,h,x]),c&&Ct(Et,j({ref:b,size:!0,layout:!0,paint:!0,part:"lightbox",contentClassName:"content-213f9e3",wrapperClassName:"wrapper-213f9e3",contentProps:Rt,role:"dialog",tabindex:"0",onKeyDown:t=>{"Escape"===t.key&&p(!1)}},s),Ct(It,{as:e,onClick:()=>p(!1)}),n)}));function It({onClick:t,as:o=Nt}){return Ct(o,{"aria-label":"Close the modal",onClick:t})}function Nt({"aria-label":t,onClick:o}){return Ct("button",{"aria-label":t,class:"close-button-213f9e3",onClick:o,tabindex:-1})}Tt.displayName="Lightbox";import{Fragment as Pt,createElement as $t}from"../bento.mjs";import{useCallback as Gt,useImperativeHandle as _t,useLayoutEffect as Vt,useRef as Ft,useState as Ht}from"../bento.mjs";import{forwardRef as Yt}from"../bento.mjs";import{createContext as Dt}from"../bento.mjs";var Ut=Dt({deregister:()=>{},register:()=>{},open:()=>{}}),Zt={"aria-label":"Toggle caption expanded state.","role":"button"},Wt=Yt((function({children:t,onAfterClose:o,onAfterOpen:r,onBeforeOpen:n,onToggleCaption:e,onViewGrid:i,render:a},l){const s=y,c=Ft(null),d=Ft(null),[u,p]=Ht(0),b=Ft({}),f=Ft({}),m=Ft({}),h=Ft({}),g=Ft({}),[x,w]=Ht(!0),[v,C]=Ht(!0),[A,S]=Ht(null),O=Gt((t=>{const o=null!=t?t:Object.keys(b.current)[0];o&&(h.current[o]||(h.current[o]=[],g.current[o]=[],m.current[o]=0),b.current[o].forEach(((t,r)=>{if(!h.current[o][r]){const n=m.current[o];h.current[o][r]=t(),g.current[o][r]=$t(Jt,{onClick:()=>{w(!0),p(n)},render:t}),m.current[o]+=1}})),S(o))}),[]),E=Gt(((t,o="default",r,n)=>{b.current[o]||(b.current[o]=[],f.current[o]=[]),b.current[o][t-1]=r,f.current[o][t-1]=n}),[]),L=Gt(((t,o="default")=>{delete b.current[o][t-1],delete f.current[o][t-1],delete h.current[o][t-1],m.current[o]--}),[]),B=Gt(((t,o)=>{var r;O(o),C(!0),w(!0),null!=t&&p(t),null===(r=c.current)||void 0===r||r.open()}),[O]),z={deregister:L,register:E,open:B},R=Ft(void 0),[T,I]=Ht(null),[N,P]=Ht("auto");return Vt((()=>{var t;if(null===(t=d.current)||void 0===t||t.goToSlide(u),A){const t=b.current[A].length-m.current[A]+M(u,m.current[A]);I(f.current[A][t]),P("auto")}}),[A,u]),Vt((()=>{var t;const{offsetHeight:o,scrollHeight:r}=null!==(t=R.current)&&void 0!==t?t:{};r>o+40&&P("clip")}),[T]),_t(l,(()=>({open:B,close:()=>{var t;null===(t=c.current)||void 0===t||t.close()}})),[B]),$t(Pt,null,$t(Tt,{class:"lightbox-066b665"+(v?" show-controls-066b665":"")+(v?"":" hide-controls-066b665"),closeButtonAs:Kt,onBeforeOpen:n,onAfterOpen:r,onAfterClose:o,ref:c},$t("div",{class:"controls-panel-066b665"},$t(qt,{onClick:()=>{x&&(null==i||i()),w(!x)},showCarousel:x})),$t(kt,{arrowPrevAs:Xt,arrowNextAs:Xt,class:"gallery-066b665",defaultSlide:M(u,m.current[A])||0,hidden:!x,loop:!0,onClick:()=>C(!v),onSlideChange:t=>p(t),ref:d},h.current[A]),$t("div",j({hidden:!x,class:"caption-066b665 "+k+" "+s[N],ref:R},"auto"===N?null:j({onClick:()=>{null==e||e(),P("clip"===N?"expanded":"clip")}},Zt)),$t("div",{class:"caption-text-066b665 amp-lightbox-gallery-caption",part:"caption"},T)),!x&&$t("div",{class:"gallery-066b665 grid-066b665"},g.current[A])),$t(Ut.Provider,{value:z},a?a():t))}));function Kt({onClick:t}){return $t("svg",{"aria-label":"Close the lightbox",class:k+" top-control-066b665 close-button-066b665",onClick:t,role:"button",tabindex:"0",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},$t("path",{d:"M6.4 6.4 L17.6 17.6 Z M17.6 6.4 L6.4 17.6 Z",stroke:"#fff","stroke-width":"2","stroke-linejoin":"round"}))}function Xt({"aria-disabled":t,by:o,disabled:r,onClick:n}){return $t("svg",{"aria-disabled":t,class:"arrow-066b665 "+k+(o<0?" prev-arrow-066b665":"")+(o>0?" next-arrow-066b665":""),disabled:r,onClick:n,role:"button",tabindex:"0",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},$t("path",{d:o<0?"M14,7.4 L9.4,12 L14,16.6":"M10,7.4 L14.6,12 L10,16.6",fill:"none",stroke:"#fff","stroke-width":"2","stroke-linejoin":"round","stroke-linecap":"round"}))}function qt({onClick:t,showCarousel:o}){return $t("svg",{"aria-label":o?"Switch to grid view":"Switch to carousel view",class:k+" top-control-066b665",onClick:t,role:"button",tabindex:"0",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},o?$t("g",{fill:"#fff"},$t("rect",{x:"3",y:"3",width:"6",height:"8",rx:"1",ry:"1"}),$t("rect",{x:"15",y:"13",width:"6",height:"8",rx:"1",ry:"1"}),$t("rect",{x:"11",y:"3",width:"10",height:"8",rx:"1",ry:"1"}),$t("rect",{x:"3",y:"13",width:"10",height:"8",rx:"1",ry:"1"})):$t(Pt,null,$t("rect",{x:"4",y:"4",width:"16",height:"16",rx:"1","stroke-width":"2",stroke:"#fff",fill:"none"}),$t("circle",{fill:"#fff",cx:"15.5",cy:"8.5",r:"1.5"}),$t("polygon",{fill:"#fff",points:"5,19 5,13 8,10 13,15 16,12 19,15 19,19"})))}function Jt({onClick:t,render:o}){return $t("div",{"aria-label":"View in carousel",class:"thumbnail-066b665",onClick:t,role:"button",tabindex:"0"},o())}Wt.displayName="BentoLightboxGalleryProvider";import{createElement as Qt}from"../bento.mjs";import{cloneElement as to,useCallback as oo,useContext as ro,useLayoutEffect as no,useMemo as eo,useState as io}from"../bento.mjs";import{Children as ao}from"../bento.mjs";var lo=["alt","aria-label","as","caption","children","enableActivation","group","onMount","render","srcset"],so=O(),co={"aria-label":"Open content in a lightbox view.",role:"button",tabIndex:0},uo=t=>to(t);function po(t){let{alt:o,"aria-label":r,as:n="div",caption:e,children:i,enableActivation:a=!0,group:l,onMount:s,render:c,srcset:d}=t,u=S(t,lo);const[p]=io(so),{deregister:b,open:f,register:m}=ro(Ut),h=oo((()=>c?c():i?ao.map(i,uo):Qt(n,{srcset:d})),[i,c,d,n]),g=eo((()=>e||o||r),[o,r,e]);no((()=>(m(p,l,h,g),()=>b(p,l))),[g,p,l,b,m,h]),no((()=>null==s?void 0:s(Number(p)-1)),[p,s]);const x=eo((()=>a&&j(j({},co),{},{onClick:()=>{f(Number(p)-1,l)}})),[a,p,l,f]);return Qt(n,j(j({},x),{},{srcset:d},u),i)}var bo=["AMP-IMG","IMG"],fo=["AMP-BASE-CAROUSEL[lightbox]","AMP-STREAM-GALLERY[lightbox]","BENTO-BASE-CAROUSEL[lightbox]","BENTO-STREAM-GALLERY[lightbox]"],mo=0,ho=class extends v{constructor(t){super(t),this.s$=!1}mountCallback(){var t;mo++&&(console.warn(`${this.element.tagName} already exists in the document. Removing additional instance: ${this.element}`),null===(t=this.element.parentNode)||void 0===t||t.removeChild(this.element))}init(){const t=function(t,r){const n=[];return o(t.querySelectorAll(bo)).forEach((o=>{o.hasAttribute("lightbox")&&n.push(go("default",t,o,r))})),o(t.querySelectorAll(fo)).forEach(((e,i)=>{const a=e.getAttribute("lightbox")||"carousel"+i;o(e.children).forEach(((o,e)=>n.push(go(a,t,o,r,e))))})),n}(this.element.ownerDocument,((t,o)=>this.api().open(t,o)));return{"onBeforeOpen":()=>this.beforeOpen(),"onAfterOpen":()=>this.afterOpen(),"onAfterClose":()=>this.afterClose(),"onViewGrid":()=>this.onViewGrid(),"onToggleCaption":()=>this.onToggleCaption(),"render":()=>t}}unmountCallback(){mo--}beforeOpen(){this.s$=!0,c(this.element,"open",!0),x(this.element,!0)}afterOpen(){}afterClose(){this.s$=!1,c(this.element,"open",!1),x(this.element,!1)}onViewGrid(){}onToggleCaption(){}mutationObserverCallback(){const t=this.element.hasAttribute("open");t!==this.s$&&(this.s$=t,t?this.api().open():this.api().close())}};function go(t,o,r,n,e){const i=r.getAttribute("lightbox")||t,a=xo(r)?r:function(t,o){for(let r=t.firstElementChild;r;r=r.nextElementSibling)if(o(r))return r;return null}(r,xo);return w(po,{group:i,as:"img",caption:wo(o,a),onMount:t=>{const o=()=>n(null!=e?e:t,i);return r.addEventListener("click",o),()=>{r.removeEventListener("click",o)}},srcset:u(a).stringify()})}function xo(t){return-1!==bo.indexOf(t.tagName)}function wo(t,o){var r;const n=function(t,o){return t.closest?t.closest("figure"):function(t,o,r){let n;for(n=t;n&&void 0!==n;n=n.parentElement)if(o(n))return n;return null}(t,(t=>function(t,o){const r=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector;return!!r&&r.call(t,"figure")}(t)))}(o);if(n){const t=function(t,o){return a(/^[\w-]+$/.test(o)),t.querySelector(o)}(n,"figcaption");if(t)return t.textContent}const e=o.getAttribute("aria-describedby");if(e){const o=t.getElementById(e);if(o)return o.textContent}const i=o.getAttribute("aria-labelledby");if(i){const o=t.getElementById(i);if(o)return o.innerText}return null!==(r=o.getAttribute("alt"))&&void 0!==r?r:o.getAttribute("aria-label")}ho.Component=Wt,ho.usesShadowDom=!0,ho.shadowCss="@keyframes keyframes-fade-in-066b665{0%{opacity:0}to{opacity:1;visibility:visible}}@keyframes keyframes-fade-out-066b665{0%{opacity:1}to{opacity:0;visibility:hidden}}.arrow-066b665{top:0!important;width:40px;bottom:0!important;filter:drop-shadow(0 0 1px black)!important;height:40px;margin:auto!important;padding:20px}.arrow-066b665.next-arrow-066b665{left:auto!important;right:0!important}.arrow-066b665.prev-arrow-066b665{left:0!important;right:auto!important}.caption-066b665{color:#fff;bottom:0;overflow:hidden;box-sizing:border-box!important;max-height:calc(80px + 3rem)!important;transition:max-height 0.3s ease-out!important;padding-top:40px!important;text-shadow:1px 0 5px rgba(0,0,0,0.4)!important;pointer-events:none!important}.caption-066b665.auto-066b665{cursor:auto!important}.caption-066b665.clip-066b665{-webkit-mask-image:linear-gradient(0deg,transparent 0rem,rgba(0,0,0,0.2) 1rem,rgba(0,0,0,0.55) 2rem,#000 3rem);mask-image:linear-gradient(0deg,transparent 0rem,rgba(0,0,0,0.2) 1rem,rgba(0,0,0,0.55) 2rem,#000 3rem)}.caption-066b665.expanded-066b665{-webkit-mask-image:linear-gradient(0deg,transparent 0rem,rgba(0,0,0,0.2) 0.5rem,rgba(0,0,0,0.55) 1rem,#000 2rem);mask-image:linear-gradient(0deg,transparent 0rem,rgba(0,0,0,0.2) 0.5rem,rgba(0,0,0,0.55) 1rem,#000 2rem);max-height:100%!important;overflow-y:auto!important;transition:max-height 0.7s ease-in-out!important;-webkit-overflow-scrolling:touch!important}.caption-text-066b665{padding:20px!important;pointer-events:all!important}.caption-text-066b665:empty{display:none!important}.close-button-066b665{top:0;right:0}.control-066b665{cursor:pointer!important;z-index:2;position:absolute!important;box-sizing:content-box;animation-duration:400ms;animation-fill-mode:forwards}.controls-panel-066b665{width:100%!important;height:56px!important;z-index:1;position:absolute!important;background:linear-gradient(rgba(0,0,0,0.3),transparent)}@media (min-width:1024px){.controls-panel-066b665{height:80px!important}}.lightbox-066b665.show-controls-066b665 .control-066b665{animation-name:keyframes-fade-in-066b665;animation-timing-function:ease-in}.lightbox-066b665.hide-controls-066b665 .control-066b665{animation-name:keyframes-fade-out-066b665;animation-timing-function:linear}.gallery-066b665{top:0!important;left:0!important;right:0!important;width:100%;bottom:0!important;height:100%;overflow:auto!important;position:absolute!important}.grid-066b665{top:56px!important;width:calc(100% - 10px)!important;height:calc(100% - 56px)!important;display:grid!important;padding:0px 5px!important;grid-gap:5px!important;grid-auto-rows:-webkit-min-content!important;grid-auto-rows:min-content!important;-ms-flex-pack:center!important;justify-content:center!important;grid-template-columns:repeat(3,1fr)}@media (min-width:1024px){.grid-066b665{top:80px!important;height:calc(100% - 80px)!important;grid-template-columns:repeat(4,249.75px)}}.thumbnail-066b665{position:relative!important;padding-top:100%!important}.thumbnail-066b665>img{top:0!important;width:100%!important;cursor:pointer!important;height:100%!important;position:absolute!important;-o-object-fit:cover!important;object-fit:cover!important}.top-control-066b665{width:24px;height:24px;padding:16px}@media (min-width:1024px){.top-control-066b665{width:40px;height:40px;padding:20px}}.close-button-213f9e3{top:0;left:0;width:2px;border:none;height:2px;margin:0;display:block;opacity:0;padding:0;overflow:hidden;position:fixed;visibility:visible}.wrapper-213f9e3{top:0;left:0;color:#fff;right:0;width:100%;bottom:0;height:100%;z-index:1000;position:fixed;box-sizing:border-box;background-color:rgba(0,0,0,0.9)}.content-213f9e3{overflow:auto!important;-ms-scroll-chaining:none!important;overscroll-behavior:none!important}.carousel-d626044{-ms-scroll-chaining:none;overscroll-behavior:contain}.scroll-container-d626044{width:100%;height:100%;display:-ms-flexbox;display:flex;outline:none;position:relative;-ms-flex-positive:1;flex-grow:1;-ms-flex-wrap:nowrap;flex-wrap:nowrap;box-sizing:content-box!important;scroll-behavior:smooth;-webkit-overflow-scrolling:touch}.hide-scrollbar-d626044{scrollbar-width:none}.hide-scrollbar-d626044::-webkit-scrollbar{display:none;box-sizing:content-box!important}.horizontal-scroll-d626044{overflow-x:auto;overflow-y:hidden;-ms-touch-action:pan-x pinch-zoom;touch-action:pan-x pinch-zoom;-ms-flex-direction:row;flex-direction:row;scroll-snap-type:x mandatory;scroll-snap-type-x:mandatory}.horizontal-scroll-d626044.hide-scrollbar-d626044{padding-bottom:20px}.vertical-scroll-d626044{overflow-x:hidden;-ms-touch-action:pan-y pinch-zoom;touch-action:pan-y pinch-zoom;-ms-flex-direction:column;flex-direction:column;scroll-snap-type:y mandatory;scroll-snap-type-y:mandatory}.slide-element-d626044{display:-ms-flexbox;display:flex;overflow:hidden;position:relative;-ms-flex-align:center;align-items:center;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}.enable-snap-d626044{scroll-snap-stop:always}.enable-snap-d626044.start-align-d626044{scroll-snap-align:start}.enable-snap-d626044.center-align-d626044{scroll-snap-align:center}.disable-snap-d626044{scroll-snap-stop:none;scroll-snap-align:none;scroll-snap-coordinate:none}.slide-sizing-d626044>::slotted(*),.slide-sizing-d626044>:first-child{margin:0!important;max-width:100%;box-sizing:border-box!important;max-height:100%;-ms-flex-negative:0!important;flex-shrink:0!important}.slide-sizing-d626044>::slotted(*){width:100%}.slide-sizing-d626044.thumbnails-d626044{padding:0px 4px}.arrow-d626044{top:50%;display:-ms-flexbox;display:flex;z-index:1;-ms-flex-align:center;align-items:center;-ms-flex-direction:row;flex-direction:row;pointer-events:auto;-ms-flex-pack:justify;justify-content:space-between}.arrow-d626044.ltr-d626044{transform:translateY(-50%)}.arrow-d626044.rtl-d626044{transform:scaleX(-1) translateY(-50%)}.arrow-d626044.arrow-next-d626044.rtl-d626044,.arrow-d626044.arrow-prev-d626044.ltr-d626044{left:0}.arrow-d626044.arrow-next-d626044.ltr-d626044,.arrow-d626044.arrow-prev-d626044.rtl-d626044{right:0}.arrow-disabled-d626044{pointer-events:none}.arrow-disabled-d626044.inset-arrow-d626044{opacity:0}.arrow-disabled-d626044.outset-arrow-d626044{opacity:0.5}.inset-arrow-d626044{padding:12px;position:absolute}.outset-arrow-d626044{top:50%;height:100%;position:relative;transform:translateY(-50%);-ms-flex-align:center;align-items:center;-ms-flex-negative:0;flex-shrink:0;border-radius:50%;pointer-events:auto;background-size:24px 24px}.outset-arrow-d626044.arrow-prev-d626044{margin-inline-end:10px;margin-inline-start:4px}.outset-arrow-d626044.arrow-next-d626044{margin-inline-end:4px;margin-inline-start:10px}.default-arrow-button-d626044{color:#fff;width:36px;border:none;height:36px;stroke:currentColor;display:-ms-flexbox;display:flex;outline:none;padding:0;position:relative;transition:stroke 200ms;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:transparent}.default-arrow-button-d626044:hover:not([disabled]){color:#222}.default-arrow-button-d626044:active:not([disabled]){transition-duration:0ms}.default-arrow-button-d626044:hover:not([disabled]) .arrow-background-d626044{background-color:hsla(0,0%,100%,0.8)}.default-arrow-button-d626044:active:not([disabled]) .arrow-background-d626044{background-color:#fff;transition-duration:0ms}.default-arrow-button-d626044:focus{border:1px solid #000;box-shadow:0 0 0 1pt #fff;border-radius:50%}.arrow-base-style-d626044{top:0;left:0;width:100%;height:100%;position:absolute;border-radius:50%}.arrow-frosting-d626044{-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}.arrow-backdrop-d626044{opacity:0.5;-webkit-backdrop-filter:blur(12px) invert(1) grayscale(0.6) brightness(0.8);backdrop-filter:blur(12px) invert(1) grayscale(0.6) brightness(0.8)}.arrow-background-d626044{box-shadow:inset 0 0 0px 1px rgba(0,0,0,0.08),0 1px 4px 1px rgba(0,0,0,0.2);transition:background-color 200ms;background-color:rgba(0,0,0,0.3)}.arrow-icon-d626044{width:24px;height:24px;position:relative}";import{defineBentoElement as vo}from"../bento.mjs";vo("bento-lightbox-gallery",ho,void 0);
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */
//# sourceMappingURL=bento-lightbox-gallery-1.0.mjs.map