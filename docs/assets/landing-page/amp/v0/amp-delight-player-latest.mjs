;
(self.AMP=self.AMP||[]).push({m:1,v:"2203281422000",n:"amp-delight-player",ev:"0.1",l:!0,f:function(t,i){(()=>{function i(t,i){(null==i||i>t.length)&&(i=t.length);for(var n=0,e=new Array(i);n<i;n++)e[n]=t[n];return e}function n(t,n){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(e)return(e=e.call(t)).next.bind(e);if(Array.isArray(t)||(e=function(t,n){if(t){if("string"==typeof t)return i(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?i(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){e&&(t=e);var s=0;return function(){return s>=t.length?{done:!0}:{done:!1,value:t[s++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var e;function s(){return e||(e=Promise.resolve(void 0))}var r=class{constructor(){this.promise=new Promise(((t,i)=>{this.resolve=t,this.reject=i}))}};function o(t){return new Promise((i=>{i(t())}))}var{isArray:a}=Array;function l(t,i){const n=t.indexOf(i);return-1!=n&&(t.splice(n,1),!0)}var{hasOwnProperty:h,toString:u}=Object.prototype;function c(t){return"[object Object]"===u.call(t)}function d(t){const i=Object.create(null);return t&&Object.assign(i,t),i}function f(t){return"number"==typeof t&&isFinite(t)}function m(t,i,n,e,s,r,o,a,l,h,u){return t}function p(t,i){try{return function(t){return JSON.parse(t)}(t)}catch(t){return null==i||i(t),null}}function v(t){return(t.ownerDocument||t).defaultView}var _={bubbles:!0,cancelable:!0};function g(t){var i;null===(i=t.parentElement)||void 0===i||i.removeChild(t)}function y(t,i,n,e){const s=n||{};m(t.ownerDocument);const r=t.ownerDocument.createEvent("Event");r.data=s;const{bubbles:o,cancelable:a}=e||_;r.initEvent(i,o,a),t.dispatchEvent(r)}function P(t,i){t.classList.add("i-amphtml-fill-content"),i&&t.classList.add("i-amphtml-replaced-content")}function A(t,i,n={}){const{needsRootBounds:e,rootMargin:s,threshold:r}=n,o=function(t){return t.parent&&t.parent!=t}(i)&&(e||s)?i.document:void 0;return new i.IntersectionObserver(t,{threshold:r,root:o,rootMargin:s})}var b,w,M=new WeakMap,E=new WeakMap;function x(t){const i=new Set;for(let n=t.length-1;n>=0;n--){const e=t[n],{target:s}=e;if(i.has(s))continue;i.add(s);const r=E.get(s);if(r)for(let t=0;t<r.length;t++)(0,r[t])(e)}}function R(t){const i=t.ownerDocument||t;return b&&b.ownerDocument===i||(b=i.createElement("div")),I}function I(t){return function(t,i){m(1===i.length),t.innerHTML=i[0];const n=t.firstElementChild;return m(n),m(!n.nextElementSibling),t.removeChild(n),n}(b,t)}function T(t){const i=Object.getOwnPropertyDescriptor(t,"message");if(null!=i&&i.writable)return t;const{message:n,stack:e}=t,s=new Error(n);for(const i in t)s[i]=t[i];return s.stack=e,s}function V(t){let i=null,e="";for(var s,r=n(arguments,!0);!(s=r()).done;){const t=s.value;t instanceof Error&&!i?i=T(t):(e&&(e+=" "),e+=t)}return i?e&&(i.message=e+": "+i.message):i=new Error(e),i}function k(t){var i,n;null===(i=(n=self).__AMP_REPORT_ERROR)||void 0===i||i.call(n,t)}function S(t,...i){try{return t.apply(null,i)}catch(t){!function(t){const i=V.apply(null,arguments);setTimeout((()=>{throw k(i),i}))}(t)}}function C(t){const i=V.apply(null,arguments);return i.expected=!0,i}function q(t,...i){k(C.apply(null,i))}var O=["Webkit","webkit","Moz","moz","ms","O","o"],j={"getPropertyPriority":()=>"","getPropertyValue":()=>""};function z(t,i,n,e,s){const r=function(t,i,n){if(i.startsWith("--"))return i;w||(w=d());let e=w[i];if(!e||n){if(e=i,void 0===t[i]){const n=function(t){return t.charAt(0).toUpperCase()+t.slice(1)}(i),s=function(t,i){for(let n=0;n<O.length;n++){const e=O[n]+i;if(void 0!==t[e])return e}return""}(t,n);void 0!==t[s]&&(e=s)}n||(w[i]=e)}return e}(t.style,i,s);if(!r)return;const o=e?n+e:n;t.style.setProperty(function(t){const i=t.replace(/[A-Z]/g,(t=>"-"+t.toLowerCase()));return O.some((t=>i.startsWith(t+"-")))?`-${i}`:i}(r),o)}var F=/vertical/,$=new WeakMap,L=new WeakMap,Y=new WeakMap;function W(t){let i=$.get(t);return i||(i=new t.ResizeObserver(N),$.set(t,i)),i}function N(t){const i=new Set;for(let n=t.length-1;n>=0;n--){const e=t[n],{target:s}=e;if(i.has(s))continue;i.add(s);const r=L.get(s);if(r){Y.set(s,e);for(let t=0;t<r.length;t++){const{callback:i,type:n}=r[t];D(n,i,e)}}}}function D(t,i,n){if(0==t){const{contentRect:t}=n,{height:e,width:s}=t;S(i,{width:s,height:e})}else if(1==t){const{borderBoxSize:t}=n;let e;if(t)e=t.length>0?t[0]:{inlineSize:0,blockSize:0};else{const{target:t}=n,i=v(t),s=F.test(function(t,i){return t.getComputedStyle(i)||j}(i,t).writingMode),{offsetHeight:r,offsetWidth:o}=t;let a,l;s?(l=o,a=r):(a=o,l=r),e={inlineSize:a,blockSize:l}}S(i,e)}}var H=self.AMP_CONFIG||{},U=("string"==typeof H.thirdPartyFrameRegex?new RegExp(H.thirdPartyFrameRegex):H.thirdPartyFrameRegex,("string"==typeof H.cdnProxyRegex?new RegExp(H.cdnProxyRegex):H.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/);function B(t){if(!self.document||!self.document.head)return null;if(self.location&&U.test(self.location.origin))return null;const i=self.document.head.querySelector(`meta[name="${t}"]`);return i&&i.getAttribute("content")||null}function J(t){let i=!1,n=null,e=t;return(...t)=>(i||(n=e.apply(self,t),i=!0,e=null),n)}H.thirdPartyUrl,H.thirdPartyFrameHost,H.cdnUrl||B("runtime-host"),H.errorReportingUrl,H.betaErrorReportingUrl,H.localDev,H.geoApiUrl||B("amp-geo-api"),self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null};var Z=self.__AMP_LOG;function G(t){return Z.user||(Z.user=K()),function(t,i){return i&&i.ownerDocument.defaultView!=t}(Z.user.win,t)?Z.userForEmbed||(Z.userForEmbed=K()):Z.user}function K(t){return function(t,i){throw new Error("failed to call initLogConstructor")}()}function Q(t,i,n,e,s,r,o,a,l,h,u){return t}function X(t,i,n,e,s,r,o,a,l,h,u){return G().assert(t,i,n,e,s,r,o,a,l,h,u)}function tt(t,i){return at(t=function(t){return t.__AMP_TOP||(t.__AMP_TOP=t)}(t),i)}function it(t,i){return at(ot(rt(t)),i)}function nt(t,i){const n=ot(rt(t));return ut(n,i)?at(n,i):null}function et(t,i){return function(t,i){const n=lt(t,i);if(n)return n;const e=ht(t);return e[i]=function(){const t=new r,{promise:i,reject:n,resolve:e}=t;return i.catch((()=>{})),{obj:null,promise:i,resolve:e,reject:n,context:null,ctor:null}}(),e[i].promise}(ot(t),i)}function st(t,i){return lt(ot(t),i)}function rt(t){return t.nodeType?(i=v(t),tt(i,"ampdoc")).getAmpDoc(t):t;var i}function ot(t){const i=rt(t);return i.isSingleDoc()?i.win:i}function at(t,i){Q(ut(t,i));const n=ht(t)[i];return n.obj||(Q(n.ctor),Q(n.context),n.obj=new n.ctor(n.context),Q(n.obj),n.context=null,n.resolve&&n.resolve(n.obj)),n.obj}function lt(t,i){const n=ht(t)[i];return n?n.promise?n.promise:(at(t,i),n.promise=Promise.resolve(n.obj)):null}function ht(t){let i=t.__AMP_SERVICES;return i||(i=t.__AMP_SERVICES={}),i}function ut(t,i){const n=t.__AMP_SERVICES&&t.__AMP_SERVICES[i];return!(!n||!n.ctor)}var ct,dt,ft,mt=t=>nt(t,"action"),pt=t=>tt(t,"platform"),vt=t=>at(t,"timer"),_t=t=>function(t,i,n,e){const s=st(t,i);if(s)return s;const r=rt(t);return r.whenExtensionsKnown().then((()=>{const t=r.getExtensionVersion(n);return t?tt(r.win,"extensions").waitForExtension(n,t):null})).then((n=>n?e?st(t,i):et(t,i):null))}(t,"consentPolicyManager","amp-consent"),gt=t=>nt(t,"url"),yt=t=>it(t,"viewport");function Pt(t){var i;let n=null===(i=ct)||void 0===i?void 0:i.get(t);if(!n){const i=function(t){ct||(ct=new WeakMap,dt=new WeakMap),m(dt);let i=dt.get(t);return i||(i=A((t=>{const n=new Set;for(let s=t.length-1;s>=0;s--){var e;const{target:r}=t[s];n.has(r)||(n.add(r),m(i),i.unobserve(r),m(ct),null===(e=ct.get(r))||void 0===e||e.resolve(t[s]),ct.delete(r))}}),t,{needsRootBounds:!0}),dt.set(t,i)),i}(v(t));m(ct),i.observe(t),n=new r,ct.set(t,n)}return n.promise}function At(t){return null==t.__AMP_AUTOPLAY&&(t.__AMP_AUTOPLAY=function(t){const i=t.document.createElement("video");var n;return i.setAttribute("muted",""),i.setAttribute("playsinline",""),i.setAttribute("webkit-playsinline",""),i.setAttribute("height","0"),i.setAttribute("width","0"),i.muted=!0,i.playsInline=!0,i.playsinline=!0,i.webkitPlaysinline=!0,function(t,i){for(const n in i)z(t,n,i[n])}(i,{position:"fixed",top:"0",width:"0",height:"0",opacity:"0"}),n=i,o((()=>n.play())).catch((()=>{})),Promise.resolve(!i.paused)}(t)),t.__AMP_AUTOPLAY}function bt(t){return t.querySelector("video, iframe")}function wt(t,i){const n=o((()=>t.play(!!i)));return n.catch((t=>{q(0,t)})),n}function Mt(t,i,n,e){let s=t,r=n,o=t=>{try{return r(t)}catch(t){var i,n;throw null===(i=(n=self).__AMP_REPORT_ERROR)||void 0===i||i.call(n,t),t}};const a=function(){if(void 0!==ft)return ft;ft=!1;try{const t={get capture(){return ft=!0,!1}};self.addEventListener("test-options",null,t),self.removeEventListener("test-options",null,t)}catch(t){}return ft}(),l=!(null==e||!e.capture);return s.addEventListener(i,o,a?e:l),()=>{null==s||s.removeEventListener(i,o,a?e:l),r=null,s=null,o=null}}function Et(t,i,n,e){const s={detail:n};return Object.assign(s,e),new t.CustomEvent(i,s)}function xt(t,i,n,e){return Mt(t,i,n,e)}function Rt(t){return t.data}function It(t,i,n,e){let s=n;const r=Mt(t,i,(t=>{try{s(t)}finally{s=null,r()}}),e);return r}var Tt=class{constructor(){this.m_=!1,this.v_=new class{constructor(){this.Tt=null}add(t){return this.Tt||(this.Tt=[]),this.Tt.push(t),()=>{this.remove(t)}}remove(t){this.Tt&&l(this.Tt,t)}removeAll(){this.Tt&&(this.Tt.length=0)}fire(t){if(this.Tt)for(var i,e=n(this.Tt.slice(),!0);!(i=e()).done;)(0,i.value)(t)}getHandlerCount(){var t,i;return null!==(t=null===(i=this.Tt)||void 0===i?void 0:i.length)&&void 0!==t?t:0}}}onSessionEnd(t){this.v_.add(t)}beginSession(){this.m_=!0}endSession(){this.m_&&this.v_.fire(),this.m_=!1}isSessionActive(){return this.m_}},Vt=['<button aria-label="Unmute video" class="i-amphtml-video-mask i-amphtml-fill-content" tabindex=0></button>'],kt=["<i-amphtml-video-icon class=amp-video-eq><div class=amp-video-eq-col><div class=amp-video-eq-filler></div><div class=amp-video-eq-filler></div></div></i-amphtml-video-icon>"];function St(t,i,n){if(i[n])return i[n];const e=t.querySelector(`style[${n}], link[${n}]`);return e?(i[n]=e,e):null}function Ct(t,i){const n=t.styleSheets;for(let t=0;t<n.length;t++)if(n[t].ownerNode==i)return!0;return!1}var qt={"title":"","artist":"","album":"","artwork":[{"src":""}]},Ot="registered",jt="load",zt="playing",Ft="pause",$t="ended",Lt="muted",Yt="unmuted",Wt="ad_start",Nt="ad_end",Dt="amp:video:tick",Ht="playing_manual",Ut="paused",Bt="video-play",Jt="user-interacted";function Zt(t){t.signals().signal(Jt)}var Gt="video-manager",Kt=(t,i)=>!!t&&(t.video===i||t.video.element===i);function Qt(t,i){const n=i.top+i.height/2,e=t.getSize().height/2;return Math.abs(n-e)}function Xt(t){return 10*t*5}var ti=t=>!!t&&!isNaN(t)&&t>1;function ii(t,i,n){const{video:e}=t;t.getAnalyticsDetails().then((t=>{n&&Object.assign(t,n),y(e.element,i,t)}))}function ni(t){!function(t,i,n,e){const r=rt(t),o=ot(r);!function(t,i,n,e,s,r){const o=ht(t);let a=o[n];a||(a=o[n]={obj:null,promise:null,resolve:null,reject:null,context:null,ctor:null,sharedInstance:!1}),a.ctor||(a.ctor=e,a.context=i,a.sharedInstance=!1,a.resolve&&at(t,n))}(o,r,i,class{constructor(t){this.ampdoc=t,this.installAutoplayStyles=J((()=>function(t){!function(t,i,n,e,s){const r=t.getHeadNode(),o=function(t,i,n,e){let s=t.__AMP_CSS_SM;s||(s=t.__AMP_CSS_SM=d());const r=!n&&e&&"amp-custom"!=e&&"amp-keyframes"!=e,o=n?"amp-runtime":r?`amp-extension=${e}`:null;if(o){const n=St(t,s,o);if(n)return"STYLE"==n.tagName&&n.textContent!==i&&(n.textContent=i),n}const a=(t.ownerDocument||t).createElement("style");a.textContent=i;let l=null;return n?a.setAttribute("amp-runtime",""):r?(a.setAttribute("amp-extension",e||""),l=St(t,s,"amp-runtime")):(e&&a.setAttribute(e,""),l=t.lastChild),function(t,i,n=null){if(!n)return void function(t,i){t.insertBefore(i,t.firstChild)}(t,i);const e=n.nextSibling;t.insertBefore(i,e)}(t,a,l),o&&(s[o]=a),a}(r,function(t,i){const n=t.__AMP_CSS_TR;return n?n(i):i}(r,i),e||!1,s||null);if(n){const i=t.getRootNode();if(Ct(i,o))return n(o),o;const e=setInterval((()=>{Ct(i,o)&&(clearInterval(e),n(o))}),4)}}(t,".i-amphtml-video-mask{display:block;z-index:1;-webkit-appearance:none;appearance:none;background:transparent;border:none}.amp-video-eq{display:none}.i-amphtml-video-interface:not(amp-video) .amp-video-eq,amp-story .amp-video-eq,amp-video[controls] .amp-video-eq{display:-ms-flexbox;display:flex}[noaudio] .amp-video-eq{display:none!important}.amp-video-eq{pointer-events:none!important;-ms-flex-align:end;align-items:flex-end;bottom:7px;height:12px;opacity:0.8;overflow:hidden;position:absolute;right:7px;width:20px;z-index:1}.amp-video-eq-col{-ms-flex:1;flex:1;height:100%;margin-right:1px;position:relative}.amp-video-eq-col div{animation-name:amp-video-eq-animation;animation-timing-function:linear;animation-iteration-count:infinite;animation-direction:alternate;background-color:#fafafa;height:100%;position:absolute;width:100%;will-change:transform;animation-play-state:paused}.amp-video-eq-play .amp-video-eq-col div{animation-play-state:running}.amp-video-eq-1-1{animation-duration:0.3s;transform:translateY(60%)}.amp-video-eq-1-2{animation-duration:0.45s;transform:translateY(60%)}.amp-video-eq-2-1{animation-duration:0.5s;transform:translateY(30%)}.amp-video-eq-2-2{animation-duration:0.4s;transform:translateY(30%)}.amp-video-eq-3-1{animation-duration:0.3s;transform:translateY(70%)}.amp-video-eq-3-2{animation-duration:0.35s;transform:translateY(70%)}.amp-video-eq-4-1{animation-duration:0.4s;transform:translateY(50%)}.amp-video-eq-4-2{animation-duration:0.25s;transform:translateY(50%)}@keyframes amp-video-eq-animation{0%{transform:translateY(100%)}to{transform:translateY(0)}}\n/*# sourceURL=/css/video-autoplay.css*/",null,!1,"amp-video-autoplay")}(this.ampdoc))),this.__=null,this.g_=null,this.y_=null,this.Ee=vt(t.win),this.A_=mt(t.getHeadNode()),this.P_=()=>this.b_(),this.M_=J((()=>new class{constructor(t,i){this.E_=i,this.Ci=t,this.I_=null,this.R_=null,this.__=[],this.T_=[],this.V_=()=>this.w_(),this.k_=t=>this.C_(t)==Ht,this.q_=(t,i)=>this.x_(t,i),this.S_(),this.O_()}dispose(){this.T_.forEach((t=>t())),this.T_.length=0}register(t){const{video:i}=t,{element:n}=i;this.j_(n)&&(this.__.push(i),xt(n,Ft,this.V_),xt(n,zt,this.V_),xt(n,$t,this.V_),i.signals().whenSignal(Jt).then(this.V_),this.w_())}O_(){const t=this.Ci.getRootNode(),i=()=>this.F_();this.T_.push(xt(t,"webkitfullscreenchange",i),xt(t,"mozfullscreenchange",i),xt(t,"fullscreenchange",i),xt(t,"MSFullscreenChange",i))}isInLandscape(){return(t=this.Ci.win).screen&&"orientation"in t.screen?t.screen.orientation.type.startsWith("landscape"):90==Math.abs(t.orientation);var t}j_(t){if("video"==bt(t).tagName.toLowerCase())return!0;const i=pt(this.Ci.win);return!i.isIos()&&!i.isSafari()||function(t){return!!{"amp-dailymotion":!0,"amp-ima-video":!0}[t.tagName.toLowerCase()]}(t)}F_(){this.I_=null}S_(){const{win:t}=this.Ci,{screen:i}=t;if(i&&"orientation"in i){const t=i.orientation;this.T_.push(xt(t,"change",(()=>this.L_())))}this.T_.push(xt(t,"orientationchange",(()=>this.L_())))}L_(){this.isInLandscape()?null!=this.R_&&this.Y_(this.R_):this.I_&&this.U_(this.I_)}Y_(t){const i=pt(this.Ci.win);this.I_=t,i.isAndroid()&&i.isChrome()?t.fullscreenEnter():this.z_(t).then((()=>t.fullscreenEnter()))}U_(t){this.I_=null,this.z_(t,"center").then((()=>t.fullscreenExit()))}z_(t,i=null){const{element:n}=t,e=this.N_();return this.D_().then((()=>Pt(n))).then((({boundingClientRect:t})=>{const{bottom:r,top:o}=t,a=e.getSize().height;if(o>=0&&r<=a)return s();const l=i||(r>a?"bottom":"top");return e.animateScrollIntoView(n,l)}))}N_(){return yt(this.Ci)}D_(){return vt(this.Ci.win).promise(330)}w_(){if(this.isInLandscape())return Promise.resolve(this.R_);this.R_=null;const t=this.__.filter(this.k_).map((t=>Pt(t.element)));return Promise.all(t).then((t=>{const i=t.sort(this.q_)[0];return i&&i.intersectionRatio>.5?i.target.getImpl().then((t=>this.R_=t)):this.R_}))}x_(t,i){const{boundingClientRect:n,intersectionRatio:e}=t,{boundingClientRect:s,intersectionRatio:r}=i,o=e-r;if(Math.abs(o)>.1)return o;const a=yt(this.Ci),l=Qt(a,n),h=Qt(a,s);return l<h||l>h?l-h:n.top-s.top}C_(t){return this.E_.getPlayingState(t)}}(this.ampdoc,this))),this.Ee.delay(this.P_,1e3)}dispose(){if(this.M_().dispose(),this.g_.disconnect(),this.g_=null,this.__)for(let t=0;t<this.__.length;t++)this.__[t].dispose()}b_(){for(let t=0;t<this.__.length;t++){const i=this.__[t];i.getPlayingState()!==Ut&&(ii(i,"video-seconds-played"),this.W_(i))}this.Ee.delay(this.P_,1e3)}W_(t){const i="timeUpdate",n=t.video.getCurrentTime(),e=t.video.getDuration();if(f(n)&&f(e)&&e>0){const s=n/e,r=Et(this.ampdoc.win,`${Gt}.${i}`,{"time":n,"percent":s});this.A_.trigger(t.video.element,i,r,1)}}register(t){Q(t);const i=t;if(this.B_(t),!t.supportsPlatform())return;if(this.J_(t))return;if(!this.g_){const t=t=>t.forEach((({isIntersecting:t,target:i})=>{this.Z_(i).updateVisibility(t)}));this.g_=A(t,this.ampdoc.win,{threshold:.5})}this.g_.observe(i.element),xt(i.element,"reloaded",(()=>n.videoLoaded())),this.__=this.__||[];const n=new class{constructor(t,i){this.E_=t,this.Ci=t.ampdoc,this.video=i,this.G_=!0,this.H_=!1,this.mf=!1,this.K_=!1,this.es=!1,this.Q_=new Tt,this.Q_.onSessionEnd((()=>ii(this,"video-session"))),this.X_=new Tt,this.X_.onSessionEnd((()=>ii(this,"video-session-visible"))),this.vg=J((()=>new class{constructor(t,i){this.Ee=vt(t),this.yg=i,this.T_=null,this.Ag=0,this.Pg=0}start(){const{element:t}=this.yg.video;this.stop(),this.T_=this.T_||[],this.bg()?this.Eg(this.Pg):this.T_.push(It(t,"loadedmetadata",(()=>{this.bg()&&this.Eg(this.Pg)}))),this.T_.push(xt(t,$t,(()=>{this.bg()&&this.Ig(100)})))}stop(){if(this.T_){for(;this.T_.length>0;)this.T_.pop()();this.Pg++}}bg(){const{video:t}=this.yg,i=t.getDuration();if(!ti(i))return!1;if(Xt(i)<250){const i=Math.ceil(5);this.Rg("This video is too short for `video-percentage-played`. Reports may be innacurate. For best results, use videos over",i,"seconds long.",t.element)}return!0}Rg(...t){G().warn.apply(G(),[Gt].concat(t))}Eg(t){if(t!=this.Pg)return;const{yg:i,Ee:n}=this,{video:e}=i,s=()=>this.Eg(t);if(i.getPlayingState()==Ut)return void n.delay(s,500);const r=e.getDuration();if(!ti(r))return void n.delay(s,500);const o=(h=Xt(r),m(!0),Math.min(Math.max(h,250),4e3)),a=e.getCurrentTime()/r*100,l=5*Math.floor(a/5);var h;Q(f(l)),this.Ig(l),n.delay(s,o)}Ig(t){t<=0||this.Ag!=t&&(this.Ag=t,this.Tg(t))}Tg(t){ii(this.yg,"video-percentage-played",{"normalizedPercentage":t.toString()})}}(this.Ci.win,this))),this.Vg=!1,this.kg=!1,this.Cg=null,this.Z=!1,this.qg=!1,this.hasAutoplay=i.element.hasAttribute("autoplay"),this.hasAutoplay&&this.E_.installAutoplayStyles(),this.xg=qt,this.Sg=()=>{wt(this.video,!1)},this.Og=()=>{this.video.pause()},xt(i.element,jt,(()=>this.videoLoaded())),xt(i.element,Ft,(()=>this.$g())),xt(i.element,"play",(()=>{this.qg=!0,ii(this,Bt)})),xt(i.element,zt,(()=>this.jg())),xt(i.element,Lt,(()=>this.Z=!0)),xt(i.element,Yt,(()=>{this.Z=!1,this.E_.pauseOtherVideos(this)})),xt(i.element,Dt,(t=>{const i=Rt(t),n=i.eventType;n&&this.Fg(n,i.vars)})),xt(i.element,$t,(()=>{this.K_=!1,ii(this,"video-ended")})),xt(i.element,Wt,(()=>{this.K_=!0,ii(this,"video-ad-start")})),xt(i.element,Nt,(()=>{this.K_=!1,ii(this,"video-ad-end")})),i.signals().whenSignal(Ot).then((()=>this.Lg())),this.Yg=J((()=>{const t="firstPlay",i=Et(this.Ci.win,t,{}),{element:n}=this.video;mt(n).trigger(n,t,i,1)})),this.Ug()}dispose(){this.vg().stop()}Fg(t,i){const n={"__amp:eventType":t};Object.keys(i).forEach((t=>{n[`custom_${t}`]=i[t]})),ii(this,"video-hosted-custom",n)}Ug(){this.video.signals().whenSignal("playback-delegated").then((()=>{this.G_=!1,this.mf&&this.video.pause()}))}isMuted(){return this.Z}isPlaybackManaged(){return this.G_}Lg(){this.zg()&&this.E_.registerForAutoFullscreen(this),this.hasAutoplay&&this.Ng()}zg(){const{element:t}=this.video;return!(this.video.preimplementsAutoFullscreen()||!t.hasAttribute("rotate-to-fullscreen"))&&X(this.video.isInteractive(),"Only interactive videos are allowed to enter fullscreen on rotate. Set the `controls` attribute on %s to enable.",t)}jg(){this.mf=!0,this.getPlayingState()==Ht&&(this.Yg(),this.E_.pauseOtherVideos(this));const{video:t}=this,{element:i}=t;t.preimplementsMediaSessionAPI()||i.classList.contains("i-amphtml-disable-mediasession")||(function(t,i){const n=gt(t);if(i&&i.artwork){const{artwork:t}=i;Q(a(t)),t.forEach((t=>{if(t){const i=c(t)?t.src:t;X(n.isProtocolValid(i))}}))}}(i,this.xg),function(t,i,n,e){const{navigator:s}=t;"mediaSession"in s&&t.MediaMetadata&&(s.mediaSession.metadata=new t.MediaMetadata(qt),s.mediaSession.metadata=new t.MediaMetadata(i),s.mediaSession.setActionHandler("play",n),s.mediaSession.setActionHandler("pause",e))}(this.Ci.win,this.xg,this.Sg,this.Og)),this.Q_.beginSession(),this.es&&this.X_.beginSession(),this.qg||ii(this,Bt)}$g(){ii(this,"video-pause"),this.mf=!1,this.kg?this.kg=!1:this.Q_.endSession()}videoLoaded(){this.H_=!0,this.Cg=bt(this.video.element),this.Dg(),this.vg().start(),this.es&&this.Wg()}Dg(){if(this.video.preimplementsMediaSessionAPI())return;this.video.getMetadata()&&(this.xg=d(this.video.getMetadata()));const t=this.Ci.win.document;if(!this.xg.artwork||0==this.xg.artwork.length){const i=function(t){const i=t.querySelector('script[type="application/ld+json"]');if(!i)return;const n=p(i.textContent);return n&&n.image?"string"==typeof n.image?n.image:n.image["@list"]&&"string"==typeof n.image["@list"][0]?n.image["@list"][0]:"string"==typeof n.image.url?n.image.url:"string"==typeof n.image[0]?n.image[0]:void 0:void 0}(t)||function(t){const i=t.querySelector('meta[property="og:image"]');return i?i.getAttribute("content"):void 0}(t)||function(t){const i=t.querySelector('link[rel="shortcut icon"]')||t.querySelector('link[rel="icon"]');return i?i.getAttribute("href"):void 0}(t);i&&(this.xg.artwork=[{"src":i}])}if(!this.xg.title){const i=this.video.element.getAttribute("title")||this.video.element.getAttribute("aria-label")||this.Cg.getAttribute("title")||this.Cg.getAttribute("aria-label")||t.title;i&&(this.xg.title=i)}}Bg(){this.H_&&this.Wg()}Wg(){this.Ci.isVisible()&&At(this.Ci.win).then((t=>{this.hasAutoplay&&!this.userInteracted()&&t?this.Jg():this.Zg()}))}Ng(){this.video.isInteractive()&&this.video.hideControls(),At(this.Ci.win).then((t=>{t||!this.video.isInteractive()?(this.video.mute(),this.Gg()):this.video.showControls()}))}Gg(){const{video:t}=this,{element:i,win:n}=this.video;if(i.hasAttribute("noaudio")||i.signals().get(Jt))return;const e=function(t,i){const n=R(i)(kt),e=n.firstElementChild;for(let t=0;t<4;t++){const i=e.cloneNode(!0),s=i.children;for(let i=0;i<s.length;i++)s[i].classList.add(`amp-video-eq-${t+1}-${i+1}`);n.appendChild(i)}return g(e),n}(0,i),s=[e];function r(i){t.mutateElementSkipRemeasure((()=>{s.forEach((t=>{!function(t,i){void 0===i&&(i=t.hasAttribute("hidden")),i?t.removeAttribute("hidden"):t.setAttribute("hidden","")}(t,i)}))}))}function o(i){t.mutateElementSkipRemeasure((()=>e.classList.toggle("amp-video-eq-play",i)))}const a=[xt(i,Ft,(()=>o(!1))),xt(i,zt,(()=>o(!0))),xt(i,Wt,(()=>{r(!1),t.showControls()})),xt(i,Nt,(()=>{r(!0),t.hideControls()})),xt(i,Yt,(()=>Zt(t)))];if(t.isInteractive()){t.hideControls();const n=function(t,i){const n=R(t)(Vt);return i&&i.title&&n.setAttribute("aria-label",i.title),n}(i,this.xg);s.push(n),a.push(xt(n,"click",(()=>Zt(t))))}t.mutateElementSkipRemeasure((()=>{s.forEach((t=>{i.appendChild(t)}))})),this.K_&&r(!1),t.signals().whenSignal(Jt).then((()=>{this.Yg(),t.isInteractive()&&t.showControls(),t.unmute(),a.forEach((t=>{t()})),t.mutateElementSkipRemeasure((()=>{s.forEach((t=>{g(t)}))}))}))}Jg(){this.G_&&(this.es?(this.X_.beginSession(),wt(this.video,!0),this.Vg=!0):(this.mf&&this.X_.endSession(),this.video.pause(),this.kg=!0))}Zg(){this.es?this.X_.beginSession():this.mf&&this.X_.endSession()}updateVisibility(t){const i=this.es;this.es=t,t!=i&&this.Bg()}getPlayingState(){return this.mf?this.mf&&this.Vg&&!this.userInteracted()?"playing_auto":Ht:Ut}isRollingAd(){return this.K_}userInteracted(){return null!=this.video.signals().get(Jt)}getAnalyticsDetails(){const{video:t}=this;return Promise.all([At(this.Ci.win),Pt(t.element)]).then((i=>{const n=i[0],e=i[1],{height:s,width:r}=e.boundingClientRect,o=this.hasAutoplay&&n,a=t.getPlayedRanges(),l=a.reduce(((t,i)=>t+i[1]-i[0]),0);return{"autoplay":o,"currentTime":t.getCurrentTime(),"duration":t.getDuration(),"height":s,"id":t.element.id,"muted":this.Z,"playedTotal":l,"playedRangesJson":JSON.stringify(a),"state":this.getPlayingState(),"width":r}}))}}(this,t);this.__.push(n);const{element:e}=n.video;y(e,Ot),function(t){t.classList.add("i-amphtml-media-component")}(e),t.signals().signal(Ot),e.classList.add("i-amphtml-video-interface")}B_(t){n("play",(()=>wt(t,!1))),n("pause",(()=>t.pause())),n("mute",(()=>t.mute())),n("unmute",(()=>t.unmute()));const i=()=>t.fullscreenEnter();function n(i,n){t.registerAction(i,(()=>{Zt(t),n()}),1)}n("fullscreenenter",i),n("fullscreen",i)}J_(t){if(Kt(this.y_,t))return this.y_;for(let i=0;this.__&&i<this.__.length;i++){const n=this.__[i];if(Kt(n,t))return this.y_=n,n}return null}Z_(t){return Q(this.J_(t))}registerForAutoFullscreen(t){this.M_().register(t)}Hg(){return this.M_()}getVideoStateProperty(t,i){const n=this.ampdoc.getRootNode(),e=G().assertElement(n.getElementById(t),`Could not find an element with id="${t}" for VIDEO_STATE`),r=this.Z_(e);return(r?r.getAnalyticsDetails():s()).then((t=>t?t[i]:""))}getPlayingState(t){return this.Z_(t).getPlayingState()}isMuted(t){return this.Z_(t).isMuted()}userInteracted(t){return this.Z_(t).userInteracted()}isRollingAd(t){return this.Z_(t).isRollingAd()}pauseOtherVideos(t){this.__.forEach((i=>{i.isPlaybackManaged()&&i!==t&&i.getPlayingState()==Ht&&i.video.pause()}))}})}(t,"video-manager")}var ei=["<iframe frameborder=0 allowfullscreen></iframe>"],si=["<img placeholder referrerpolicy=origin loading=lazy>"],ri="x-dl8-to-parent-playing",oi="x-dl8-to-parent-paused",ai="x-dl8-to-parent-ended",li=class extends t.BaseElement{constructor(t){super(t),this.Vi=!1,this.nq="https://players.delight-vr.com",this.sq="",this.rq=1,this.aP=0,this._P=[],this.Rb=!1,this.Mv=null,this.tb=null,this.nb=null,this.Xg=null,this.oq=null,this.aq=null,this.lq=null,this.hq=null,this.uq=null,this.pf=new class{constructor(t){this.yf=t,this.mf=!1,this.bf=!1,this._f=this._f.bind(this)}updatePlaying(t){t!==this.mf&&(this.mf=t,t?(this.bf=!1,function(t,i){!function(t,i,n){const e=t.ownerDocument.defaultView;if(!e)return;let s=L.get(t);if(s||(s=[],L.set(t,s),W(e).observe(t)),!s.some((t=>t.callback===n&&1===t.type))){s.push({type:1,callback:n});const i=Y.get(t);i&&setTimeout((()=>D(1,n,i)))}}(t,0,i)}(this.yf,this._f)):function(t,i){!function(t,i,n){const e=L.get(t);if(e&&(function(t,i){const e=[];let s=0;for(let i=0;i<t.length;i++){const o=t[i];(r=o).callback===n&&1===r.type?e.push(o):(s<i&&(t[s]=o),s++)}var r;s<t.length&&(t.length=s)}(e),0==e.length)){L.delete(t),Y.delete(t);const i=t.ownerDocument.defaultView;i&&W(i).unobserve(t)}}(t,0,i)}(this.yf,this._f))}_f({blockSize:t,inlineSize:i}){const n=i>0&&t>0;if(n===this.bf)return;this.bf=n;const e=this.yf;n||e.pause()}}(this.element),this.ij=null}preconnectCallback(t){var i;(i=this.win,tt(i,"preconnect")).url(this.getAmpDoc(),this.nq,t)}renderOutsideViewport(){return!1}buildCallback(){this.sq=X(this.element.getAttribute("data-content-id"),"The data-content-id attribute is required");const t=new r;var i;this.tb=t.promise,this.nb=t.resolve,ni(this.element),(i=this.element,it(i,"video-manager")).register(this)}layoutCallback(){this.ij=function(t,i,n){const e=v(t);let s=M.get(e);s||M.set(e,s=A(x,e));let r=E.get(t);return r||(r=[],E.set(t,r)),r.push(i),s.observe(t),()=>{!function(t,i){const n=E.get(t);if(!n)return;if(!l(n,i))return;if(n.length)return;const e=v(t),s=M.get(e);null==s||s.unobserve(t),E.delete(t)}(t,i)}}(this.element,(({isIntersecting:t})=>this.Vi=t));const t=function(t,i,e,s){const{element:r}=t,o=R(r)(ei);return function(t,i,e,s){for(var r,o,l=n(a(r=["referrerpolicy"])?r:[r],!0);!(o=l()).done;){const t=o.value,n=i.getAttribute(t);null!==n&&e.setAttribute(t,n)}}(0,t.element,o),o.src=gt(r).assertHttpsUrl(i,r),P(o),r.appendChild(o),o}(this,`${this.nq}/player/${this.sq}?amp=1`);return t.setAttribute("allow","vr"),this.Xg=xt(this.win,"message",(t=>{this.cq(t)})),this.Mv=t,this.dq(),this.loadPromise(t)}unlayoutCallback(){var t;if(this.element.hasAttribute("dock"))return!1;this.Mv&&(g(this.Mv),this.Mv=null),this.Xg&&this.Xg();const i=new r;return this.tb=i.promise,this.nb=i.resolve,this.fq(),null===(t=this.ij)||void 0===t||t.call(this),this.ij=null,this.pf.updatePlaying(!1),!0}isLayoutSupported(t){return function(t){return"fixed"==t||"fixed-height"==t||"responsive"==t||"fill"==t||"flex-item"==t||"fluid"==t||"intrinsic"==t}(t)}createPlaceholderCallback(){const t=R(this.element)(si);P(t);const i=`${this.nq}/poster/${this.sq}`;return t.setAttribute("src",i),this.uq=t,t}firstLayoutCompleted(){const t=this.uq;let i=null;return t&&this.Vi?(t.classList.add("i-amphtml-delight-player-faded"),i=function(t,i,n,e){let s;const r=new Promise((i=>{s=It(t,"transitionend",i,void 0)}));return r.then(s,s),r}(t)):i=s(),i.then((()=>super.firstLayoutCompleted()))}pauseCallback(){this.Mv&&this.Mv.contentWindow&&this.pause()}resumeCallback(){this.Mv&&this.Mv.contentWindow&&this.play(!1)}cq(t){if(!function(t,i,n){return!(!i||t.source!=i.contentWindow)&&("string"==typeof n?n==t.origin:n.test(t.origin))}(t,this.Mv,/.*/))return;const i=c(n=Rt(t))?n:p(n);var n;if(!i||!i.type)return;const{element:e}=this;switch(i.type){case ri:this.pf.updatePlaying(!0);break;case oi:case ai:this.pf.updatePlaying(!1)}const s=function(t,i,n){if(null==n[i])return!1;const e=n[i];return(a(e)?e:[e]).forEach((i=>{y(t,i)})),!0}(e,i.type,{[ri]:zt,[oi]:Ft,[ai]:$t,"x-dl8-to-parent-muted":Lt,"x-dl8-to-parent-unmuted":Yt,"x-dl8-to-parent-amp-ad-start":Wt,"x-dl8-to-parent-amp-ad-end":Nt});if(!s)switch(i.type){case"x-dl8-ping":{const t=i.guid;t&&this.Mv.contentWindow.postMessage(JSON.stringify({type:"x-dl8-pong",guid:t,idx:0}),"*");break}case"x-dl8-to-parent-ready":y(e,jt),this.nb(this.Mv);break;case"x-dl8-to-parent-player-ready":this.Hv();break;case"x-dl8-to-parent-timeupdate":{const t=i.payload;this.aP=t.currentTime,this._P=t.playedRanges;break}case"x-dl8-to-parent-duration":{const t=i.payload;this.rq=t.duration;break}case"x-dl8-iframe-enter-fullscreen":this.mq();break;case"x-dl8-iframe-exit-fullscreen":this.pq();break;case"x-dl8-to-parent-entered-fullscreen":this.Rb=!0;break;case"x-dl8-to-parent-exited-fullscreen":this.Rb=!1;break;case"x-dl8-to-parent-amp-custom-tick":{const t=i.payload;this.cM(t.type,t);break}}}cM(t,i){y(this.element,Dt,{"eventType":"video-custom-"+t,"vars":i})}rb(t,i={}){this.tb.then((n=>{n&&n.contentWindow&&n.contentWindow.postMessage(JSON.stringify({type:t,payload:i}),"*")}))}mq(){z(this.Mv,"position","fixed")}pq(){z(this.Mv,"position","absolute")}dq(){const t=()=>{const t=window.screen.orientation||window.screen.mozOrientation||window.screen.msOrientation;this.rb("x-dl8-iframe-screen-change",{orientation:{angle:t.angle,type:t.type}})},i=()=>{const{orientation:t}=window;this.rb("x-dl8-iframe-window-orientationchange",{orientation:t})};if(window.screen){const n=window.screen.orientation||window.screen.mozOrientation||window.screen.msOrientation;n&&n.addEventListener?this.oq=xt(n,"change",t):this.aq=xt(this.win,"orientationchange",i)}else this.aq=xt(this.win,"orientationchange",i);this.lq=xt(this.win,"deviceorientation",(t=>{this.rb("x-dl8-iframe-window-deviceorientation",{alpha:t.alpha,beta:t.beta,gamma:t.gamma,absolute:t.absolute,timeStamp:t.timeStamp})})),this.hq=xt(this.win,"devicemotion",(t=>{const i={interval:t.interval,timeStamp:t.timeStamp};t.acceleration&&Object.assign(i,{acceleration:{x:t.acceleration.x,y:t.acceleration.y,z:t.acceleration.z}}),t.accelerationIncludingGravity&&Object.assign(i,{accelerationIncludingGravity:{x:t.accelerationIncludingGravity.x,y:t.accelerationIncludingGravity.y,z:t.accelerationIncludingGravity.z}}),t.rotationRate&&Object.assign(i,{rotationRate:{alpha:t.rotationRate.alpha,beta:t.rotationRate.beta,gamma:t.rotationRate.gamma}}),this.rb("x-dl8-iframe-window-devicemotion",i)}))}fq(){this.oq&&this.oq(),this.aq&&this.aq(),this.lq&&this.lq(),this.hq&&this.hq()}Hv(){const t=super.getConsentPolicy()||"default",i=function(t,i="default"){return _t(t).then((t=>t?t.getConsentStringInfo(i):null))}(this.element,t),n=function(t,i="default"){return _t(t).then((t=>t?t.getConsentMetadataInfo(i):null))}(this.element,t),e=function(t,i="default"){return _t(t).then((t=>t?t.whenPolicyResolved(i):null))}(this.element,t),s=(r=this.element,o=t,_t(r).then((t=>t?t.getMergedSharedData(o):null)));var r,o;Promise.all([n,i,e,s]).then((t=>{this.rb("x-dl8-to-iframe-consent-data",{"consentMetadata":t[0],"consentString":t[1],"consentPolicyState":t[2],"consentPolicySharedData":t[3]})}))}supportsPlatform(){return!0}isInteractive(){return!0}play(t){this.rb("x-dl8-to-iframe-play")}pause(){this.rb("x-dl8-to-iframe-pause")}mute(){this.rb("x-dl8-to-iframe-mute")}unmute(){this.rb("x-dl8-to-iframe-unmute")}showControls(){this.rb("x-dl8-to-iframe-enable-interface")}hideControls(){this.rb("x-dl8-to-iframe-disable-interface")}fullscreenEnter(){this.rb("x-dl8-to-iframe-enter-fullscreen")}fullscreenExit(){this.rb("x-dl8-to-iframe-exit-fullscreen")}isFullscreen(){return this.Rb}getMetadata(){}preimplementsMediaSessionAPI(){return!1}preimplementsAutoFullscreen(){return!1}getCurrentTime(){return this.aP}getDuration(){return this.rq}getPlayedRanges(){return this._P}seekTo(t){this.rb("x-dl8-to-iframe-seek",{time:t})}};t.registerElement("amp-delight-player",li,"amp-delight-player [placeholder]{transition:opacity 0.5s ease-out}amp-delight-player [placeholder].i-amphtml-delight-player-faded{opacity:0;pointer-events:none}\n/*# sourceURL=/extensions/amp-delight-player/0.1/amp-delight-player.css*/")})();
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */}});
//# sourceMappingURL=amp-delight-player-0.1.mjs.map