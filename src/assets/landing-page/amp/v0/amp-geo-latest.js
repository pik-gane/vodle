;
(self.AMP=self.AMP||[]).push({m:0,v:"2203281422000",n:"amp-geo",ev:"0.1",l:!0,f:function(n,t){!function(){function t(n,t){(null==t||t>n.length)&&(t=n.length);for(var r=0,e=new Array(t);r<t;r++)e[r]=n[r];return e}function r(n,r){var e="undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(e)return(e=e.call(n)).next.bind(e);if(Array.isArray(n)||(e=function(n,r){if(n){if("string"==typeof n)return t(n,r);var e=Object.prototype.toString.call(n).slice(8,-1);return"Object"===e&&n.constructor&&(e=n.constructor.name),"Map"===e||"Set"===e?Array.from(n):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?t(n,r):void 0}}(n))||r&&n&&"number"==typeof n.length){e&&(n=e);var o=0;return function(){return o>=n.length?{done:!0}:{done:!1,value:n[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var e;function o(n,t){return(o=Object.setPrototypeOf||function(n,t){return n.__proto__=t,n})(n,t)}function i(n){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)})(n)}function u(n){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function c(n,t){if(t&&("object"===u(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}(n)}var a=Array.isArray,f=Object.prototype,s=(f.hasOwnProperty,f.toString);function l(n){var t=Object.create(null);return n&&Object.assign(t,n),t}function v(n){return JSON.parse(n)}function p(n,t){for(var r=n.length,e=0;e<r;e++)t(n[e],e)}var d=/(?:^[#?]?|&)([^=&]+)(?:=([^&]*))?/g;function h(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";try{return decodeURIComponent(n)}catch(n){return t}}function m(n){var t,r=l();if(!n)return r;for(;t=d.exec(n);){var e=h(t[1],t[1]),o=t[2]?h(t[2].replace(/\+/g," "),t[2]):"";r[e]=o}return r}function y(n,t,r){return t in n?Object.defineProperty(n,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[t]=r,n}function b(n,t){var r=Object.keys(n);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(n);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.push.apply(r,e)}return r}function g(n){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){y(n,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(r,t))}))}return n}var O=self.AMP_CONFIG||{},j=("string"==typeof O.thirdPartyFrameRegex?new RegExp(O.thirdPartyFrameRegex):O.thirdPartyFrameRegex)||/^d-\d+\.ampproject\.net$/,S=("string"==typeof O.cdnProxyRegex?new RegExp(O.cdnProxyRegex):O.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/;function E(n){if(!self.document||!self.document.head)return null;if(self.location&&S.test(self.location.origin))return null;var t=self.document.head.querySelector('meta[name="'.concat(n,'"]'));return t&&t.getAttribute("content")||null}var w={thirdParty:O.thirdPartyUrl||"https://3p.ampproject.net",thirdPartyFrameHost:O.thirdPartyFrameHost||"ampproject.net",thirdPartyFrameRegex:j,cdn:O.cdnUrl||E("runtime-host")||"https://cdn.ampproject.org",cdnProxyRegex:S,localhostRegex:/^https?:\/\/localhost(:\d+)?$/,errorReporting:O.errorReportingUrl||"https://us-central1-amp-error-reporting.cloudfunctions.net/r",betaErrorReporting:O.betaErrorReportingUrl||"https://us-central1-amp-error-reporting.cloudfunctions.net/r-beta",localDev:O.localDev||!1,trustedViewerHosts:[/(^|\.)google\.(com?|[a-z]{2}|com?\.[a-z]{2}|cat)$/,/(^|\.)gmail\.(com|dev)$/],geoApi:O.geoApiUrl||E("amp-geo-api")};self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null};var I=self.__AMP_LOG;function R(n,t){throw new Error("failed to call initLogConstructor")}function A(n){return I.user||(I.user=P()),function(n,t){return t&&t.ownerDocument.defaultView!=n}(I.user.win,n)?I.userForEmbed||(I.userForEmbed=P()):I.user}function P(n){return R()}function T(){return I.dev||(I.dev=R())}function C(n,t,r,e,o,i,u,c,a,f,s){return n}function G(n,t){return N(n=function(n){return n.__AMP_TOP||(n.__AMP_TOP=n)}(n),t)}function x(n){return n.nodeType?(r=n,t=(r.ownerDocument||r).defaultView,G(t,"ampdoc")).getAmpDoc(n):n;var t,r}function N(n,t){C(F(n,t));var r=function(n){var t=n.__AMP_SERVICES;return t||(t=n.__AMP_SERVICES={}),t}(n)[t];return r.obj||(C(r.ctor),C(r.context),r.obj=new r.ctor(r.context),C(r.obj),r.context=null,r.resolve&&r.resolve(r.obj)),r.obj}function F(n,t){var r=n.__AMP_SERVICES&&n.__AMP_SERVICES[t];return!(!r||!r.ctor)}var L="__AMP__EXPERIMENT_TOGGLES",H=function(n){return t="url",r=x(n),F(o=(e=x(r)).isSingleDoc()?e.win:e,t)?N(o,t):null;var t,r,e,o},M={"preset-eea":["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IS","IE","IT","LV","LI","LT","LU","MT","NL","NO","PL","PT","RO","SK","SI","ES","SE","GB","AX","IC","EA","GF","PF","TF","GI","GP","GG","JE","MQ","YT","NC","RE","BL","MF","PM","SJ","VA","WF","EZ","CH"],"preset-us-ca":["us-ca"]},U="amp-geo",$="amp-iso-country-",z="amp-iso-subdivision-",_=new RegExp("".concat($,"(\\w+)")),B=new RegExp("".concat(z,"(\\w{2}-\\w{1,3})")),D="ampGeo",J=/^(?:(\w{2})(?:\s(\w{2}-\w{1,3}))?)?\s*/,Z=new RegExp("^amp-iso-country-|^amp-geo-group-|^"+z,"i"),X="unknown",V=function(n){!function(n,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&o(n,t)}(d,n);var t,u,f=(t=d,u=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(n){return!1}}(),function(){var n,r=i(t);if(u){var e=i(this).constructor;n=Reflect.construct(r,arguments,e)}else n=r.apply(this,arguments);return c(this,n)});function d(n){var t;return(t=f.call(this,n)).Iy=0,t.Qs=!1,t.Ry=X,t.Py=X,t.Ty=[],t.Cy=[],t}d.prerenderAllowed=function(){return!0};var h=d.prototype;return h.buildCallback=function(){var n,t,r=this,e=this.element.children;e.length&&this.Gy(1===e.length&&"SCRIPT"==(n=e[0]).tagName&&"APPLICATION/JSON"==(null===(t=n.getAttribute("type"))||void 0===t?void 0:t.toUpperCase()),"".concat(U,' can only have one <script type="application/json"> child'));var o=e.length?function(n,t){try{return v(n)}catch(n){return null==t||t(),null}}(e[0].textContent,(function(){return r.Gy(!1,"".concat(U," Unable to parse JSON"))})):{},i=this.Ny(o||{});Y.resolve(i)},h.Gy=function(n,t){return n||(Y.resolve(null),function(n,t,r,e,o,i,u,c,a,f,s){return A().assert(n,t,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0)}(n,t))},h.Fy=function(){return"{{AMP_ISO_COUNTRY_HOTPATCH}}"},h.Ly=function(n){var t,o,i,u,c,f=this,s=n.getBody(),p=n.getRootNode().documentElement,d=(null==p?void 0:p.className.match(_))||s.className.match(_),h=J.exec(this.Fy()),y=(t=this.win,o=(t||self).location,m(o.originalHash||o.hash))["amp-geo"];if(y&&null!==(i=this.win.AMP_CONFIG)&&void 0!==i&&i.canary){var b=J.exec(y.toLowerCase());b[1]&&(this.Ry=b[1],b[2]&&(this.Py=b[2]),this.Iy=2)}else if(!d||H(this.element).isProxyOrigin(this.win.location)&&(u=this.win,c=function(n){var t,e,o,i,u;if(n[L])return n[L];n[L]=l();var c=n[L],f=g(g({},null!==(t=n.AMP_CONFIG)&&void 0!==t?t:{}),null!==(e=n.AMP_EXP)&&void 0!==e?e:v((null===(o=n.__AMP_EXP)||void 0===o?void 0:o.textContent)||"{}"));for(var s in f){var p=f[s];"number"==typeof p&&p>=0&&p<=1&&(c[s]=Math.random()<p)}var d=null===(i=n.AMP_CONFIG)||void 0===i?void 0:i["allow-doc-opt-in"];if(a(d)&&d.length){var h=n.document.head.querySelector('meta[name="amp-experiments-opt-in"]');if(h)for(var y,b,O=r((null===(y=h.getAttribute("content"))||void 0===y?void 0:y.split(","))||[],!0);!(b=O()).done;){var j=b.value;d.includes(j)&&(c[j]=!0)}}Object.assign(c,function(n){var t,e="";try{var o;"localStorage"in n&&(e=null!==(o=n.localStorage.getItem("amp-experiment-toggles"))&&void 0!==o?o:"")}catch(n){T().warn("EXPERIMENTS","Failed to retrieve experiments from localStorage.")}for(var i,u=(null===(t=e)||void 0===t?void 0:t.split(/\s*,\s*/g))||[],c=l(),a=r(u,!0);!(i=a()).done;){var f=i.value;f&&("-"==f[0]?c[f.substr(1)]=!1:c[f]=!0)}return c}(n));var S=null===(u=n.AMP_CONFIG)||void 0===u?void 0:u["allow-url-opt-in"];if(a(S)&&S.length)for(var E,w=m(n.location.originalHash||n.location.hash),I=r(S,!0);!(E=I()).done;){var R=E.value,A=w["e-".concat(R)];"1"==A&&(c[R]=!0),"0"==A&&(c[R]=!1)}return c}(u),!c["amp-geo-ssr"]))h[1]?(this.Iy=0,this.Ry=h[1].toLowerCase(),h[2]&&(this.Py=h[2].toLowerCase())):""===h[0]&&w.geoApi?this.Iy=3:""===h[0]&&(this.Qs=!0,T().error(U,"GEONOTPATCHED: amp-geo served unpatched, ISO country not set"));else{this.Iy=1,this.Ry=d[1];var O=(null==p?void 0:p.className.match(B))||s.className.match(B);O&&(this.Py=O[1])}return 3!==this.Iy?e||(e=Promise.resolve(void 0)):this.Hy().then((function(n){if(n){var t=n.country,r=n.subdivision;f.Ry=t,r&&(f.Py="".concat(t,"-").concat(r))}else f.Qs=!0,T().error(U,"GEONOTPATCHED: amp-geo served unpatched and API response not valid, ISO country not set")}))},h.Uy=function(n){return"string"!=typeof n?(A().error(U,"geoApiUrl must be a string URL"),null):H(this.element).isSecure(n)?n:(A().error(U,"geoApiUrl must be secure (https)"),null)},h.Hy=function(){var n,t=this.Uy(w.geoApi);return t?(A().info(U,"API request is being used for country, this may result in FOUC"),(n=this.win,N(n,"timer")).timeoutPromise(6e4,function(n){return G(n,"xhr")}(this.win).fetchJson(t,{mode:"cors",method:"GET",credentials:"omit"}).then((function(n){return n.json()})).then((function(n){return/^[a-z]{2}$/i.test(n.country)?{country:n.country.toLowerCase(),subdivision:/^[a-z0-9]{1,3}$/i.test(n.subdivision)?n.subdivision.toLowerCase():null}:(A().error(U,'Invalid API response, expected schema not matched for property "country"'),null)})).catch((function(n){return A().error(U,"XHR country request failed",n),null})),"Timeout (".concat(60," sec) reached waiting for API response")).catch((function(n){return A().error(U,n),null}))):Promise.resolve(null)},h.$y=function(n){var t,r=this,e=n.ISOCountryGroups,o="<amp-geo> ISOCountryGroups";e&&(this.Gy((t=e,"[object Object]"===s.call(t)),"".concat(o," must be an object")),this.Cy=Object.keys(e),this.Cy.forEach((function(n){r.Gy(/^[a-z]+[a-z0-9]*$/i.test(n)&&!/^amp/.test(n),"".concat(o,"[").concat(n,"] name is invalid")),r.Gy(a(e[n]),"".concat(o,"[").concat(n,"] must be an array")),r.zy(e[n])&&r.Ty.push(n)})))},h.zy=function(n){var t=this,r=n.reduce((function(n,r){return/^preset-/.test(r)?(t.Gy(a(M[r]),"<amp-geo> preset ".concat(r," not found")),n.concat(M[r])):(r===X||/^[a-zA-Z]{2}(?:-[0-9a-zA-Z]{1,3})?$/.test(r)?n.push(r):A().error(U," country %s not valid, will be ignored",r),n)}),[]).map((function(n){return n.toLowerCase()}));return r.includes(this.Ry)||this.Py!==X&&r.includes(this.Py)},h._y=function(n,t){var r=new Set;return t&&p(t.classList,(function(n){Z.test(n)&&r.add(n)})),p(n.classList,(function(n){Z.test(n)&&r.add(n)})),r},h.Ny=function(n){var t=this,r=this.getAmpDoc(),e={};return r.whenReady().then((function(){return r.waitForBodyOpen()})).then((function(n){return t.Ly(r).then((function(){return n}))})).then((function(o){var i=r.getRootNode().documentElement;t.$y(n);var u=new Set;switch(t.Iy){case 2:u=t._y(o,i);case 0:case 3:e.ISOCountry=t.Ry,e.ISOSubdivision=t.Py;var c=t.Ty.map((function(n){return e[n]=!0,"amp-geo-group-"+n}));t.Ty.length||c.push("amp-geo-no-group"),t.Qs&&c.push("amp-geo-error"),e.ISOCountryGroups=t.Ty,c.push($+t.Ry),t.Py!==X&&c.push(z+t.Py),t.mutateElement((function(){var t=i&&i.classList,a=o.classList;if(u.add("amp-geo-pending"),u.forEach((function(n){a.remove(n),t&&t.remove(n)})),c.forEach((function(n){t&&t.add(n),a.add(n)})),n.AmpBind){var f=r.getElementById(D);f&&f.parentNode.removeChild(f);var s=r.win.document.createElement("amp-state"),l=r.win.document.createElement("script");l.setAttribute("type","application/json"),l.textContent=JSON.stringify(e),s.appendChild(l),s.id=D,o.appendChild(s)}}),i)}return{ISOCountry:t.Ry,ISOSubdivision:t.Py,matchedISOCountryGroups:t.Ty,allISOCountryGroups:t.Cy,isInCountryGroup:t.isInCountryGroup.bind(t)}}))},h.isInCountryGroup=function(n){var t=this,r=n.trim().split(/,\s*/);return r.filter((function(n){return t.Cy.indexOf(n)>=0})).length!==r.length?1:r.filter((function(n){return t.Ty.indexOf(n)>=0})).length>0?2:3},d}(n.BaseElement),Y=null;Y=new function(){var n=this;this.promise=new Promise((function(t,r){n.resolve=t,n.reject=r}))},n.registerElement(U,V),n.registerServiceForDoc("geo",(function(){return Y.promise}))}();
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */}});
//# sourceMappingURL=amp-geo-0.1.js.map