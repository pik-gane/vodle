;
(self.AMP=self.AMP||[]).push({m:1,v:"2203281422000",n:"amp-instagram",ev:"0.1",l:!0,f:function(t,n){(()=>{var{hasOwnProperty:n,toString:r}=Object.prototype;function e(t){return"[object Object]"===r.call(t)}var i,s=["Webkit","webkit","Moz","moz","ms","O","o"];function o(t,n,r,e,o){const u=function(t,n,r){if(n.startsWith("--"))return n;i||(i=Object.create(null));let e=i[n];if(!e||r){if(e=n,void 0===t[n]){const r=function(t){return t.charAt(0).toUpperCase()+t.slice(1)}(n),i=function(t,n){for(let r=0;r<s.length;r++){const e=s[r]+n;if(void 0!==t[e])return e}return""}(t,r);void 0!==t[i]&&(e=i)}r||(i[n]=e)}return e}(t.style,n,o);if(!u)return;const l=e?r+e:r;t.style.setProperty(function(t){const n=t.replace(/[A-Z]/g,(t=>"-"+t.toLowerCase()));return s.some((t=>n.startsWith(t+"-")))?`-${n}`:n}(u),l)}var u=self.AMP_CONFIG||{},l=("string"==typeof u.thirdPartyFrameRegex?new RegExp(u.thirdPartyFrameRegex):u.thirdPartyFrameRegex,("string"==typeof u.cdnProxyRegex?new RegExp(u.cdnProxyRegex):u.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/);function a(t){if(!self.document||!self.document.head)return null;if(self.location&&l.test(self.location.origin))return null;const n=self.document.head.querySelector(`meta[name="${t}"]`);return n&&n.getAttribute("content")||null}u.thirdPartyUrl,u.thirdPartyFrameHost,u.cdnUrl||a("runtime-host"),u.errorReportingUrl,u.betaErrorReportingUrl,u.localDev,u.geoApiUrl||a("amp-geo-api"),self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null};var c=self.__AMP_LOG;function f(t){return function(t,n){throw new Error("failed to call initLogConstructor")}()}function h(t,n,r,e,i,s,o,u,l,a,c){return t}function m(t,n){return function(t,n){h(function(t,n){const r=t.__AMP_SERVICES&&t.__AMP_SERVICES[n];return!(!r||!r.ctor)}(t,n));const r=function(t){let n=t.__AMP_SERVICES;return n||(n=t.__AMP_SERVICES={}),n}(t)[n];return r.obj||(h(r.ctor),h(r.context),r.obj=new r.ctor(r.context),h(r.obj),r.context=null,r.resolve&&r.resolve(r.obj)),r.obj}(t=function(t){return t.__AMP_TOP||(t.__AMP_TOP=t)}(t),n)}var d,p=t=>m(t,"preconnect"),g=class extends t.BaseElement{constructor(t){super(t),this.Mv=null,this.V3="",this.Xg=null,this.Z3="",this.q3=null}preconnectCallback(t){p(this.win).url(this.getAmpDoc(),"https://www.instagram.com",t),p(this.win).url(this.getAmpDoc(),"https://instagram.fsnc1-1.fna.fbcdn.net",t)}renderOutsideViewport(){return!1}buildCallback(){var t,n,r,e,i,s,o,u,l,a,h;this.V3=(t=this.element.getAttribute("data-shortcode")||this.element.getAttribute("shortcode"),n="The data-shortcode attribute is required for <amp-instagram> %s",r=this.element,(c.user||(c.user=f()),void c.user.win?c.userForEmbed||(c.userForEmbed=f()):c.user).assert(t,n,r,e,i,s,o,u,l,a,h)),this.Z3=this.element.hasAttribute("data-captioned")?"captioned/":""}isLayoutSupported(t){return function(t){return"fixed"==t||"fixed-height"==t||"responsive"==t||"fill"==t||"flex-item"==t||"fluid"==t||"intrinsic"==t}(t)}layoutCallback(){const t=this.element.ownerDocument.createElement("iframe");return this.Mv=t,this.Xg=function(t,n,r,e){let i=t,s=r,o=t=>{try{return s(t)}catch(t){var n,r;throw null===(n=(r=self).__AMP_REPORT_ERROR)||void 0===n||n.call(r,t),t}};const u=function(){if(void 0!==d)return d;d=!1;try{const t={get capture(){return d=!0,!1}};self.addEventListener("test-options",null,t),self.removeEventListener("test-options",null,t)}catch(t){}return d}();return i.addEventListener(n,o,!!u&&e),()=>{null==i||i.removeEventListener(n,o,!!u&&e),s=null,i=null,o=null}}(this.win,"message",this.J3.bind(this),void 0),t.setAttribute("scrolling","no"),t.setAttribute("frameborder","0"),t.setAttribute("allowtransparency","true"),t.setAttribute("title","Instagram: "+this.element.getAttribute("alt")),t.src="https://www.instagram.com/p/"+encodeURIComponent(this.V3)+"/embed/"+this.Z3+"?cr=1&v=12",t.classList.add("i-amphtml-fill-content"),this.element.appendChild(t),o(t,"opacity",0),this.q3=this.loadPromise(t).then((()=>{this.getVsync().mutate((()=>{o(t,"opacity",1)}))}))}J3(t){if("https://www.instagram.com"!=t.origin||t.source!=this.Mv.contentWindow)return;const n=function(t){return t.data}(t);if(!n||!e(n)&&!n.startsWith("{"))return;const r=e(n)?n:function(t,n){try{return function(t){return JSON.parse(t)}(t)}catch(t){return null}}(n);if(void 0!==r&&"MEASURE"==r.type&&r.details){const t=r.details.height;this.getVsync().measure((()=>{this.Mv&&this.Mv.offsetHeight!==t&&this.forceChangeHeight(t)}))}}unlayoutOnPause(){return!0}unlayoutCallback(){var t,n;return this.Mv&&(null===(n=(t=this.Mv).parentElement)||void 0===n||n.removeChild(t),this.Mv=null,this.q3=null),this.Xg&&this.Xg(),!0}};t.registerElement("amp-instagram",g,"amp-instagram.amp-instagram-default-framing{border:1px solid #dbdbdb!important}\n/*# sourceURL=/extensions/amp-instagram/0.1/amp-instagram.css*/")})();
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */}});
//# sourceMappingURL=amp-instagram-0.1.mjs.map