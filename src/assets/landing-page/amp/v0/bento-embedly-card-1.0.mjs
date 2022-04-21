;
import{defineBentoElement as e}from"../bento.mjs";function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function n(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function r(e){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{};r%2?n(Object(o),!0).forEach((function(n){t(e,n,o[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}import{createElement as o}from"../bento.mjs";import{PreactBaseElement as a}from"../bento.mjs";function l(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}var{isArray:s}=Array;function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function u(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var{hasOwnProperty:c,toString:m}=Object.prototype;function f(e){const t=Object.getOwnPropertyDescriptor(e,"message");if(null!=t&&t.writable)return e;const{message:n,stack:r}=e,o=new Error(n);for(const t in e)o[t]=e[t];return o.stack=r,o}function d(e){let t=null,n="";for(var r,o=u(arguments,!0);!(r=o()).done;){const e=r.value;e instanceof Error&&!t?t=f(e):(n&&(n+=" "),n+=e)}return t?n&&(t.message=n+": "+t.message):t=new Error(n),t}function b(e){var t,n;null===(t=(n=self).__AMP_REPORT_ERROR)||void 0===t||t.call(n,e)}import{createElement as p}from"../bento.mjs";import{useCallback as y,useContext as v,useState as g}from"../bento.mjs";import{forwardRef as j}from"../bento.mjs";import{useValueRef as w}from"../bento.mjs";import{createElement as S}from"../bento.mjs";import{useEffect as O,useImperativeHandle as h,useLayoutEffect as E,useMemo as x,useRef as R,useState as A}from"../bento.mjs";import{forwardRef as $}from"../bento.mjs";import{createElement as k}from"../bento.mjs";import{useCallback as H,useEffect as I,useImperativeHandle as F,useLayoutEffect as z,useRef as L}from"../bento.mjs";import{forwardRef as B}from"../bento.mjs";import{ContainWrapper as C,useValueRef as M}from"../bento.mjs";import{useAmpContext as q,useLoading as N}from"../bento.mjs";var P=["allow","allowFullScreen","iframeStyle","name","title","matchesMessagingOrigin","messageHandler","ready","loading","onReadyState","sandbox","src"],U=()=>!1,V=B((function(e,t){let{allow:n,allowFullScreen:o,iframeStyle:a,name:s,title:i,matchesMessagingOrigin:u=U,messageHandler:c,ready:m=!0,loading:f,onReadyState:d,sandbox:b,src:p}=e,y=l(e,P);const{playable:v}=q(),g=N(f),j="unload"!==g,w=L(!1),S=M(d),O=H((e=>{if(e!==w.current){w.current=e;const t=S.current;null==t||t(e?"complete":"loading")}}),[S]),h=L(null);return F(t,(()=>({get readyState(){return w.current?"complete":"loading"},get node(){return h.current}})),[]),z((()=>{j||O(!1)}),[j,O]),I((()=>{const e=h.current;if(!v&&e){const{src:t}=e;(e=>!(!e||"about:blank"==e||e.includes("#")))(t)?e.src=e.src:e.parentNode.insertBefore(e,e.nextSibling)}}),[v]),z((()=>{const e=h.current;if(!e||!j)return;const t=e=>{const t=h.current;t&&e.source==t.contentWindow&&u(e.origin)&&c(e)},{defaultView:n}=e.ownerDocument;return n.addEventListener("message",t),()=>n.removeEventListener("message",t)}),[u,c,j,m]),k(C,r(r({},y),{},{layout:!0,size:!0,paint:!0}),j&&m&&k("iframe",{allow:n,allowFullScreen:o,frameBorder:"0",loading:g,name:s,onLoad:()=>O(!0),part:"iframe",ref:h,sandbox:b,scrolling:"no",src:p,style:r(r({},a),{},{width:"100%",height:"100%",contentVisibility:"auto"}),title:i}))}));V.displayName="IframeEmbed";var G=self.AMP_CONFIG||{},J=("string"==typeof G.thirdPartyFrameRegex?new RegExp(G.thirdPartyFrameRegex):G.thirdPartyFrameRegex,("string"==typeof G.cdnProxyRegex?new RegExp(G.cdnProxyRegex):G.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/);function K(e){if(!self.document||!self.document.head)return null;if(self.location&&J.test(self.location.origin))return null;const t=self.document.head.querySelector(`meta[name="${e}"]`);return t&&t.getAttribute("content")||null}var T,_=G.thirdPartyUrl||"https://3p.ampproject.net",Z=G.thirdPartyFrameHost||"ampproject.net";function D(e){return`${_}/2203281422000/vendor/${e}.mjs`}function Q(e){let t;if(e.crypto&&e.crypto.getRandomValues){const n=new Uint32Array(2);e.crypto.getRandomValues(n),t=String(n[0])+n[1]}else t=String(e.Math.random()).substr(2)+"0";return t}G.cdnUrl||K("runtime-host"),G.errorReportingUrl,G.betaErrorReportingUrl,G.localDev,G.geoApiUrl||K("amp-geo-api"),self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null},self.__AMP_LOG,new Set(["c","v","a","ad"]);var W=["allow","excludeSandbox","name","messageHandler","options","sandbox","src","type","title"],X={},Y="sync-xhr 'none'",ee=["allow-top-navigation-by-user-activation","allow-popups-to-escape-sandbox"].join(" ")+" "+["allow-forms","allow-modals","allow-pointer-lock","allow-popups","allow-same-origin","allow-scripts"].join(" "),te=$((function(e,t){let{allow:n=Y,excludeSandbox:o,name:a,messageHandler:s,options:i,sandbox:u=ee,src:c,type:m,title:f=m}=e,d=l(e,W);if(b=n,"number"!=typeof y&&(y=0),y+(p=Y).length>b.length||-1===b.indexOf(p,y))throw new Error(`'allow' prop must contain "${Y}". Found "${n}".`);var b,p,y;const v=R(null),g=R(null),j=x((()=>(X[m]||(X[m]=function(){let e=0;return()=>String(++e)}()),X[m]())),[m]),[w,$]=A({name:a,src:c}),{name:k,src:H}=w,I=R(null);return E((()=>{var e,t;const n=null===(e=v.current)||void 0===e||null===(t=e.ownerDocument)||void 0===t?void 0:t.defaultView,o=null!=c?c:n?((l=n).__AMP_DEFAULT_BOOTSTRAP_SUBDOMAIN=l.__AMP_DEFAULT_BOOTSTRAP_SUBDOMAIN||"d-"+Q(l),"https://"+l.__AMP_DEFAULT_BOOTSTRAP_SUBDOMAIN+`.${Z}/2203281422000/frame.html`):"about:blank";var l;if(a)return void $({name:a,src:o});if(!n)return;I.current||(I.current=function(e){let t=0;for(let n=e;n&&n!=n.parent;n=n.parent)t++;return String(t)+"-"+Q(e)}(n));const s=Object.assign({"location":{"href":n.location.href},"sentinel":I.current}),u=r({"title":f,"type":m,"_context":s},i);var d;$({name:JSON.stringify({"host":(d=o,T||(T=self.document.createElement("a")),function(e,t,n){return e.href="",new URL(t,e.href)}(T,d)).hostname,"bootstrap":D(m),"type":m,"count":j,"attributes":u}),src:o})}),[j,a,i,c,f,m]),O((()=>{var e;const t=null===(e=g.current)||void 0===e?void 0:e.node;t&&t.parentNode.insertBefore(t,t.nextSibling)}),[k]),h(t,(()=>({get readyState(){var e;return null===(e=g.current)||void 0===e?void 0:e.readyState},get node(){var e;return null===(e=g.current)||void 0===e?void 0:e.node}})),[]),S(V,r(r({},d),{},{allow:n,contentRef:v,messageHandler:s,name:k,ref:g,ready:!!k,sandbox:o?void 0:u,src:H,title:f}))}));te.displayName="ProxyIframeEmbed";import{createContext as ne}from"../bento.mjs";var re=ne({apiKey:""}),oe=["onLoad","requestResize","style","title","url"],ae=j((function(e,t){let{onLoad:n,requestResize:o,style:a,title:s,url:i}=e,u=l(e,oe);const[c,m]=g(null),f=w(n),j=y((e=>{const t=function(e){if(!function(e){return"string"==typeof e&&e.startsWith("amp-")&&-1!=e.indexOf("{")}(e))return null;const t=e.indexOf("{");return function(e,t){try{return function(e){return JSON.parse(e)}(e)}catch(e){return null==t||t(e),null}}(e.substr(t),(t=>{!function(e){const t=d.apply(null,arguments);setTimeout((()=>{throw b(t),t}))}(new Error(`MESSAGING: Failed to parse message: ${e}\n${t.message}`))}))}(e.data);if("embed-size"==t.type){var n;const e=t.height;o?(o(e),m("100%")):m(e),null===(n=f.current)||void 0===n||n.call(f)}}),[o,f]),{apiKey:S}=v(re);(function(e){return!!e})(i)||console.warn("url prop is required for BentoEmbedlyCard");const O={url:i};return S&&(O["data-card-key"]=S),p(te,r(r({options:O,ref:t,title:s||"Embedly card",type:"embedly"},u),{},{messageHandler:j,style:c?r(r({},a),{},{height:c}):a}))}));ae.displayName="BentoEmbedlyCard";var le=class extends a{};le.Component=function(e){const t=document.querySelector("amp-embedly-key"),n=(null==t?void 0:t.getAttribute("value"))||"";return o(re.Provider,{value:n},o(ae,r({},e)))},le.props={"title":{attr:"title"},"url":{attr:"data-url"}},le.layoutSizeDefined=!0,le.usesShadowDom=!0;import{PreactBaseElement as se}from"../bento.mjs";e("bento-embedly-card",le,void 0),e("bento-embedly-key",class extends se{},void 0);
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */
//# sourceMappingURL=bento-embedly-card-1.0.mjs.map