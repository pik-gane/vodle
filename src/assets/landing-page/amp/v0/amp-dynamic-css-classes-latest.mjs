;
(self.AMP=self.AMP||[]).push({m:1,v:"2203281422000",n:"amp-dynamic-css-classes",ev:"0.1",l:!0,f:function(n,t){(()=>{var t,{hasOwnProperty:e,toString:r}=Object.prototype;var o=self.AMP_CONFIG||{},u=("string"==typeof o.thirdPartyFrameRegex?new RegExp(o.thirdPartyFrameRegex):o.thirdPartyFrameRegex,("string"==typeof o.cdnProxyRegex?new RegExp(o.cdnProxyRegex):o.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/);function c(n){if(!self.document||!self.document.head)return null;if(self.location&&u.test(self.location.origin))return null;const t=self.document.head.querySelector(`meta[name="${n}"]`);return t&&t.getAttribute("content")||null}function s(n,t,e,r,o,u,c,s,f,i,l){return n}function f(n,t){return a(n=function(n){return n.__AMP_TOP||(n.__AMP_TOP=n)}(n),t)}function i(n){return n.nodeType?(t=n,e=(t.ownerDocument||t).defaultView,f(e,"ampdoc")).getAmpDoc(n):n;var t,e}function l(n){const t=i(n);return t.isSingleDoc()?t.win:t}function a(n,t){s(m(n,t));const e=function(n){let t=n.__AMP_SERVICES;return t||(t=n.__AMP_SERVICES={}),t}(n)[t];return e.obj||(s(e.ctor),s(e.context),e.obj=new e.ctor(e.context),s(e.obj),e.context=null,e.resolve&&e.resolve(e.obj)),e.obj}function m(n,t){const e=n.__AMP_SERVICES&&n.__AMP_SERVICES[t];return!(!e||!e.ctor)}o.thirdPartyUrl,o.thirdPartyFrameHost,o.cdnUrl||c("runtime-host"),o.errorReportingUrl,o.betaErrorReportingUrl,o.localDev,o.geoApiUrl||c("amp-geo-api"),self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null},self.__AMP_LOG;var p=n=>function(n,t){const e=l(i(n));return m(e,t)?a(e,t):null}(n,"url"),v=n=>function(n,t){return a(l(i(n)),t)}(n,"viewer"),w=n=>f(n,"vsync");function d(n){const t=n.split(".");let e="";return t.reduceRight(((n,t)=>(e&&(t+="."+e),e=t,n.push(t),n)),[])}function g(n,t){n.isBodyAvailable()?y(n.getBody(),t):n.waitForBodyOpen().then((n=>y(n,t)))}function y(n,t){const{classList:e}=n;for(let n=0;n<t.length;n++)e.add(t[n])}n.registerServiceForDoc("amp-dynamic-css-classes",class{constructor(n){!function(n){!function(n){const t=function(n){const t=function(n){const t=v(n).getUnconfirmedReferrerUrl();if(!t)return"";const{hostname:e}=p(n.getHeadNode()).parse(t);return e}(n);return"t.co"===t?d("twitter.com"):!t&&/Pinterest/.test(n.win.navigator.userAgent)?d("www.pinterest.com"):d(t)}(n).map((n=>`amp-referrer-${n.replace(/\./g,"-")}`));w(n.win).mutate((()=>{g(n,t)}))}(n),function(n){v(n).isEmbedded()&&w(n.win).mutate((()=>{g(n,["amp-viewer"])}))}(n)}(n)}whenReady(){return t||(t=Promise.resolve(void 0))}})})();
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */}});
//# sourceMappingURL=amp-dynamic-css-classes-0.1.mjs.map