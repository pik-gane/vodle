;
(self.AMP=self.AMP||[]).push({m:1,v:"2203281422000",n:"amp-yotpo",ev:"0.1",l:!0,f:function(t,n){(()=>{var{isArray:n}=Array;function e(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function r(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var o=0;return function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var{hasOwnProperty:o,toString:i}=Object.prototype;function u(t){const n=Object.create(null);return t&&Object.assign(n,t),n}function c(t,n,e,r,o,i,u,c,l,s,a){return t}function l(t){return JSON.parse(t)}function s(t,n){try{return l(t)}catch(t){return null==n||n(t),null}}function a(t){const n=parseFloat(t);return"number"==typeof(e=n)&&isFinite(e)?n:void 0;var e}var f=self.AMP_CONFIG||{},p=("string"==typeof f.thirdPartyFrameRegex?new RegExp(f.thirdPartyFrameRegex):f.thirdPartyFrameRegex,("string"==typeof f.cdnProxyRegex?new RegExp(f.cdnProxyRegex):f.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/);function m(t){if(!self.document||!self.document.head)return null;if(self.location&&p.test(self.location.origin))return null;const n=self.document.head.querySelector(`meta[name="${t}"]`);return n&&n.getAttribute("content")||null}var d=f.thirdPartyUrl||"https://3p.ampproject.net",v=f.thirdPartyFrameHost||"ampproject.net",h=(f.cdnUrl||m("runtime-host"),f.errorReportingUrl,f.betaErrorReportingUrl,f.localDev,f.geoApiUrl||m("amp-geo-api"),/(?:^[#?]?|&)([^=&]+)(?:=([^&]*))?/g);function b(t,n=""){try{return decodeURIComponent(t)}catch(t){return n}}function g(t){const n=u();if(!t)return n;let e;for(;e=h.exec(t);){const t=b(e[1],e[1]),r=e[2]?b(e[2].replace(/\+/g," "),e[2]):"";n[t]=r}return n}function y(t){const{location:n}=t||self;return g(n.originalHash||n.hash)}var w="";function j(t){const n=t||self;return n.__AMP_MODE?n.__AMP_MODE:n.__AMP_MODE=function(t){return{localDev:!1,development:S(t,y(t)),esm:!0,test:!1,rtvVersion:O(t)}}(n)}function O(t){var n;return w||(w=(null===(n=t.AMP_CONFIG)||void 0===n?void 0:n.v)||"012203281422000"),w}function S(t,n){const e=n||y(t);return["1","actions","amp","amp4ads","amp4email"].includes(e.development)||!!t.AMP_DEV_MODE}function $(t){const n=Object.getOwnPropertyDescriptor(t,"message");if(null!=n&&n.writable)return t;const{message:e,stack:r}=t,o=new Error(e);for(const n in t)o[n]=t[n];return o.stack=r,o}function x(t){let n=null,e="";for(var o,i=r(arguments,!0);!(o=i()).done;){const t=o.value;t instanceof Error&&!n?n=$(t):(e&&(e+=" "),e+=t)}return n?e&&(n.message=e+": "+n.message):n=new Error(e),n}function E(t){var n,e;null===(n=(e=self).__AMP_REPORT_ERROR)||void 0===n||n.call(e,t)}self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null};var k=self.__AMP_LOG;function A(t){return k.user||(k.user=I()),function(t,n){return n&&n.ownerDocument.defaultView!=t}(k.user.win,t)?k.userForEmbed||(k.userForEmbed=I()):k.user}function I(t){return function(t,n){throw new Error("failed to call initLogConstructor")}()}function T(t,n,e,r,o,i,u,c,l,s,a){return t}function F(t,n,e,r,o,i,u,c,l,s,a){return A().assert(t,n,e,r,o,i,u,c,l,s,a)}function C(t,n){return R(t=function(t){return t.__AMP_TOP||(t.__AMP_TOP=t)}(t),n)}function N(t,n){return R(function(t){const n=M(t);return n.isSingleDoc()?n.win:n}(M(t)),n)}function M(t){return t.nodeType?(n=t,e=(n.ownerDocument||n).defaultView,C(e,"ampdoc")).getAmpDoc(t):t;var n,e}function R(t,n){T(function(t,n){const e=t.__AMP_SERVICES&&t.__AMP_SERVICES[n];return!(!e||!e.ctor)}(t,n));const e=function(t){let n=t.__AMP_SERVICES;return n||(n=t.__AMP_SERVICES={}),n}(t)[n];return e.obj||(T(e.ctor),T(e.context),e.obj=new e.ctor(e.context),T(e.obj),e.context=null,e.resolve&&e.resolve(e.obj)),e.obj}var U,_=t=>M(t),L=["Webkit","webkit","Moz","moz","ms","O","o"];var q=class{static generate(t){return function(t){const{length:n}=t;let e=5381;for(let r=0;r<n;r++)e=33*e^t.charCodeAt(r);return String(e>>>0)}(function(t){const n=[];let e=0;for(;1==(null==(r=t)?void 0:r.nodeType)&&e<25;){let r="";t.id&&(r=`/${t.id}`);const o=t.nodeName.toLowerCase();n.push(`${o}${r}${G(t)}`),e++,t=t.parentElement}var r;return n.join()}(t))}};function G(t){const{nodeName:n}=t;let e=0,r=0,o=t.previousElementSibling;for(;o&&r<25&&e<100;)o.nodeName==n&&r++,e++,o=o.previousElementSibling;return r<25&&e<100?`.${r}`:""}function P(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function V(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,r)}return e}function z(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?V(Object(e),!0).forEach((function(n){P(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):V(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}var D,J="__AMP__EXPERIMENT_TOGGLES";function W(t){var e,o,i,s,a;if(t[J])return t[J];t[J]=u();const f=t[J];c(f);const p=z(z({},null!==(e=t.AMP_CONFIG)&&void 0!==e?e:{}),null!==(o=t.AMP_EXP)&&void 0!==o?o:l((null===(i=t.__AMP_EXP)||void 0===i?void 0:i.textContent)||"{}"));for(const t in p){const n=p[t];"number"==typeof n&&n>=0&&n<=1&&(f[t]=Math.random()<n)}const m=null===(s=t.AMP_CONFIG)||void 0===s?void 0:s["allow-doc-opt-in"];if(n(m)&&m.length){const n=t.document.head.querySelector('meta[name="amp-experiments-opt-in"]');if(n)for(var d,v,h=r((null===(d=n.getAttribute("content"))||void 0===d?void 0:d.split(","))||[],!0);!(v=h()).done;){const t=v.value;m.includes(t)&&(f[t]=!0)}}Object.assign(f,function(t){var n;let e="";try{var o;"localStorage"in t&&(e=null!==(o=t.localStorage.getItem("amp-experiment-toggles"))&&void 0!==o?o:"")}catch(t){}const i=(null===(n=e)||void 0===n?void 0:n.split(/\s*,\s*/g))||[],c=u();for(var l,s=r(i,!0);!(l=s()).done;){const t=l.value;t&&("-"==t[0]?c[t.substr(1)]=!1:c[t]=!0)}return c}(t));const b=null===(a=t.AMP_CONFIG)||void 0===a?void 0:a["allow-url-opt-in"];if(n(b)&&b.length){const n=g(t.location.originalHash||t.location.hash);for(var y,w=r(b,!0);!(y=w()).done;){const t=y.value,e=n[`e-${t}`];"1"==e&&(f[t]=!0),"0"==e&&(f[t]=!1)}}return f}function Z(t,n){return D||(D=self.document.createElement("a")),function(t,n,e){return t.href="",new URL(n,t.href)}(D,t)}new Set(["c","v","a","ad"]);var H={};function X(t,n,e,r,o={}){const{allowFullscreen:i=!1,initialIntersection:c}=o;T(void 0===n.isConnected||!0===n.isConnected);const l=function(t,n,e,r){const o=e||n.getAttribute("type");F(o,"Attribute type required for <amp-ad>: %s",n);const i=function(t){let n=0;for(let e=t;e&&e!=e.parent;e=e.parent)n++;return String(n)+"-"+Y(t)}(t);let u={};return function(t,n){const{dataset:e}=t;for(const t in e)t.startsWith("vars")||(n[t]=e[t]);const r=t.getAttribute("json");if(r){const e=s(r);if(void 0===e)throw A().createError("Error parsing JSON in json attribute in element %s",t);for(const t in e)n[t]=e[t]}}(n,u),u=function(t,n,e,r){const o=Date.now(),i=n.getAttribute("width"),u=n.getAttribute("height");(r=r||{}).width=a(i),r.height=a(u),n.getAttribute("title")&&(r.title=n.getAttribute("title"));let c=t.location.href;"about:srcdoc"==c&&(c=t.parent.location.href);const l=_(n),s=N(n,"documentInfo").get(),f=(t=>N(t,"viewer"))(n).getUnconfirmedReferrerUrl(),p=function(t){const n=t.ownerDocument.body;let e=0,r=0;for(let o=t;o&&o!=n;o=o.offsetParent)e+=o.offsetLeft,r+=o.offsetTop;const{offsetHeight:o,offsetWidth:i}=t;return function(t,n,e,r){return{left:t,top:n,width:e,height:r,bottom:n+r,right:t+e,x:t,y:n}}(e,r,i,o)}(n);var m,v,h;r._context={"ampcontextVersion":"2203281422000","ampcontextFilepath":`${d}/2203281422000/ampcontext-v0.js`,"sourceUrl":s.sourceUrl,"referrer":f,"canonicalUrl":s.canonicalUrl,"pageViewId":s.pageViewId,"location":{"href":c},"startTime":o,"tagName":n.tagName,"mode":{localDev:!1,development:!1,esm:j(h).esm,test:!1,rtvVersion:j(h).rtvVersion},"canary":(m=t,!(null===(v=m.AMP_CONFIG)||void 0===v||!v.canary)),"hidden":!l.isVisible(),"initialLayoutRect":p?{"left":p.left,"top":p.top,"width":p.width,"height":p.height}:null,"domFingerprint":q.generate(n),"experimentToggles":W(t),"sentinel":e};const b=n.getAttribute("src");return b&&(r.src=b),r}(t,n,i,u),u.type=o,Object.assign(u._context,r),u}(t,n,e,r);c&&(l._context.initialIntersection=c);const f=t.document.createElement("iframe");H[l.type]||(H[l.type]=0),H[l.type]+=1;const p=function(t,n,e){return function(t,n,e){const r=n.getMetaByName("amp-3p-iframe-src");if(!r)return null;const o=function(t,n,e="source"){return F(null!=t,"%s %s must be available",n,e),F(function(t){return"https:"==(t=(t=>"string"==typeof t?Z(t):t)(t)).protocol||"localhost"==t.hostname||"127.0.0.1"==t.hostname||function(t,n){const e=t.length-n.length;return e>=0&&t.indexOf(n,e)==e}(t.hostname,".localhost")}(t)||/^\/\//.test(t),'%s %s must start with "https://" or "//" or be relative and served from either https or from localhost. Invalid value: %s',n,e,t),t}(r,'meta[name="amp-3p-iframe-src"]');F(-1==o.indexOf("?"),"3p iframe url must not include query string %s in element %s.",o,r);const i=Z(o);return F("localhost"==i.hostname||i.origin!=Z(t.location.href).origin,"3p iframe url must not be on the same origin as the current document %s (%s) in element %s. See https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-iframe-origin-policy.md for details.",o,i.origin,r),`${o}?2203281422000`}(t,n)||function(t,n){return t.__AMP_DEFAULT_BOOTSTRAP_SUBDOMAIN=t.__AMP_DEFAULT_BOOTSTRAP_SUBDOMAIN||"d-"+Y(t),"https://"+t.__AMP_DEFAULT_BOOTSTRAP_SUBDOMAIN+`.${v}/2203281422000/frame.html`}(t)}(t,n.getAmpDoc()),m=Z(p).hostname,h=JSON.stringify({"host":m,"bootstrap":(b=l.type,`${d}/2203281422000/vendor/${b}.mjs`),"type":l.type,"count":H[l.type],"attributes":l});var b;return f.src=p,f.ampLocation=Z(p),f.name=h,l.width&&(f.width=l.width),l.height&&(f.height=l.height),l.title&&(f.title=l.title),i&&f.setAttribute("allowfullscreen","true"),f.setAttribute("scrolling","no"),function(t,n,e,r,o){const i=function(t,n,e){if(n.startsWith("--"))return n;U||(U=u());let r=U[n];if(!r||e){if(r=n,void 0===t[n]){const e=function(t){return t.charAt(0).toUpperCase()+t.slice(1)}(n),o=function(t,n){for(let e=0;e<L.length;e++){const r=L[e]+n;if(void 0!==t[r])return r}return""}(t,e);void 0!==t[o]&&(r=o)}e||(U[n]=r)}return r}(t.style,n,o);if(!i)return;const c=r?e+r:e;t.style.setProperty(function(t){const n=t.replace(/[A-Z]/g,(t=>"-"+t.toLowerCase()));return L.some((t=>n.startsWith(t+"-")))?`-${n}`:n}(i),c)}(f,"border","none"),f.onload=function(){this.readyState="complete"},f.setAttribute("allow","sync-xhr 'none';"),["facebook"].includes(e)||function(t){if(!t.sandbox||!t.sandbox.supports)return;const n=["allow-top-navigation-by-user-activation","allow-popups-to-escape-sandbox"];for(let e=0;e<n.length;e++){const r=n[e];if(!t.sandbox.supports(r))return}t.sandbox=n.join(" ")+" "+["allow-forms","allow-modals","allow-pointer-lock","allow-popups","allow-same-origin","allow-scripts"].join(" ")}(f),f.setAttribute("data-amp-3p-sentinel",l._context.sentinel),f}function Y(t){let n;if(t.crypto&&t.crypto.getRandomValues){const e=new Uint32Array(2);t.crypto.getRandomValues(e),n=String(e[0])+e[1]}else n=String(t.Math.random()).substr(2)+"0";return n}function B(t){return"string"==typeof t&&t.startsWith("amp-")&&-1!=t.indexOf("{")}function K(t){return t.data}var Q="unlisten";function tt(t,n,e){const r=function(t,n){let{listeningFors:e}=t;return!e&&n&&(e=t.listeningFors=Object.create(null)),e||null}(t,e);if(!r)return r;let o=r[n];return!o&&e&&(o=r[n]=[]),o||null}function nt(t,n){for(let e=n;e&&e!=e.parent;e=e.parent)if(e==t)return!0;return!1}function et(t){const n={"sentinel":Q};for(let e=t.length-1;e>=0;e--){const r=t[e];if(!r.frame.contentWindow){t.splice(e,1);const{events:o}=r;for(const t in o)o[t].splice(0,1/0).forEach((t=>{t(n)}))}}}var rt=class extends t.BaseElement{constructor(t){super(t),this.Mv=null,this.T_=[]}preconnectCallback(t){var n;(n=this.win,C(n,"preconnect")).url(this.getAmpDoc(),"https://staticw2.yotpo.com",t)}buildCallback(){F(this.element.getAttribute("data-app-key"),"The data-app-key attribute is required for <amp-yotpo> %s",this.element),F(this.element.getAttribute("data-widget-type"),"The data-widget-type attribute is required for <amp-yotpo> %s",this.element)}isLayoutSupported(t){return function(t){return"fixed"==t||"fixed-height"==t||"responsive"==t||"fill"==t||"flex-item"==t||"fluid"==t||"intrinsic"==t}(t)}unlayoutOnPause(){return!0}unlayoutCallback(){var t,n;return this.T_.forEach((t=>t())),this.T_.length=0,this.Mv&&(null===(n=(t=this.Mv).parentElement)||void 0===n||n.removeChild(t),this.Mv=null),!0}layoutCallback(){const t=X(this.win,this.element,"yotpo");t.title=this.element.title||"Yotpo widget",t.classList.add("i-amphtml-fill-content");const n=function(t,n,e,r,o,i){T(t.src),T(!t.parentNode),T(e);const u=t.ownerDocument.defaultView;!function(t){t.listeningFors||t.addEventListener("message",(function(n){if(!K(n))return;const e=function(t){return"string"==typeof t&&(t="{"==t.charAt(0)?s(t,(t=>{}))||null:B(t)?function(t){if(!B(t))return null;const n=t.indexOf("{");return c(-1!=n),s(t.substr(n),(n=>{!function(t){const n=x.apply(null,arguments);setTimeout((()=>{throw E(n),n}))}(new Error(`MESSAGING: Failed to parse message: ${t}\n${n.message}`))}))}(t):null),t}(K(n));if(!e||!e.sentinel)return;const r=function(t,n,e,r){const o=tt(t,n);if(!o)return o;let i;for(let t=0;t<o.length;t++){const n=o[t],{contentWindow:e}=n.frame;if(e){if(r==e||nt(e,r)){i=n;break}}else setTimeout(et,0,o)}return i?i.events:null}(t,e.sentinel,n.origin,n.source);if(!r)return;let o=r[e.type];if(o){o=o.slice();for(let t=0;t<o.length;t++)(0,o[t])(e,n.source,n.origin,n)}}))}(u);const l=function(t,n,e){const r=function(t,n){return t.getAttribute("data-amp-3p-sentinel")}(n),o=tt(t,r,!0);let i;for(let t=0;t<o.length;t++){const e=o[t];if(e.frame===n){i=e;break}}return i||(i={frame:n,events:Object.create(null)},o.push(i)),i.events}(u,t),a=Z(t.src).origin;let f,p=l["embed-size"]||(l["embed-size"]=[]),m=function(n,r,o,i){if("amp"==n.sentinel){if(r!=t.contentWindow)return;const n="null"==o&&undefined;if(a!=o&&!n)return}r==t.contentWindow&&(n.sentinel!=Q?e(n,r,o,i):f())};return p.push(m),f=function(){if(m){const t=p.indexOf(m);t>-1&&p.splice(t,1),m=null,p=null,e=null}}}(t,0,(t=>{this.attemptChangeHeight(t.height).catch((()=>{}))}));return this.T_.push(n),this.element.appendChild(t),this.Mv=t,this.loadPromise(t)}};t.registerElement("amp-yotpo",rt)})();
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */}});
//# sourceMappingURL=amp-yotpo-0.1.mjs.map