;
!function(e){var t=self.BENTO=self.BENTO||{};(t.bento=t.bento||[]).push((function(e){"use strict";function t(e,n){return(t=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,n)}function n(e){return(n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function c(e,t){if(e){if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}}(e,t)||c(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}function d(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=c(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}Array.isArray;var v=Object.prototype;function m(e){var t=Object.getOwnPropertyDescriptor(e,"message");if(null!=t&&t.writable)return e;var n=e.message,r=e.stack,o=new Error(n);for(var i in e)o[i]=e[i];return o.stack=r,o}function b(e){for(var t,n=null,r="",o=d(arguments,!0);!(t=o()).done;){var i=t.value;i instanceof Error&&!n?n=m(i):(r&&(r+=" "),r+=i)}return n?r&&(n.message=r+": "+n.message):n=new Error(r),n}function p(e){var t,n;null===(t=(n=self).__AMP_REPORT_ERROR)||void 0===t||t.call(n,e)}v.hasOwnProperty,v.toString;var y;function h(e){if(!function(e){return"string"==typeof e&&e.startsWith("amp-")&&-1!=e.indexOf("{")}(e))return null;var t=e.indexOf("{");return-1!=t,function(e,t){try{return function(e){return JSON.parse(e)}(e)}catch(e){return null==t||t(e),null}}(e.substr(t),(function(t){!function(e){var t=b.apply(null,arguments);setTimeout((function(){throw p(t),t}))}(new Error("MESSAGING: Failed to parse message: ".concat(e,"\n").concat(t.message)))}))}var g="unload",w=(i(y={},"auto",0),i(y,"lazy",1),i(y,"eager",2),i(y,g,3),"loading"),j="complete",S=["allow","allowFullScreen","iframeStyle","name","title","matchesMessagingOrigin","messageHandler","ready","loading","onReadyState","sandbox","src"],O=function(){return!1},x=(0,e.forwardRef)((function(t,n){var r=t.allow,o=t.allowFullScreen,i=t.iframeStyle,a=t.name,l=t.title,c=t.matchesMessagingOrigin,f=void 0===c?O:c,d=t.messageHandler,v=t.ready,m=void 0===v||v,b=t.loading,p=t.onReadyState,y=t.sandbox,h=t.src,x=s(t,S),R=(0,e.useAmpContext)().playable,E=(0,e.useLoading)(b),A=E!==g,P=(0,e.useRef)(!1),z=(0,e.useValueRef)(p),I=(0,e.useCallback)((function(e){if(e!==P.current){P.current=e;var t=z.current;null==t||t(e?j:w)}}),[z]),T=(0,e.useRef)(null);return(0,e.useImperativeHandle)(n,(function(){return{get readyState(){return P.current?j:w},get node(){return T.current}}}),[]),(0,e.useLayoutEffect)((function(){A||I(!1)}),[A,I]),(0,e.useEffect)((function(){var e=T.current;!R&&e&&(function(e){return!(!e||"about:blank"==e||e.includes("#"))}(e.src)?e.src=e.src:e.parentNode.insertBefore(e,e.nextSibling))}),[R]),(0,e.useLayoutEffect)((function(){var e=T.current;if(e&&A){var t=function(e){var t=T.current;t&&e.source==t.contentWindow&&f(e.origin)&&d(e)},n=e.ownerDocument.defaultView;return n.addEventListener("message",t),function(){return n.removeEventListener("message",t)}}}),[f,d,A,m]),(0,e.createElement)(e.ContainWrapper,u(u({},x),{},{layout:!0,size:!0,paint:!0}),A&&m&&(0,e.createElement)("iframe",{allow:r,allowFullScreen:o,frameBorder:"0",loading:E,name:a,onLoad:function(){return I(!0)},part:"iframe",ref:T,sandbox:y,scrolling:"no",src:h,style:u(u({},i),{},{width:"100%",height:"100%",contentVisibility:"auto"}),title:l}))}));x.displayName="IframeEmbed";var R=self.AMP_CONFIG||{},E=("string"==typeof R.thirdPartyFrameRegex?new RegExp(R.thirdPartyFrameRegex):R.thirdPartyFrameRegex)||/^d-\d+\.ampproject\.net$/,A=("string"==typeof R.cdnProxyRegex?new RegExp(R.cdnProxyRegex):R.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/;function P(e){if(!self.document||!self.document.head)return null;if(self.location&&A.test(self.location.origin))return null;var t=self.document.head.querySelector('meta[name="'.concat(e,'"]'));return t&&t.getAttribute("content")||null}var z={thirdParty:R.thirdPartyUrl||"https://3p.ampproject.net",thirdPartyFrameHost:R.thirdPartyFrameHost||"ampproject.net",thirdPartyFrameRegex:E,cdn:R.cdnUrl||P("runtime-host")||"https://cdn.ampproject.org",cdnProxyRegex:A,localhostRegex:/^https?:\/\/localhost(:\d+)?$/,errorReporting:R.errorReportingUrl||"https://us-central1-amp-error-reporting.cloudfunctions.net/r",betaErrorReporting:R.betaErrorReportingUrl||"https://us-central1-amp-error-reporting.cloudfunctions.net/r-beta",localDev:R.localDev||!1,trustedViewerHosts:[/(^|\.)google\.(com?|[a-z]{2}|com?\.[a-z]{2}|cat)$/,/(^|\.)gmail\.(com|dev)$/],geoApi:R.geoApiUrl||P("amp-geo-api")};self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null},self.__AMP_LOG;var I,T,F=function(){function e(e){this.St=e,this.It=0,this.Ct=0,this.Ot=Object.create(null)}var t=e.prototype;return t.has=function(e){return!!this.Ot[e]},t.get=function(e){var t=this.Ot[e];if(t)return t.access=++this.Ct,t.payload},t.put=function(e,t){this.has(e)||this.It++,this.Ot[e]={payload:t,access:this.Ct},this.Rt()},t.Rt=function(){if(!(this.It<=this.St)){var e,t=this.Ot,n=this.Ct+1;for(var r in t){var o=t[r].access;o<n&&(n=o,e=r)}void 0!==e&&(delete t[e],this.It--)}},e}();function H(e){return"".concat(z.thirdParty,"/").concat("2203281422000","/vendor/").concat(e).concat(".js")}function $(e){var t;if(e.crypto&&e.crypto.getRandomValues){var n=new Uint32Array(2);e.crypto.getRandomValues(n),t=String(n[0])+n[1]}else t=String(e.Math.random()).substr(2)+"0";return t}new Set(["c","v","a","ad"]);var B=["allow","excludeSandbox","name","messageHandler","options","sandbox","src","type","title"],C={},L="sync-xhr 'none'",M=["allow-top-navigation-by-user-activation","allow-popups-to-escape-sandbox"].join(" ")+" "+["allow-forms","allow-modals","allow-pointer-lock","allow-popups","allow-same-origin","allow-scripts"].join(" "),k=(0,e.forwardRef)((function(t,n){var r,o,i=t.allow,a=void 0===i?L:i,l=t.excludeSandbox,c=t.name,d=t.messageHandler,v=t.options,m=t.sandbox,b=void 0===m?M:m,p=t.src,y=t.type,h=t.title,g=void 0===h?y:h,w=s(t,B);if("number"!=typeof o&&(o=0),o+L.length>(r=a).length||-1===r.indexOf("sync-xhr 'none'",o))throw new Error("'allow' prop must contain \"".concat(L,'". Found "').concat(a,'".'));var j=(0,e.useRef)(null),S=(0,e.useRef)(null),O=(0,e.useMemo)((function(){var e;return C[y]||(C[y]=(e=0,function(){return String(++e)})),C[y]()}),[y]),R=f((0,e.useState)({name:c,src:p}),2),E=R[0],A=R[1],P=E.name,k=E.src,N=(0,e.useRef)(null);return(0,e.useLayoutEffect)((function(){var e,t,n,r,o,i,a,l=null===(e=j.current)||void 0===e||null===(t=e.ownerDocument)||void 0===t?void 0:t.defaultView,f=null!=p?p:l?(o=r||"frame",(n=l).__AMP_DEFAULT_BOOTSTRAP_SUBDOMAIN=n.__AMP_DEFAULT_BOOTSTRAP_SUBDOMAIN||"d-"+$(n),"https://"+n.__AMP_DEFAULT_BOOTSTRAP_SUBDOMAIN+".".concat(z.thirdPartyFrameHost,"/").concat("2203281422000","/")+"".concat(o,".html")):"about:blank";if(c)A({name:c,src:f});else if(l){N.current||(N.current=function(e){for(var t=0,n=e;n&&n!=n.parent;n=n.parent)t++;return String(t)+"-"+$(e)}(l));var s=Object.assign({"location":{"href":l.location.href},"sentinel":N.current}),d=u({"title":g,"type":y,"_context":s},v);A({name:JSON.stringify({"host":(i=f,I||(I=self.document.createElement("a"),T=self.__AMP_URL_CACHE||(self.__AMP_URL_CACHE=new F(100))),function(e,t,n){if(n&&n.has(t))return n.get(t);e.href=t,e.protocol||(e.href=e.href);var r,o={href:e.href,protocol:e.protocol,host:e.host,hostname:e.hostname,port:"0"==e.port?"":e.port,pathname:e.pathname,search:e.search,hash:e.hash,origin:null};"/"!==o.pathname[0]&&(o.pathname="/"+o.pathname),("http:"==o.protocol&&80==o.port||"https:"==o.protocol&&443==o.port)&&(o.port="",o.host=o.hostname),r=e.origin&&"null"!=e.origin?e.origin:"data:"!=o.protocol&&o.host?o.protocol+"//"+o.host:o.href,o.origin=r;var i=o;return n&&n.put(t,i),i}(I,i,a?null:T)).hostname,"bootstrap":H(y),"type":y,"count":O,"attributes":d}),src:f})}}),[O,c,v,p,g,y]),(0,e.useEffect)((function(){var e,t=null===(e=S.current)||void 0===e?void 0:e.node;t&&t.parentNode.insertBefore(t,t.nextSibling)}),[P]),(0,e.useImperativeHandle)(n,(function(){return{get readyState(){var e;return null===(e=S.current)||void 0===e?void 0:e.readyState},get node(){var e;return null===(e=S.current)||void 0===e?void 0:e.node}}}),[]),(0,e.createElement)(x,u(u({},w),{},{allow:a,contentRef:j,messageHandler:d,name:P,ref:S,ready:!!P,sandbox:l?void 0:b,src:k,title:g}))}));k.displayName="ProxyIframeEmbed";var N=["embedCreated","embedLive","embedParent","embedType","requestResize","src","style","title","uuid"],q="100%",D=function(){return!0},G=(0,e.forwardRef)((function(t,n){var r=t.embedCreated,o=t.embedLive,i=t.embedParent,a=t.embedType,l=t.requestResize,c=t.src,d=t.style,v=t.title,m=void 0===v?"Reddit":v,b=t.uuid,p=s(t,N),y=f((0,e.useState)(q),2),g=y[0],w=y[1],j=(0,e.useCallback)((function(e){var t=h(e.data);if("embed-size"==t.type){var n=t.height;l?(l(n),w(q)):w(n)}}),[l]),S=(0,e.useMemo)((function(){return{embedCreated:r,embedLive:o,embedParent:i,embedType:a,requestResize:l,src:c,title:m,uuid:b}}),[r,o,i,a,l,c,m,b]);return(0,e.createElement)(k,u(u({ref:n,title:m},p),{},{options:S,type:"reddit",matchesMessagingOrigin:D,messageHandler:j,style:g?u(u({},d),{},{height:g}):d}))}));G.displayName="BentoReddit";var J=function(e){!function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&t(e,n)}(u,e);var r,i,a=(r=u,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=n(r);if(i){var a=n(this).constructor;e=Reflect.construct(t,arguments,a)}else e=t.apply(this,arguments);return o(this,e)});function u(){return a.apply(this,arguments)}return u}(e.PreactBaseElement);J.Component=G,J.props={"src":{attr:"data-src"},"embedType":{attr:"data-embedtype"},"uuid":{attr:"data-uuid"},"embedCreated":{attr:"data-embedcreated"},"embedParent":{attr:"data-embedparent"},"embedLive":{attr:"data-embedlive"},"title":{attr:"title"}},J.layoutSizeDefined=!0,J.usesShadowDom=!0,(0,e.defineBentoElement)("bento-reddit",J,undefined)}))}();
//# sourceMappingURL=bento-reddit-1.0.js.map