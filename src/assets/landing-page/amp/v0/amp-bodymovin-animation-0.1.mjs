;
(self.AMP=self.AMP||[]).push({m:1,v:"2203281422000",n:"amp-bodymovin-animation",ev:"0.1",l:!0,f:function(t,n){(()=>{var{isArray:n}=Array;function e(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function r(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var o=0;return function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var{hasOwnProperty:o,toString:i}=Object.prototype;function s(t){return"[object Object]"===i.call(t)}function u(t){const n=Object.create(null);return t&&Object.assign(n,t),n}function c(t,n){return o.call(t,n)}function l(t){return"number"==typeof t&&isFinite(t)}function a(t,n,e,r,o,i,s,u,c,l,a){return t}var f=class{constructor(){this.promise=new Promise(((t,n)=>{this.resolve=t,this.reject=n}))}};function h(t){return JSON.parse(t)}function p(t){const n=parseFloat(t);return l(n)?n:void 0}var m=self.AMP_CONFIG||{},d=("string"==typeof m.thirdPartyFrameRegex?new RegExp(m.thirdPartyFrameRegex):m.thirdPartyFrameRegex,("string"==typeof m.cdnProxyRegex?new RegExp(m.cdnProxyRegex):m.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/);function v(t){if(!self.document||!self.document.head)return null;if(self.location&&d.test(self.location.origin))return null;const n=self.document.head.querySelector(`meta[name="${t}"]`);return n&&n.getAttribute("content")||null}var b=m.thirdPartyUrl||"https://3p.ampproject.net",y=m.thirdPartyFrameHost||"ampproject.net",g=(m.cdnUrl||v("runtime-host"),m.errorReportingUrl,m.betaErrorReportingUrl,m.localDev,m.geoApiUrl||v("amp-geo-api"),/(?:^[#?]?|&)([^=&]+)(?:=([^&]*))?/g);function w(t,n=""){try{return decodeURIComponent(t)}catch(t){return n}}function j(t){const n=u();if(!t)return n;let e;for(;e=g.exec(t);){const t=w(e[1],e[1]),r=e[2]?w(e[2].replace(/\+/g," "),e[2]):"";n[t]=r}return n}function O(t){const{location:n}=t||self;return j(n.originalHash||n.hash)}var A="";function _(t){const n=t||self;return n.__AMP_MODE?n.__AMP_MODE:n.__AMP_MODE=function(t){return{localDev:!1,development:S(t,O(t)),esm:!0,test:!1,rtvVersion:x(t)}}(n)}function x(t){var n;return A||(A=(null===(n=t.AMP_CONFIG)||void 0===n?void 0:n.v)||"012203281422000"),A}function S(t,n){const e=n||O(t);return["1","actions","amp","amp4ads","amp4email"].includes(e.development)||!!t.AMP_DEV_MODE}self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null};var P=self.__AMP_LOG;function E(t){return P.user||(P.user=T()),function(t,n){return n&&n.ownerDocument.defaultView!=t}(P.user.win,t)?P.userForEmbed||(P.userForEmbed=T()):P.user}function T(t){return function(t,n){throw new Error("failed to call initLogConstructor")}()}function R(t,n,e,r,o,i,s,u,c,l,a){return t}function $(t,n,e,r,o,i,s,u,c,l,a){return E().assert(t,n,e,r,o,i,s,u,c,l,a)}function I(t,n){return V(t=function(t){return t.__AMP_TOP||(t.__AMP_TOP=t)}(t),n)}function M(t,n){return V(N(k(t)),n)}function k(t){return t.nodeType?(n=t,e=(n.ownerDocument||n).defaultView,I(e,"ampdoc")).getAmpDoc(t):t;var n,e}function N(t){const n=k(t);return n.isSingleDoc()?n.win:n}function V(t,n){R(C(t,n));const e=function(t){let n=t.__AMP_SERVICES;return n||(n=t.__AMP_SERVICES={}),n}(t)[n];return e.obj||(R(e.ctor),R(e.context),e.obj=new e.ctor(e.context),R(e.obj),e.context=null,e.resolve&&e.resolve(e.obj)),e.obj}function C(t,n){const e=t.__AMP_SERVICES&&t.__AMP_SERVICES[n];return!(!e||!e.ctor)}var L,U=t=>k(t),F=t=>function(t,n){const e=N(k(t));return C(e,n)?V(e,n):null}(t,"url-replace");function J(t){return t.data}var D,q=["Webkit","webkit","Moz","moz","ms","O","o"];var z=class{static generate(t){return function(t){const{length:n}=t;let e=5381;for(let r=0;r<n;r++)e=33*e^t.charCodeAt(r);return String(e>>>0)}(function(t){const n=[];let e=0;for(;1==(null==(r=t)?void 0:r.nodeType)&&e<25;){let r="";t.id&&(r=`/${t.id}`);const o=t.nodeName.toLowerCase();n.push(`${o}${r}${B(t)}`),e++,t=t.parentElement}var r;return n.join()}(t))}};function B(t){const{nodeName:n}=t;let e=0,r=0,o=t.previousElementSibling;for(;o&&r<25&&e<100;)o.nodeName==n&&r++,e++,o=o.previousElementSibling;return r<25&&e<100?`.${r}`:""}function G(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function W(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,r)}return e}function Z(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?W(Object(e),!0).forEach((function(n){G(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):W(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}var H,X="__AMP__EXPERIMENT_TOGGLES";function K(t){var e,o,i,s,c;if(t[X])return t[X];t[X]=u();const l=t[X];a(l);const f=Z(Z({},null!==(e=t.AMP_CONFIG)&&void 0!==e?e:{}),null!==(o=t.AMP_EXP)&&void 0!==o?o:h((null===(i=t.__AMP_EXP)||void 0===i?void 0:i.textContent)||"{}"));for(const t in f){const n=f[t];"number"==typeof n&&n>=0&&n<=1&&(l[t]=Math.random()<n)}const p=null===(s=t.AMP_CONFIG)||void 0===s?void 0:s["allow-doc-opt-in"];if(n(p)&&p.length){const n=t.document.head.querySelector('meta[name="amp-experiments-opt-in"]');if(n)for(var m,d,v=r((null===(m=n.getAttribute("content"))||void 0===m?void 0:m.split(","))||[],!0);!(d=v()).done;){const t=d.value;p.includes(t)&&(l[t]=!0)}}Object.assign(l,function(t){var n;let e="";try{var o;"localStorage"in t&&(e=null!==(o=t.localStorage.getItem("amp-experiment-toggles"))&&void 0!==o?o:"")}catch(t){}const i=(null===(n=e)||void 0===n?void 0:n.split(/\s*,\s*/g))||[],s=u();for(var c,l=r(i,!0);!(c=l()).done;){const t=c.value;t&&("-"==t[0]?s[t.substr(1)]=!1:s[t]=!0)}return s}(t));const b=null===(c=t.AMP_CONFIG)||void 0===c?void 0:c["allow-url-opt-in"];if(n(b)&&b.length){const n=j(t.location.originalHash||t.location.hash);for(var y,g=r(b,!0);!(y=g()).done;){const t=y.value,e=n[`e-${t}`];"1"==e&&(l[t]=!0),"0"==e&&(l[t]=!1)}}return l}function Q(t,n){return H||(H=self.document.createElement("a")),function(t,n,e){return t.href="",new URL(n,t.href)}(H,t)}function Y(t,n,e="source"){return $(null!=t,"%s %s must be available",n,e),$("https:"==(r=(t=>"string"==typeof t?Q(t):t)(r=t)).protocol||"localhost"==r.hostname||"127.0.0.1"==r.hostname||function(t,n){const e=t.length-n.length;return e>=0&&t.indexOf(n,e)==e}(r.hostname,".localhost")||/^\/\//.test(t),'%s %s must start with "https://" or "//" or be relative and served from either https or from localhost. Invalid value: %s',n,e,t),t;var r}new Set(["c","v","a","ad"]);var tt={};function nt(t,n,e,r,o={}){const{allowFullscreen:i=!1,initialIntersection:s}=o;R(void 0===n.isConnected||!0===n.isConnected);const c=function(t,n,e,r){const o=e||n.getAttribute("type");$(o,"Attribute type required for <amp-ad>: %s",n);const i=function(t){let n=0;for(let e=t;e&&e!=e.parent;e=e.parent)n++;return String(n)+"-"+ot(t)}(t);let s={};return function(t,n){const{dataset:e}=t;for(const t in e)t.startsWith("vars")||(n[t]=e[t]);const r=t.getAttribute("json");if(r){const e=function(t,n){try{return h(t)}catch(t){return null}}(r);if(void 0===e)throw E().createError("Error parsing JSON in json attribute in element %s",t);for(const t in e)n[t]=e[t]}}(n,s),s=function(t,n,e,r){const o=Date.now(),i=n.getAttribute("width"),s=n.getAttribute("height");(r=r||{}).width=p(i),r.height=p(s),n.getAttribute("title")&&(r.title=n.getAttribute("title"));let u=t.location.href;"about:srcdoc"==u&&(u=t.parent.location.href);const c=U(n),l=M(n,"documentInfo").get(),a=(t=>M(t,"viewer"))(n).getUnconfirmedReferrerUrl(),f=function(t){const n=t.ownerDocument.body;let e=0,r=0;for(let o=t;o&&o!=n;o=o.offsetParent)e+=o.offsetLeft,r+=o.offsetTop;const{offsetHeight:o,offsetWidth:i}=t;return function(t,n,e,r){return{left:t,top:n,width:e,height:r,bottom:n+r,right:t+e,x:t,y:n}}(e,r,i,o)}(n);var h,m,d;r._context={"ampcontextVersion":"2203281422000","ampcontextFilepath":`${b}/2203281422000/ampcontext-v0.js`,"sourceUrl":l.sourceUrl,"referrer":a,"canonicalUrl":l.canonicalUrl,"pageViewId":l.pageViewId,"location":{"href":u},"startTime":o,"tagName":n.tagName,"mode":{localDev:!1,development:!1,esm:_(d).esm,test:!1,rtvVersion:_(d).rtvVersion},"canary":(h=t,!(null===(m=h.AMP_CONFIG)||void 0===m||!m.canary)),"hidden":!c.isVisible(),"initialLayoutRect":f?{"left":f.left,"top":f.top,"width":f.width,"height":f.height}:null,"domFingerprint":z.generate(n),"experimentToggles":K(t),"sentinel":e};const v=n.getAttribute("src");return v&&(r.src=v),r}(t,n,i,s),s.type=o,Object.assign(s._context,r),s}(t,n,e,r);s&&(c._context.initialIntersection=s);const l=t.document.createElement("iframe");tt[c.type]||(tt[c.type]=0),tt[c.type]+=1;const a=rt(t,n.getAmpDoc()),f=Q(a).hostname,m=JSON.stringify({"host":f,"bootstrap":et(c.type),"type":c.type,"count":tt[c.type],"attributes":c});return l.src=a,l.ampLocation=Q(a),l.name=m,c.width&&(l.width=c.width),c.height&&(l.height=c.height),c.title&&(l.title=c.title),i&&l.setAttribute("allowfullscreen","true"),l.setAttribute("scrolling","no"),function(t,n,e,r,o){const i=function(t,n,e){if(n.startsWith("--"))return n;D||(D=u());let r=D[n];if(!r||e){if(r=n,void 0===t[n]){const e=function(t){return t.charAt(0).toUpperCase()+t.slice(1)}(n),o=function(t,n){for(let e=0;e<q.length;e++){const r=q[e]+n;if(void 0!==t[r])return r}return""}(t,e);void 0!==t[o]&&(r=o)}e||(D[n]=r)}return r}(t.style,n,o);if(!i)return;const s=r?e+r:e;t.style.setProperty(function(t){const n=t.replace(/[A-Z]/g,(t=>"-"+t.toLowerCase()));return q.some((t=>n.startsWith(t+"-")))?`-${n}`:n}(i),s)}(l,"border","none"),l.onload=function(){this.readyState="complete"},l.setAttribute("allow","sync-xhr 'none';"),["facebook"].includes(e)||function(t){if(!t.sandbox||!t.sandbox.supports)return;const n=["allow-top-navigation-by-user-activation","allow-popups-to-escape-sandbox"];for(let e=0;e<n.length;e++){const r=n[e];if(!t.sandbox.supports(r))return}t.sandbox=n.join(" ")+" "+["allow-forms","allow-modals","allow-pointer-lock","allow-popups","allow-same-origin","allow-scripts"].join(" ")}(l),l.setAttribute("data-amp-3p-sentinel",c._context.sentinel),l}function et(t){return`${b}/2203281422000/vendor/${t}.mjs`}function rt(t,n,e){return function(t,n,e){const r=n.getMetaByName("amp-3p-iframe-src");if(!r)return null;const o=Y(r,'meta[name="amp-3p-iframe-src"]');$(-1==o.indexOf("?"),"3p iframe url must not include query string %s in element %s.",o,r);const i=Q(o);return $("localhost"==i.hostname&&!e||i.origin!=Q(t.location.href).origin,"3p iframe url must not be on the same origin as the current document %s (%s) in element %s. See https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-iframe-origin-policy.md for details.",o,i.origin,r),`${o}?2203281422000`}(t,n,e)||function(t,n){return t.__AMP_DEFAULT_BOOTSTRAP_SUBDOMAIN=t.__AMP_DEFAULT_BOOTSTRAP_SUBDOMAIN||"d-"+ot(t),"https://"+t.__AMP_DEFAULT_BOOTSTRAP_SUBDOMAIN+`.${y}/2203281422000/frame.html`}(t)}function ot(t){let n;if(t.crypto&&t.crypto.getRandomValues){const e=new Uint32Array(2);t.crypto.getRandomValues(e),n=String(e[0])+e[1]}else n=String(t.Math.random()).substr(2)+"0";return n}var it={NONE:0,OPT_IN:1,ALL:2},st=class extends t.BaseElement{constructor(t){super(t),this.Ci=U(this.element),this.Mv=null,this._d=null,this.md=null,this.hj=null,this.tb=null,this.nb=null,this.Xg=null}isLayoutSupported(t){return function(t){return"fixed"==t||"fixed-height"==t||"responsive"==t||"fill"==t||"flex-item"==t||"fluid"==t||"intrinsic"==t}(t)}preconnectCallback(t){const n=I(this.win,"preconnect");!function(t,n,e,r){const o=rt(t,e);r.preload(e,o,"document"),r.preload(e,et("bodymovinanimation"),"script")}(this.win,0,this.getAmpDoc(),n),n.url(this.getAmpDoc(),"https://cdnjs.cloudflare.com",t)}buildCallback(){this._d=this.element.getAttribute("loop")||"true",this.hj=!this.element.hasAttribute("noautoplay"),this.md=this.element.getAttribute("renderer")||"svg",$(this.element.hasAttribute("src"),"The src attribute must be specified for <amp-bodymovin-animation>"),Y(this.element.getAttribute("src"),this.element);const t=new f;this.tb=t.promise,this.nb=t.resolve,this.registerAction("play",(()=>{this.jb()}),1),this.registerAction("pause",(()=>{this.Ob()}),1),this.registerAction("stop",(()=>{this.mj()}),1),this.registerAction("seekTo",(t=>{const{args:n}=t;n&&this.dj(n)}),1)}layoutCallback(){return function(t,n,e={}){const{expr:o=".",urlReplacement:i=it.NONE,refresh:s=!1,xssiPrefix:u,url:l=n.getAttribute("src")}=e;Y(l,n);const a=I(t.win,"batched-xhr");return function(t,n,e,r){const o=F(t);return(e>=it.OPT_IN?o.expandUrlAsync(n):Promise.resolve(n)).then((n=>{if(e===it.OPT_IN){const n=o.collectDisallowedVarsSync(t);if(n.length>0)throw E().createError(`URL variable substitutions in CORS fetches from dynamic URLs (e.g. via amp-bind) require opt-in. Please add data-amp-replace="${n.join(" ")}" to the <${t.tagName}> element. See https://bit.ly/amp-var-subs.`)}const i={};return t.hasAttribute("credentials")&&(i.credentials=t.getAttribute("credentials")),r&&(i.cache="reload"),{"xhrUrl":n,"fetchOpt":i}}))}(n,l,i,s).then((t=>a.fetchJson(t.xhrUrl,t.fetchOpt))).then((n=>(t=>I(t,"xhr"))(t.win).xssiJson(n,u))).then((t=>{if(null==t)throw new Error("Response is undefined.");return function(t,n){if("."==n)return t;let e=t;for(var o,i=r(n.split("."),!0);!(o=i()).done;){const t=o.value;if(!(t&&e&&void 0!==e[t]&&"object"==typeof e&&c(e,t))){e=void 0;break}e=e[t]}return e}(t,o||".")})).catch((t=>{throw E().createError("failed fetching JSON data",t)}))}(this.Ci,this.element).then((t=>{const n={loop:this._d,autoplay:this.hj,renderer:this.md,animationData:t},e=nt(this.win,this.element,"bodymovinanimation",n);return e.title=this.element.title||"Airbnb BodyMovin animation",(r=this.win,I(r,"vsync")).mutatePromise((()=>{var t,n;e.classList.add("i-amphtml-fill-content"),this.Xg=(t=this.win,n=this.vj.bind(this),function(t,n,e,r){let o=t,i=e,s=t=>{try{return i(t)}catch(t){var n,e;throw null===(n=(e=self).__AMP_REPORT_ERROR)||void 0===n||n.call(e,t),t}};const u=function(){if(void 0!==L)return L;L=!1;try{const t={get capture(){return L=!0,!1}};self.addEventListener("test-options",null,t),self.removeEventListener("test-options",null,t)}catch(t){}return L}();return o.addEventListener(n,s,!!u&&r),()=>{null==o||o.removeEventListener(n,s,!!u&&r),i=null,o=null,s=null}}(t,"message",n,void 0)),this.element.appendChild(e),this.Mv=e})).then((()=>this.tb));var r}))}unlayoutCallback(){var t,n;this.Mv&&(null===(n=(t=this.Mv).parentElement)||void 0===n||n.removeChild(t),this.Mv=null),this.Xg&&this.Xg();const e=new f;return this.tb=e.promise,this.nb=e.resolve,!0}vj(t){if(this.Mv&&t.source!=this.Mv.contentWindow)return;if(!J(t)||!s(J(t))&&!J(t).startsWith("{"))return;const n=s(J(t))?J(t):h(J(t));void 0!==n&&"ready"==n.action&&this.nb()}rb(t,n,e){this.tb.then((()=>{if(this.Mv&&this.Mv.contentWindow){const r=JSON.stringify({"action":t,"valueType":n||"","value":e||""});this.Mv.contentWindow.postMessage(r,"*")}}))}jb(){this.rb("play")}Ob(){this.rb("pause")}mj(){this.rb("stop")}dj(t){const n=parseFloat(t&&t.time);l(n)&&this.rb("seekTo","time",n);const e=parseFloat(t&&t.percent);var r;l(e)&&this.rb("seekTo","percent",(r=e,a(!0),Math.min(Math.max(r,0),1)))}};t.registerElement("amp-bodymovin-animation",st)})();
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */}});
//# sourceMappingURL=amp-bodymovin-animation-0.1.mjs.map