;
(self.AMP=self.AMP||[]).push({m:0,v:"2203281422000",n:"amp-autocomplete",ev:"0.1",l:!0,f:function(t,n){!function(){var n,e,i,r=Object.create,o=Object.defineProperty,u=Object.getOwnPropertyDescriptor,s=Object.getOwnPropertyNames,a=Object.getPrototypeOf,c=Object.prototype.hasOwnProperty,h=(n={"third_party/fuzzysearch/index.js":function(t,n){"use strict";n.exports=function(t,n){var e=n.length,i=t.length;if(i>e)return!1;if(i===e&&t===n)return!0;t:for(var r=0,o=0;r<i;r++){for(var u=t.charCodeAt(r);o<e;)if(n.charCodeAt(o++)===u)continue t;return!1}return!0}}},function(){return e||(0,n[Object.keys(n)[0]])((e={exports:{}}).exports,e),e.exports});function f(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,i=new Array(n);e<n;e++)i[e]=t[e];return i}function l(){return i||(i=Promise.resolve(void 0))}function p(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function d(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,i)}return e}function m(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?d(Object(e),!0).forEach((function(n){p(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):d(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function v(t){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function b(t,n){return(b=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function y(t){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function x(t,n){if(n&&("object"===v(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}var g=Array.isArray;function w(t,n,e){return"number"!=typeof e&&(e=0),!(e+n.length>t.length)&&-1!==t.indexOf(n,e)}var j=Object.prototype,O=j.hasOwnProperty,R=j.toString;function E(t){var n=Object.create(null);return t&&Object.assign(n,t),n}function S(t,n){return O.call(t,n)}function A(t,n){return S(t,n)?t[n]:void 0}function T(t,n){if("."==n)return t;for(var e,i=t,r=function(t,n){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(e)return(e=e.call(t)).next.bind(e);if(Array.isArray(t)||(e=function(t,n){if(t){if("string"==typeof t)return f(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?f(t,n):void 0}}(t))||t&&"number"==typeof t.length){e&&(t=e);var i=0;return function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(n.split("."));!(e=r()).done;){var o=e.value;if(!(o&&i&&void 0!==i[o]&&"object"==v(i)&&S(i,o))){i=void 0;break}i=i[o]}return i}function U(t,n,e,i,r,o,u,s,a,c,h){return t}function P(t,n){try{return function(t){return JSON.parse(t)}(t)}catch(t){return null==n||n(t),null}}function _(t){try{t.focus()}catch(t){}}function I(t,n){void 0===n&&(n=t.hasAttribute("hidden")),n?t.removeAttribute("hidden"):t.setAttribute("hidden","")}var k=self.AMP_CONFIG||{},z=("string"==typeof k.thirdPartyFrameRegex?new RegExp(k.thirdPartyFrameRegex):k.thirdPartyFrameRegex)||/^d-\d+\.ampproject\.net$/,C=("string"==typeof k.cdnProxyRegex?new RegExp(k.cdnProxyRegex):k.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/;function M(t){if(!self.document||!self.document.head)return null;if(self.location&&C.test(self.location.origin))return null;var n=self.document.head.querySelector('meta[name="'.concat(t,'"]'));return n&&n.getAttribute("content")||null}var $={thirdParty:k.thirdPartyUrl||"https://3p.ampproject.net",thirdPartyFrameHost:k.thirdPartyFrameHost||"ampproject.net",thirdPartyFrameRegex:z,cdn:k.cdnUrl||M("runtime-host")||"https://cdn.ampproject.org",cdnProxyRegex:C,localhostRegex:/^https?:\/\/localhost(:\d+)?$/,errorReporting:k.errorReportingUrl||"https://us-central1-amp-error-reporting.cloudfunctions.net/r",betaErrorReporting:k.betaErrorReportingUrl||"https://us-central1-amp-error-reporting.cloudfunctions.net/r-beta",localDev:k.localDev||!1,trustedViewerHosts:[/(^|\.)google\.(com?|[a-z]{2}|com?\.[a-z]{2}|cat)$/,/(^|\.)gmail\.(com|dev)$/],geoApi:k.geoApiUrl||M("amp-geo-api")},q=/(?:^[#?]?|&)([^=&]+)(?:=([^&]*))?/g;function N(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";try{return decodeURIComponent(t)}catch(t){return n}}self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null};var L=self.__AMP_LOG;function J(t){return L.user||(L.user=B()),function(t,n){return n&&n.ownerDocument.defaultView!=t}(L.user.win,t)?L.userForEmbed||(L.userForEmbed=B()):L.user}function B(t){return function(t,n){throw new Error("failed to call initLogConstructor")}()}function F(t,n,e,i,r,o,u,s,a,c,h){return t}function D(t,n,e,i,r,o,u,s,a,c,h){return J().assert(t,n,e,i,r,o,u,s,a,c,h)}function G(t,n){return Q(t=function(t){return t.__AMP_TOP||(t.__AMP_TOP=t)}(t),n)}function H(t,n){return Q(K(Z(t)),n)}function V(t,n){var e=K(Z(t));return W(e,n)?Q(e,n):null}function Z(t){return t.nodeType?(e=t,n=(e.ownerDocument||e).defaultView,G(n,"ampdoc")).getAmpDoc(t):t;var n,e}function K(t){var n=Z(t);return n.isSingleDoc()?n.win:n}function Q(t,n){F(W(t,n));var e=function(t){var n=t.__AMP_SERVICES;return n||(n=t.__AMP_SERVICES={}),n}(t)[n];return e.obj||(F(e.ctor),F(e.context),e.obj=new e.ctor(e.context),F(e.obj),e.context=null,e.resolve&&e.resolve(e.obj)),e.obj}function W(t,n){var e=t.__AMP_SERVICES&&t.__AMP_SERVICES[n];return!(!e||!e.ctor)}var X=function(t){return G(t,"batched-xhr")},Y=function(t){return G(t,"xhr")};function tt(t,n,e,i){var r={detail:e};if(Object.assign(r,i),"function"==typeof t.CustomEvent)return new t.CustomEvent(n,r);var o=t.document.createEvent("CustomEvent");return o.initCustomEvent(n,!!r.bubbles,!!r.cancelable,e),o}function nt(t){return!!t&&"function"==typeof t.getFormData}var et,it,rt=function(){function t(t){this.St=t,this.It=0,this.Ct=0,this.Ot=E()}var n=t.prototype;return n.has=function(t){return!!this.Ot[t]},n.get=function(t){var n=this.Ot[t];if(n)return n.access=++this.Ct,n.payload},n.put=function(t,n){this.has(t)||this.It++,this.Ot[t]={payload:n,access:this.Ct},this.Rt()},n.Rt=function(){if(!(this.It<=this.St)){var t,n=this.Ot,e=this.Ct+1;for(var i in n){var r=n[i].access;r<e&&(e=r,t=i)}void 0!==t&&(delete n[t],this.It--)}},t}(),ot=new Set(["c","v","a","ad"]),ut="__amp_source_origin",st=function(t){return"string"==typeof t?at(t):t};function at(t,n){return et||(et=self.document.createElement("a"),it=self.__AMP_URL_CACHE||(self.__AMP_URL_CACHE=new rt(100))),function(t,n,e){if(e&&e.has(n))return e.get(n);t.href=n,t.protocol||(t.href=t.href);var i,r={href:t.href,protocol:t.protocol,host:t.host,hostname:t.hostname,port:"0"==t.port?"":t.port,pathname:t.pathname,search:t.search,hash:t.hash,origin:null};"/"!==r.pathname[0]&&(r.pathname="/"+r.pathname),("http:"==r.protocol&&80==r.port||"https:"==r.protocol&&443==r.port)&&(r.port="",r.host=r.hostname),i=t.origin&&"null"!=t.origin?t.origin:"data:"!=r.protocol&&r.host?r.protocol+"//"+r.host:r.href,r.origin=i;var o=r;return e&&e.put(n,o),o}(et,t,n?null:it)}function ct(t,n){return"".concat(encodeURIComponent(t),"=").concat(encodeURIComponent(n))}function ht(t,n,e,i){return function(t,n,e){if(!n)return t;var i=t.split("#",2),r=i[0].split("?",2);return r[0]+(r[1]?e?"?".concat(n,"&").concat(r[1]):"?".concat(r[1],"&").concat(n):"?".concat(n))+(i[1]?"#".concat(i[1]):"")}(t,ct(n,e),i)}function ft(t){return"https:"==(t=st(t)).protocol||"localhost"==t.hostname||"127.0.0.1"==t.hostname||(e=".localhost",(i=(n=t.hostname).length-e.length)>=0&&n.indexOf(e,i)==i);var n,e,i}function lt(t,n){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"source";return D(null!=t,"%s %s must be available",n,e),D(ft(t)||/^\/\//.test(t),'%s %s must start with "https://" or "//" or be relative and served from either https or from localhost. Invalid value: %s',n,e,t),t}var pt=["GET","POST"],dt=[g,function(t){return"[object Object]"===R.call(t)}];function mt(t,n){var e=m({},n);if(nt(n.body)){var i=n.body;e.headers["Content-Type"]="multipart/form-data;charset=utf-8",e.body=function(t){for(var n=[],e=t.next();!e.done;e=t.next())n.push(e.value);return n}(i.entries())}return{input:t,init:e}}var vt,bt,yt=(vt=h(),function(t,n,e){if(n&&"object"==typeof n||"function"==typeof n)for(var i,r=s(n),a=0,h=r.length;a<h;a++)i=r[a],c.call(t,i)||"default"===i||o(t,i,{get:function(t){return n[t]}.bind(null,i),enumerable:!(e=u(n,i))||e.enumerable});return t}((bt=o(null!=vt?r(a(vt)):{},"default",vt&&vt.__esModule&&"default"in vt?{get:function(){return vt.default},enumerable:!0}:{value:vt,enumerable:!0}),o(bt,"__esModule",{value:!0})),vt)),xt=function(){function t(t){var n=t.element;this.Gn=n,this.Ns=this.Gn.getAttribute("inline"),D(""!==this.Ns,'Empty value for the "inline" attr is unsupported, %s. %s',"amp-autocomplete",n),D(""!==this.Ns,"AutocompleteBindingInline does not support an empty value in the constructor."),this.tU=null;var e=this.Ns.replace(/([()[{*+.$^\\|?])/g,"\\$1"),i="((".concat(e,"|^").concat(e,")(\\w+)?)");this.nU=new RegExp(i,"gm")}var n=t.prototype;return n.shouldAutocomplete=function(t){var n=this.eU(this.nU,t);return this.tU=n,!!n},n.eU=function(t,n){if(!t)return null;for(var e,i,r=n.selectionStart,o=n.value;null!==(e=t.exec(o))&&!(e[0].length+A(e,"index")>r);)i=e;return!i||i[0].length+A(i,"index")<r?null:i},n.getUserInputForUpdate=function(t){return this.tU&&this.tU[0]?this.tU[0].slice(this.Ns.length):""},n.getUserInputForUpdateWithSelection=function(t,n,e){if(!this.tU)return n.value;var i=n.selectionStart,r=Number(A(this.tU,"index")),o=e.length;i>=r+o&&(i-=o),_(n),i=i+t.length+1,n.setSelectionRange(i,i),this.tU=null;var u=n.value;return u.slice(0,r+this.Ns.length)+t+" "+u.slice(r+this.Ns.length+o)},n.resetInputOnWrapAround=function(t,n){},n.shouldSuggestFirst=function(){return this.Gn.hasAttribute("suggest-first")},n.shouldShowOnFocus=function(){return!1},n.displayActiveItemInInput=function(t,n,e){},n.removeSelectionHighlighting=function(t){},n.shouldPreventDefaultOnEnter=function(t){return t},t}(),gt=function(){function t(t){var n=t.element;this.iU=n.hasAttribute("suggest-first");var e=n.getAttribute("filter");this.iU&&"prefix"!==e&&(this.iU=!1,J().warn("AMP-AUTOCOMPLETE",'"suggest-first" expected "filter" type "prefix".')),this.rU=n.hasAttribute("submit-on-enter")}var n=t.prototype;return n.shouldAutocomplete=function(t){return!0},n.getUserInputForUpdate=function(t){return t.value||""},n.getUserInputForUpdateWithSelection=function(t,n,e){return t},n.resetInputOnWrapAround=function(t,n){n.value=t},n.shouldSuggestFirst=function(){return this.iU},n.shouldShowOnFocus=function(){return!0},n.displayActiveItemInInput=function(t,n,e){t.value=n,this.iU&&t.setSelectionRange(e.length,n.length)},n.removeSelectionHighlighting=function(t){var n=t.value.length;t.setSelectionRange(n,n)},n.shouldPreventDefaultOnEnter=function(t){return!this.rU},t}();function wt(t,n,e,i){var r=function(t){return V(t,"url-replace")}(t);return(e>=1?r.expandUrlAsync(n):Promise.resolve(n)).then((function(n){if(1===e){var o=r.collectDisallowedVarsSync(t);if(o.length>0)throw J().createError("URL variable substitutions in CORS fetches from dynamic URLs (e.g. via amp-bind) require opt-in. "+'Please add data-amp-replace="'.concat(o.join(" "),'" to the ')+"<".concat(t.tagName,"> element. See https://bit.ly/amp-var-subs."))}var u={};return t.hasAttribute("credentials")&&(u.credentials=t.getAttribute("credentials")),i&&(u.cache="reload"),{"xhrUrl":n,"fetchOpt":u}}))}var jt=function(){function t(t,n,e){this.co=n,this.Dy=e,this.oU=t}var n=t.prototype;return n.isEnabled=function(){var t=this.co.getAmpDoc();return!(!t.isSingleDoc()||!t.getRootNode().documentElement.hasAttribute("allow-viewer-render-template"))&&this.co.hasCapability("viewerRenderTemplate")},n.assertTrustedViewer=function(t){return this.co.isTrustedViewer().then((function(n){D(n,"Refused to attempt SSR in untrusted viewer: ",t)}))},n.ssr=function(t,n){var e,i=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return r||(e=this.Dy.maybeFindTemplate(t)),this.assertTrustedViewer(t).then((function(){return i.co.sendMessageAwaitResponse("viewerRenderTemplate",i.uU(n,e,r,o))}))},n.applySsrOrCsrTemplate=function(t,n){var e,i=this;return this.isEnabled()?(D("string"==typeof n.html,"Skipping template rendering due to failed fetch"),e=this.assertTrustedViewer(t).then((function(){return i.Dy.findAndSetHtmlForTemplate(t,n.html)}))):e=g(n)?this.Dy.findAndRenderTemplateArray(t,n):this.Dy.findAndRenderTemplate(t,n),e},n.uU=function(t,n,e){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},r={"type":this.oU},o="successTemplate",u=e&&e[o]?e[o]:n;u&&(r[o]={"type":"amp-mustache","payload":u.innerHTML});var s="errorTemplate",a=e&&e[s]?e[s]:null;a&&(r[s]={"type":"amp-mustache","payload":a.innerHTML}),i&&Object.assign(r,i);var c={"originalRequest":mt(t.xhrUrl,t.fetchOpt),"ampComponent":r};return c},t}(),Ot="amp-autocomplete",Rt="none",Et=function(t){!function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&b(t,n)}(r,t);var n,e,i=(n=r,e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,i=y(n);if(e){var r=y(this).constructor;t=Reflect.construct(i,arguments,r)}else t=i.apply(this,arguments);return x(this,t)});function r(t){var n,e,r,o;return(n=i.call(this,t)).Lo=null,n.sU=null,n.aU=null,n.cU="",n.dI="",n.hU=1,n.fU=null,n.iU=!1,n.lU=!1,n.pU=!1,n.dU="",n.mU="",n.vU=-1,n.bU=null,n.mz=t.id?t.id:Math.floor(100*Math.random()),n.Ft=null,n.yU=!1,n.xU=null,n.Dy=null,n.gU=!1,n.getSsrTemplateHelper=(e=!1,r=null,o=function(){return new jt(Ot,H(n.element,"viewer"),n.Dy)},function(){if(!e){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];r=o.apply(self,n),e=!0,o=null}return r}),n.wU=!1,n.Ks=null,n.Tu=null,n.jU=!1,n.OU=t.id?t.id:Math.floor(100*Math.random())+"_AMP_content_",n}var o=r.prototype;return o.buildCallback=function(){this.Dy=H(this.element,"templates"),this.Ks=V(this.element,"action"),this.Tu=H(this.element,"viewport"),this.aU=this.RU();var t=this.aU.getAttribute("type");D(!this.aU.hasAttribute("type")||"text"===t||"search"===t,'%s requires the "type" attribute to be "text" or "search" if present on <input>. %s',Ot,this.element),this.Lo=this.EU(),this.mU=this.element.getAttribute("query"),this.dU=this.element.getAttribute("src");var n=this.element.querySelector('script[type="application/json"]');n?this.sU=this.SU(n):this.element.hasAttribute("src")||J().warn(Ot,'Expected a <script type="application/json"> child or a URL specified in "src".'),this.aU.setAttribute("dir","auto"),this.aU.setAttribute("aria-autocomplete","both"),this.aU.setAttribute("role","textbox"),this.aU.setAttribute("aria-controls",this.OU),"INPUT"===this.aU.tagName&&(this.element.setAttribute("role","combobox"),this.aU.setAttribute("aria-multiline","false")),this.element.setAttribute("aria-haspopup","listbox"),this.element.setAttribute("aria-expanded","false"),this.element.setAttribute("aria-owns",this.OU);var e,i=this.AU();i&&i.hasAttribute("autocomplete")&&(this.xU=i.getAttribute("autocomplete")),this.wU=this.getSsrTemplateHelper().isEnabled(),this.gU=this.Dy.hasTemplate(this.element,"template, script[template]"),this.wU&&(D(this.dU,'%s requires data to be provided via "src" attribute for server-side rendering. %s',Ot,this.element),D(this.gU,"".concat(Ot,' should provide a <template> or <script type="plain/text"> element.')),D(!this.element.hasAttribute("filter"),"".concat(Ot," does not support client-side filter when server-side render is required."))),this.dI=this.element.getAttribute("filter")||Rt,D("substring"===(e=this.dI)||"prefix"===e||"token-prefix"===e||"fuzzy"===e||"custom"===e||"none"===e,"Unexpected filter: %s. %s",this.dI,this.element),this.hU=this.element.hasAttribute("min-characters")?parseInt(this.element.getAttribute("min-characters"),10):1,this.element.hasAttribute("max-entries")&&J().warn(Ot,'"max-items" attribute is preferred to "max-entries"');var r=this.element.getAttribute("max-items")||this.element.getAttribute("max-entries");return this.fU=r?parseInt(r,10):null,this.iU=this.Lo.shouldSuggestFirst(),this.pU=this.element.hasAttribute("highlight-user-entry"),this.Ft=this.TU(),this.element.appendChild(this.Ft),this.UU(),l()},o.UU=function(){var t=this;this.aU.addEventListener("touchstart",(function(){t.PU()}),{passive:!0}),this.aU.addEventListener("input",(function(){t._U()})),this.aU.addEventListener("keydown",(function(n){t.IU(n)})),this.aU.addEventListener("focus",(function(){t.PU().then((function(){var n=t.Lo.shouldShowOnFocus();t.kU(n)}))})),this.aU.addEventListener("blur",(function(){t.kU(!1)})),this.Ft.addEventListener("mousedown",(function(n){t.zU(n)}))},o.RU=function(){var t=this.element.querySelectorAll("input,textarea");return D(1==t.length,"%s should contain exactly one <input> or <textarea> descendant %s",Ot,this.element),t[0]},o.AU=function(){return this.aU.form||null},o.EU=function(){return this.element.hasAttribute("inline")?new xt(this):new gt(this)},o.SU=function(t){var n=P(t.textContent,(function(t){throw t})),e=this.element.getAttribute("items")||"items",i=T(n,e);return i?J().assertArray(i):(J().warn(Ot,'Expected key "%s" in data but found nothing. Rendering empty results.',e),[])},o.CU=function(){var t=this,n=this.getAmpDoc(),e=this.element.getAttribute("items")||"items";return this.MU(),this.wU?wt(this.element,this.element.getAttribute("src"),2,!1).then((function(n){var i,r,o;n.xhrUrl=(i=t.win,r=n.xhrUrl,o=n.fetchOpt,U("string"==typeof r),!1!==o.ampCors&&(r=function(t,n){!function(t){var n=function(t){var n,e=E();if(!t)return e;for(;n=q.exec(t);){var i=N(n[1],n[1]),r=n[2]?N(n[2].replace(/\+/g," "),n[2]):"";e[i]=r}return e}(at(t).search);D(!(ut in n),"Source origin is not allowed in %s",t)}(n);var e=function(t){return at(function(t){if(!function(t){return $.cdnProxyRegex.test(st(t).origin)}(t=st(t)))return t.href;var n=t.pathname.split("/"),e=n[1];D(ot.has(e),"Unknown path prefix in url %s",t.href);var i=n[2],r="s"==i?"https://"+decodeURIComponent(n[3]):"http://"+decodeURIComponent(i);return D(r.indexOf(".")>0,"Expected a . in origin %s",r),n.splice(1,"s"==i?3:2),r+n.join("/")+function(t,n){if(!t||"?"==t)return"";var e=new RegExp("[?&]".concat("(amp_(js[^&=]*|gsa|r|kit)|usqp)","\\b[^&]*"),"g"),i=t.replace(e,"").replace(/^[?&]/,"");return i?"?"+i:""}(t.search)+(t.hash||"")}(t)).origin}(t.location.href);return ht(n,ut,e)}(i,r)),r),n.fetchOpt=function(t,n,e){e=e||{};var i=function(t){return t.origin||at(t.location.href).origin}(t);return i==at(n).origin&&(e.headers=e.headers||{},e.headers["AMP-Same-Origin"]="true"),e}(t.win,n.xhrUrl,n.fetchOpt),function(t){var n=function(t,n){var e,i=t||{},r=i.credentials;return U(void 0===r||"include"==r||"omit"==r),i.method=void 0===(e=i.method)?"GET":(e=e.toUpperCase(),U(pt.includes(e)),e),i.headers=i.headers||{},i.headers.Accept=n,U(null!==i.body),i}(t,"application/json");if("POST"==n.method&&!nt(n.body)){U(dt.some((function(t){return t(n.body)}))),n.headers["Content-Type"]=n.headers["Content-Type"]||"text/plain;charset=utf-8";var e=n.headers["Content-Type"];n.body="application/x-www-form-urlencoded"===e?function(t){var n,e=[];for(var i in t){var r=t[i];if(null!=r){r=g(n=r)?n:[n];for(var o=0;o<r.length;o++)e.push(ct(i,r[o]))}}return e.join("&")}(n.body):JSON.stringify(n.body)}}(n.fetchOpt);var u={"ampAutocompleteAttributes":{"items":e,"maxItems":t.fU}};return t.getSsrTemplateHelper().ssr(t.element,n,null,u)})):function(t,n){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=e.expr,r=void 0===i?".":i,o=e.urlReplacement,u=void 0===o?0:o,s=e.refresh,a=void 0!==s&&s,c=e.xssiPrefix,h=void 0===c?void 0:c,f=e.url,l=void 0===f?n.getAttribute("src"):f;lt(l,n);var p=X(t.win);return wt(n,l,u,a).then((function(t){return p.fetchJson(t.xhrUrl,t.fetchOpt)})).then((function(n){return Y(t.win).xssiJson(n,h)})).then((function(t){if(null==t)throw new Error("Response is undefined.");return T(t,r||".")})).catch((function(t){throw J().createError("failed fetching JSON data",t)}))}(n,this.element,{expr:e,urlReplacement:2}).catch((function(){return J().warn(Ot,'Expected key "%s" in data but found nothing. Rendering empty results.',e),[]}))},o.MU=function(){if(this.mU){var t=this.$U(this.cU);this.element.setAttribute("src",t)}},o.$U=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return ht(this.dU,this.mU,t)},o.TU=function(){var t=this.element.ownerDocument.createElement("div");return t.classList.add("i-amphtml-autocomplete-results"),this.qU()&&t.classList.add("i-amphtml-autocomplete-results-up"),t.setAttribute("role","listbox"),t.setAttribute("id",this.OU),I(t,!1),t},o.layoutCallback=function(){return this.aU.setAttribute("autocomplete","off"),this.element.hasAttribute("prefetch")&&this.PU(),this.NU(this.sU,this.cU)},o.mutatedAttributesCallback=function(t){var n=this,e=t.src;return null==e?l():"string"==typeof e?(this.dU=e,this.CU().then((function(t){n.sU=t||[],n.NU(n.sU,n.cU)}),(function(t){n.LU(t)}))):"object"===v(e)?(this.sU=e.items||[],this.NU(this.sU,this.cU)):void J().error(Ot,'Unexpected "src" type: '+e)},o.JU=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",e=this.element.ownerDocument.createElement("div");e.classList.add("i-amphtml-autocomplete-item"),e.setAttribute("role","option"),e.setAttribute("data-value",t),e.setAttribute("dir","auto"),e.textContent=t;var i=e.childNodes[0],r=t.toLocaleLowerCase(),o=n.toLocaleLowerCase();if(this.pU&&n&&n.length<=t.length&&w(r,o)){var u=r.indexOf(o),s=this.element.ownerDocument.createElement("span");s.classList.add("autocomplete-partial"),s.appendChild(this.element.ownerDocument.createTextNode(t.slice(u,u+n.length)));var a=i.splitText(u);a.splitText(n.length),e.replaceChild(s,a)}return e},o._U=function(){var t=this;return this.Lo.shouldAutocomplete(this.aU)?this.BU():this.mutateElement((function(){t.FU()}))},o.BU=function(){var t=this,n=0===this.cU.length&&1===this.aU.value.length;return this.cU=this.Lo.getUserInputForUpdate(this.aU),(this.wU||this.mU?this.CU():Promise.resolve(this.sU)).then((function(e){return t.sU=e,t.mutateElement((function(){t.NU(t.sU,t.cU).then((function(){t.DU(n)}))}))}))},o.DU=function(t){this.GU(!0),this.iU&&(this.lU&&!t||this.HU(1),this.lU=!1)},o.zU=function(t){var n=this,e=t.target,i=this.VU(e),r=this.ZU(i),o=r.selectedObject,u=r.selectedText;return this.mutateElement((function(){n.KU(u,o)}))},o.NU=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return this.FU(),!t||n.length<this.hU?l():this.wU?S(t,"html")?this.QU(t,this.Ft,n):l():this.WU(t,n)},o.WU=function(t,n){if(!t.length)return l();var e=this.XU(t,n).map((function(t){var n=t;return"object"===v(t)&&(n=m(m({},t),{},{objToJson:function(){return JSON.stringify(t)}})),n}));return this.QU(e,this.Ft,n)},o.QU=function(t,n,e){var i=this,r=l();return this.YU(),this.gU?r=this.getSsrTemplateHelper().applySsrOrCsrTemplate(this.element,t).then((function(t){(g(t)?t:[t]).forEach((function(t){t.hasAttribute("data-disabled")?t.setAttribute("aria-disabled","true"):t.hasAttribute("data-value")||J().warn(Ot,'Expected a "data-value" or "data-disabled" attribute on the rendered template item. %s',t),t.classList.add("i-amphtml-autocomplete-item"),t.setAttribute("role","option"),n.appendChild(t)}))})):t.forEach((function(t){D("string"==typeof t,"%s data must provide template for non-string items. %s",Ot,i.element),n.appendChild(i.JU(t,e))})),r},o.XU=function(t,n){var e=this;if(this.dI===Rt)return this.RP(t);n=n.toLocaleLowerCase();var i=this.element.getAttribute("filter-value")||"value",r=t.filter((function(t){switch("object"===v(t)&&(t=T(t,i)),D("string"==typeof t,'%s data property "%s" must map to string type. %s',Ot,i,e.element),t=t.toLocaleLowerCase(),e.dI){case"substring":return w(t,n);case"prefix":return t.startsWith(n);case"token-prefix":return e.EP(t,n);case"fuzzy":return(0,yt.default)(n,t);case"custom":throw new Error("Filter not yet supported: %s",e.dI,e.element);default:throw new Error("Unexpected filter: %s",e.dI,e.element)}}));return this.RP(r)},o.EP=function(t,n){if(""===n)return!0;var e=this.TP(t),i=this.TP(n),r=this.UP(e),o=i[i.length-1];i.splice(i.length-1,1);for(var u=!0,s=0;s<i.length;s++){var a=i[s];if(""!==a){if(!S(r,a)){u=!1;break}var c=Number(A(r,a));c>1?r[a]=c-1:delete r[a]}}var h=Object.keys(r);return u&&(""===o||h.some((function(t){return t.startsWith(o)})))},o.TP=function(t){return(t=t.replace(/[\.]+/g,"")).split(/[`~(){}_|+\-;:\'",\[\]\\\/ ]+/g)},o.UP=function(t){var n=E();return t.forEach((function(t){var e=S(n,t)?A(n,t)+1:1;n[t]=e})),n},o.RP=function(t){return this.fU&&this.fU<t.length&&(t=t.slice(0,this.fU)),t},o.GU=function(t){this.aU.setAttribute("aria-expanded",t),I(this.Ft,t)},o.kU=function(t){var n=this,e=this.AU();e&&(t?e.setAttribute("autocomplete","off"):this.xU?e.setAttribute("autocomplete",this.xU):e.removeAttribute("autocomplete"));var i=!1;return this.measureMutateElement((function(){i=n.qU()}),(function(){t||(n.cU=n.aU.value,n.NU(n.sU,n.cU),n.YU()),n._P(i),n.GU(t)}))},o.PU=function(){var t=this;return this.jU||!this.element.hasAttribute("src")?l():(this.jU=!0,this.CU().then((function(n){t.sU=n,t.NU(t.sU)}),(function(n){t.LU(n)})))},o._P=function(t){this.Ft.classList.toggle("i-amphtml-autocomplete-results-up",t)},o.qU=function(){var t=this.Tu.getHeight()||0;return this.aU.getBoundingClientRect().top>t/2},o.IP=function(){return!this.Ft.hasAttribute("hidden")&&this.Ft.children.length>0},o.VU=function(t){return null===t?null:t.classList.contains("i-amphtml-autocomplete-item")?t:this.VU(t.parentElement)},o.ZU=function(t){if(null===t||t.hasAttribute("data-disabled"))return{selectedObject:null,selectedText:null};var n=this.kP(t);return this.zP(n),{selectedObject:this.CP(t),selectedText:n}},o.zP=function(t){this.aU.value=this.Lo.getUserInputForUpdateWithSelection(t,this.aU,this.cU),this.cU=this.Lo.getUserInputForUpdate(this.aU)},o.kP=function(t){return t.getAttribute("data-value")||t.textContent||""},o.CP=function(t){return t.hasAttribute("data-json")?P(t.getAttribute("data-json"),(function(t){throw t})):null},o.KU=function(t,n){null!==t&&(this.MP(t,n),this.FU(),this.GU(!1))},o.MP=function(t,n){var e="select",i=m({value:t},n&&{valueAsObject:n}),r=tt(this.win,"amp-autocomplete.".concat(e),i);this.Ks.trigger(this.element,e,r,3);var o=tt(this.win,"change",i,{bubbles:!0});this.aU.dispatchEvent(o)},o.HU=function(t){var n=this;if(0===t||!this.IP()||this.yU)return l();var e=-1===this.vU&&t<0?t:this.vU+t,i=this.$P();if(0===i.length)return l();var r,o,u,s,a=(r=e,o=i.length,r>0&&o>0?r%o:(r%o+o)%o),c=i[a],h=c.getAttribute("data-value");return this.Lo.displayActiveItemInInput(this.aU,h,this.cU),this.measureMutateElement((function(){var e=c.offsetHeight,i=c.offsetTop,r=n.Ft,o=r.offsetHeight,a=r.scrollTop;u=a>i||a+o<i+e,s=t>0?i+e-o:i}),(function(){u&&(n.Ft.scrollTop=s),n.YU(),c.classList.add("i-amphtml-autocomplete-item-active"),c.setAttribute("aria-selected","true");var t=c.getAttribute("id");t||(t=n.mz+"_AMP_content_"+a,c.setAttribute("id",t)),n.aU.setAttribute("aria-activedescendant",t),n.vU=a,n.bU=c,_(n.bU)}))},o.$P=function(){return this.Ft.querySelectorAll(".i-amphtml-autocomplete-item:not([data-disabled])")},o.qP=function(){this.Lo.resetInputOnWrapAround(this.cU,this.aU),this.YU()},o.YU=function(){this.bU&&(this.bU.classList.toggle("i-amphtml-autocomplete-item-active",!1),this.bU.removeAttribute("aria-selected"),"autocomplete-selected"===this.bU.getAttribute("id")&&this.bU.removeAttribute("id"),this.aU.removeAttribute("aria-activedescendent"),this.bU=null,this.vU=-1)},o.FU=function(){this.yU=!1,function(t){for(;t.firstChild;)t.removeChild(t.firstChild)}(this.Ft)},o.IU=function(t){var n=this;switch(t.key){case"ArrowDown":return t.preventDefault(),this.IP()?this.vU===this.$P().length-1?(this.qP(),l()):this.HU(1):this.mutateElement((function(){n.NU(n.sU,n.cU),n.GU(!0)}));case"ArrowUp":return t.preventDefault(),0===this.vU?(this.qP(),l()):this.HU(-1);case"Enter":var e=this.Lo.shouldPreventDefaultOnEnter(!!this.bU);if(this.IP()&&e&&t.preventDefault(),this.Lo.removeSelectionHighlighting(this.aU),this.IP()&&this.bU){var i=this.ZU(this.bU),r=i.selectedObject,o=i.selectedText;return this.mutateElement((function(){n.KU(o,r),n.YU()}))}return this.mutateElement((function(){n.GU(!1)}));case"Escape":return this.mutateElement((function(){n.yU||(t.preventDefault(),n.qP(),n.GU(!1))}));case"Tab":if(this.IP()&&this.bU){t.preventDefault();var u=this.ZU(this.bU),s=u.selectedObject,a=u.selectedText;return this.mutateElement((function(){n.KU(a,s)}))}return l();case"Backspace":return this.lU=this.iU,l();default:return l()}},o.LU=function(t){if(!this.yU){if(this.FU(),!this.getFallback())throw t;this.yU=!0,this.toggleFallback(!0)}},o.isLayoutSupported=function(t){return"container"==t},r}(t.BaseElement);t.registerElement(Ot,Et,"amp-autocomplete,amp-autocomplete>input,amp-autocomplete>textarea{font-family:sans-serif}amp-autocomplete>input,amp-autocomplete>textarea{border-radius:4px;box-sizing:border-box}.i-amphtml-autocomplete-results{position:absolute;top:100%;width:calc(100% + 1rem);min-width:calc(2em + 2rem);max-height:40vh;margin-top:.5rem;margin-left:-.5rem;border-radius:4px;overflow-y:auto;overflow-x:hidden;background-color:#fff;box-shadow:0px 2px 4px 0px rgba(0,0,0,.5);z-index:10}.i-amphtml-autocomplete-results-up{top:auto;bottom:100%;margin-bottom:.5rem}.i-amphtml-autocomplete-item{position:relative;padding:.5rem 1rem;cursor:pointer}.i-amphtml-autocomplete-item:first-child{border-radius:4px 4px 0px 0px}.i-amphtml-autocomplete-item:nth-last-child(2){border-radius:0px 0px 4px 4px}.i-amphtml-autocomplete-item-active:not([data-disabled]),.i-amphtml-autocomplete-item:hover:not([data-disabled]){background-color:rgba(0,0,0,.15)}.i-amphtml-autocomplete-item[data-disabled]{color:rgba(0,0,0,.33)}\n/*# sourceURL=/extensions/amp-autocomplete/0.1/amp-autocomplete.css*/")}();
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */}});
//# sourceMappingURL=amp-autocomplete-0.1.js.map