;
!function(t){var n=self.BENTO=self.BENTO||{};(n.bento=n.bento||[]).push((function(t){"use strict";function n(t,r){return(n=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,r)}function r(t){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,n){if(n&&("object"===e(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function i(t,n,r){return n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}function u(t,n){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);n&&(e=e.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),r.push.apply(r,e)}return r}function a(t){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?u(Object(r),!0).forEach((function(n){i(t,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))}))}return t}function l(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,e=new Array(n);r<n;r++)e[r]=t[r];return e}function f(t,n){if(t){if("string"==typeof t)return l(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?l(t,n):void 0}}function c(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var e,o,i=[],u=!0,a=!1;try{for(r=r.call(t);!(u=(e=r.next()).done)&&(i.push(e.value),!n||i.length!==n);u=!0);}catch(t){a=!0,o=t}finally{try{u||null==r.return||r.return()}finally{if(a)throw o}}return i}}(t,n)||f(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t,n){if(null==t)return{};var r,e,o={},i=Object.keys(t);for(e=0;e<i.length;e++)r=i[e],n.indexOf(r)>=0||(o[r]=t[r]);return o}function d(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=f(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var e=0;return function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}Array.isArray;var v=Object.prototype;function p(t){var n=Object.getOwnPropertyDescriptor(t,"message");if(null!=n&&n.writable)return t;var r=t.message,e=t.stack,o=new Error(r);for(var i in t)o[i]=t[i];return o.stack=e,o}function b(t){for(var n,r=null,e="",o=d(arguments,!0);!(n=o()).done;){var i=n.value;i instanceof Error&&!r?r=p(i):(e&&(e+=" "),e+=i)}return r?e&&(r.message=e+": "+r.message):r=new Error(e),r}function m(t){var n,r;null===(n=(r=self).__AMP_REPORT_ERROR)||void 0===n||n.call(r,t)}v.hasOwnProperty,v.toString;var y;function h(t){if(!function(t){return"string"==typeof t&&t.startsWith("amp-")&&-1!=t.indexOf("{")}(t))return null;var n=t.indexOf("{");return-1!=n,function(t,n){try{return function(t){return JSON.parse(t)}(t)}catch(t){return null==n||n(t),null}}(t.substr(n),(function(n){!function(t){var n=b.apply(null,arguments);setTimeout((function(){throw m(n),n}))}(new Error("MESSAGING: Failed to parse message: ".concat(t,"\n").concat(n.message)))}))}var g="unload",w=(i(y={},"auto",0),i(y,"lazy",1),i(y,"eager",2),i(y,g,3),"loading"),j="complete",S=["allow","allowFullScreen","iframeStyle","name","title","matchesMessagingOrigin","messageHandler","ready","loading","onReadyState","sandbox","src"],O=function(){return!1},x=(0,t.forwardRef)((function(n,r){var e=n.allow,o=n.allowFullScreen,i=n.iframeStyle,u=n.name,l=n.title,f=n.matchesMessagingOrigin,c=void 0===f?O:f,d=n.messageHandler,v=n.ready,p=void 0===v||v,b=n.loading,m=n.onReadyState,y=n.sandbox,h=n.src,x=s(n,S),E=(0,t.useAmpContext)().playable,R=(0,t.useLoading)(b),A=R!==g,I=(0,t.useRef)(!1),z=(0,t.useValueRef)(m),F=(0,t.useCallback)((function(t){if(t!==I.current){I.current=t;var n=z.current;null==n||n(t?j:w)}}),[z]),H=(0,t.useRef)(null);return(0,t.useImperativeHandle)(r,(function(){return{get readyState(){return I.current?j:w},get node(){return H.current}}}),[]),(0,t.useLayoutEffect)((function(){A||F(!1)}),[A,F]),(0,t.useEffect)((function(){var t=H.current;!E&&t&&(function(t){return!(!t||"about:blank"==t||t.includes("#"))}(t.src)?t.src=t.src:t.parentNode.insertBefore(t,t.nextSibling))}),[E]),(0,t.useLayoutEffect)((function(){var t=H.current;if(t&&A){var n=function(t){var n=H.current;n&&t.source==n.contentWindow&&c(t.origin)&&d(t)},r=t.ownerDocument.defaultView;return r.addEventListener("message",n),function(){return r.removeEventListener("message",n)}}}),[c,d,A,p]),(0,t.createElement)(t.ContainWrapper,a(a({},x),{},{layout:!0,size:!0,paint:!0}),A&&p&&(0,t.createElement)("iframe",{allow:e,allowFullScreen:o,frameBorder:"0",loading:R,name:u,onLoad:function(){return F(!0)},part:"iframe",ref:H,sandbox:y,scrolling:"no",src:h,style:a(a({},i),{},{width:"100%",height:"100%",contentVisibility:"auto"}),title:l}))}));x.displayName="IframeEmbed";var E=self.AMP_CONFIG||{},R=("string"==typeof E.thirdPartyFrameRegex?new RegExp(E.thirdPartyFrameRegex):E.thirdPartyFrameRegex)||/^d-\d+\.ampproject\.net$/,A=("string"==typeof E.cdnProxyRegex?new RegExp(E.cdnProxyRegex):E.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/;function I(t){if(!self.document||!self.document.head)return null;if(self.location&&A.test(self.location.origin))return null;var n=self.document.head.querySelector('meta[name="'.concat(t,'"]'));return n&&n.getAttribute("content")||null}var z={thirdParty:E.thirdPartyUrl||"https://3p.ampproject.net",thirdPartyFrameHost:E.thirdPartyFrameHost||"ampproject.net",thirdPartyFrameRegex:R,cdn:E.cdnUrl||I("runtime-host")||"https://cdn.ampproject.org",cdnProxyRegex:A,localhostRegex:/^https?:\/\/localhost(:\d+)?$/,errorReporting:E.errorReportingUrl||"https://us-central1-amp-error-reporting.cloudfunctions.net/r",betaErrorReporting:E.betaErrorReportingUrl||"https://us-central1-amp-error-reporting.cloudfunctions.net/r-beta",localDev:E.localDev||!1,trustedViewerHosts:[/(^|\.)google\.(com?|[a-z]{2}|com?\.[a-z]{2}|cat)$/,/(^|\.)gmail\.(com|dev)$/],geoApi:E.geoApiUrl||I("amp-geo-api")};self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null},self.__AMP_LOG;var F,H,P=function(){function t(t){this.St=t,this.It=0,this.Ct=0,this.Ot=Object.create(null)}var n=t.prototype;return n.has=function(t){return!!this.Ot[t]},n.get=function(t){var n=this.Ot[t];if(n)return n.access=++this.Ct,n.payload},n.put=function(t,n){this.has(t)||this.It++,this.Ot[t]={payload:n,access:this.Ct},this.Rt()},n.Rt=function(){if(!(this.It<=this.St)){var t,n=this.Ot,r=this.Ct+1;for(var e in n){var o=n[e].access;o<r&&(r=o,t=e)}void 0!==t&&(delete n[t],this.It--)}},t}();function $(t){return"".concat(z.thirdParty,"/").concat("2203281422000","/vendor/").concat(t).concat(".js")}function T(t){var n;if(t.crypto&&t.crypto.getRandomValues){var r=new Uint32Array(2);t.crypto.getRandomValues(r),n=String(r[0])+r[1]}else n=String(t.Math.random()).substr(2)+"0";return n}new Set(["c","v","a","ad"]);var G=["allow","excludeSandbox","name","messageHandler","options","sandbox","src","type","title"],k={},B="sync-xhr 'none'",M=["allow-top-navigation-by-user-activation","allow-popups-to-escape-sandbox"].join(" ")+" "+["allow-forms","allow-modals","allow-pointer-lock","allow-popups","allow-same-origin","allow-scripts"].join(" "),N=(0,t.forwardRef)((function(n,r){var e,o,i=n.allow,u=void 0===i?B:i,l=n.excludeSandbox,f=n.name,d=n.messageHandler,v=n.options,p=n.sandbox,b=void 0===p?M:p,m=n.src,y=n.type,h=n.title,g=void 0===h?y:h,w=s(n,G);if("number"!=typeof o&&(o=0),o+B.length>(e=u).length||-1===e.indexOf("sync-xhr 'none'",o))throw new Error("'allow' prop must contain \"".concat(B,'". Found "').concat(u,'".'));var j=(0,t.useRef)(null),S=(0,t.useRef)(null),O=(0,t.useMemo)((function(){var t;return k[y]||(k[y]=(t=0,function(){return String(++t)})),k[y]()}),[y]),E=c((0,t.useState)({name:f,src:m}),2),R=E[0],A=E[1],I=R.name,N=R.src,D=(0,t.useRef)(null);return(0,t.useLayoutEffect)((function(){var t,n,r,e,o,i,u,l=null===(t=j.current)||void 0===t||null===(n=t.ownerDocument)||void 0===n?void 0:n.defaultView,c=null!=m?m:l?(o=e||"frame",(r=l).__AMP_DEFAULT_BOOTSTRAP_SUBDOMAIN=r.__AMP_DEFAULT_BOOTSTRAP_SUBDOMAIN||"d-"+T(r),"https://"+r.__AMP_DEFAULT_BOOTSTRAP_SUBDOMAIN+".".concat(z.thirdPartyFrameHost,"/").concat("2203281422000","/")+"".concat(o,".html")):"about:blank";if(f)A({name:f,src:c});else if(l){D.current||(D.current=function(t){for(var n=0,r=t;r&&r!=r.parent;r=r.parent)n++;return String(n)+"-"+T(t)}(l));var s=Object.assign({"location":{"href":l.location.href},"sentinel":D.current}),d=a({"title":g,"type":y,"_context":s},v);A({name:JSON.stringify({"host":(i=c,F||(F=self.document.createElement("a"),H=self.__AMP_URL_CACHE||(self.__AMP_URL_CACHE=new P(100))),function(t,n,r){if(r&&r.has(n))return r.get(n);t.href=n,t.protocol||(t.href=t.href);var e,o={href:t.href,protocol:t.protocol,host:t.host,hostname:t.hostname,port:"0"==t.port?"":t.port,pathname:t.pathname,search:t.search,hash:t.hash,origin:null};"/"!==o.pathname[0]&&(o.pathname="/"+o.pathname),("http:"==o.protocol&&80==o.port||"https:"==o.protocol&&443==o.port)&&(o.port="",o.host=o.hostname),e=t.origin&&"null"!=t.origin?t.origin:"data:"!=o.protocol&&o.host?o.protocol+"//"+o.host:o.href,o.origin=e;var i=o;return r&&r.put(n,i),i}(F,i,u?null:H)).hostname,"bootstrap":$(y),"type":y,"count":O,"attributes":d}),src:c})}}),[O,f,v,m,g,y]),(0,t.useEffect)((function(){var t,n=null===(t=S.current)||void 0===t?void 0:t.node;n&&n.parentNode.insertBefore(n,n.nextSibling)}),[I]),(0,t.useImperativeHandle)(r,(function(){return{get readyState(){var t;return null===(t=S.current)||void 0===t?void 0:t.readyState},get node(){var t;return null===(t=S.current)||void 0===t?void 0:t.node}}}),[]),(0,t.createElement)(x,a(a({},w),{},{allow:u,contentRef:j,messageHandler:d,name:I,ref:S,ready:!!I,sandbox:l?void 0:b,src:N,title:g}))}));N.displayName="ProxyIframeEmbed";var D=["gistId","file","title","requestResize","style"],J=function(t){!function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),r&&n(t,r)}(a,t);var e,i,u=(e=a,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,n=r(e);if(i){var u=r(this).constructor;t=Reflect.construct(n,arguments,u)}else t=n.apply(this,arguments);return o(this,t)});function a(){return u.apply(this,arguments)}return a}(t.PreactBaseElement);J.Component=function(n){var r=n.gistId,e=n.file,o=n.title,i=void 0===o?"Github Gist":o,u=n.requestResize,l=n.style,f=s(n,D),d=(0,t.useRef)(null),v=c((0,t.useState)(null),2),p=v[0],b=v[1],m=(0,t.useCallback)((function(t){var n=h(t.data);if("embed-size"==n.type){var r=n.height;u?(u(r),b("100%")):b(r)}}),[u]);(0,t.useEffect)((function(){return function(){d.current=null}}),[]);var y=(0,t.useMemo)((function(){return{gistid:r,file:e}}),[r,e]);return(0,t.createElement)(N,a({title:i,options:y,ref:d,type:"github",messageHandler:m,style:p?a(a({},l),{},{height:p}):l},f))},J.props={"gistId":{attr:"data-gistid"},"file":{attr:"data-file"}},J.layoutSizeDefined=!0,J.usesShadowDom=!0,(0,t.defineBentoElement)("bento-gist",J,undefined)}))}();
//# sourceMappingURL=bento-gist-1.0.js.map