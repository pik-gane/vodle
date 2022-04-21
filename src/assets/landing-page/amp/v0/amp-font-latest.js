;
(self.AMP=self.AMP||[]).push({m:0,v:"2203281422000",n:"amp-font",ev:"0.1",l:!0,f:function(n,t){!function(){function t(n,i){return(t=Object.setPrototypeOf||function(n,t){return n.__proto__=t,n})(n,i)}function i(n){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)})(n)}function r(n){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function e(n,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}(n)}Array.isArray;var o=Object.prototype;o.hasOwnProperty,o.toString;var u=self.AMP_CONFIG||{},f=("string"==typeof u.thirdPartyFrameRegex?new RegExp(u.thirdPartyFrameRegex):u.thirdPartyFrameRegex,("string"==typeof u.cdnProxyRegex?new RegExp(u.cdnProxyRegex):u.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/);function s(n){if(!self.document||!self.document.head)return null;if(self.location&&f.test(self.location.origin))return null;var t=self.document.head.querySelector('meta[name="'.concat(n,'"]'));return t&&t.getAttribute("content")||null}u.thirdPartyUrl,u.thirdPartyFrameHost,u.cdnUrl||s("runtime-host"),u.errorReportingUrl,u.betaErrorReportingUrl,u.localDev,u.geoApiUrl||s("amp-geo-api"),self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null};var a=self.__AMP_LOG;function c(n){return a.user||(a.user=l()),function(n,t){return t&&t.ownerDocument.defaultView!=n}(a.user.win,n)?a.userForEmbed||(a.userForEmbed=l()):a.user}function l(n){return function(n,t){throw new Error("failed to call initLogConstructor")}()}function h(n,t,i,r,e,o,u,f,s,a,c){return n}function v(n,t){h(function(n,t){var i=n.__AMP_SERVICES&&n.__AMP_SERVICES[t];return!(!i||!i.ctor)}(n,t));var i=function(n){var t=n.__AMP_SERVICES;return t||(t=n.__AMP_SERVICES={}),t}(n)[t];return i.obj||(h(i.ctor),h(i.context),i.obj=new i.ctor(i.context),h(i.obj),i.context=null,i.resolve&&i.resolve(i.obj)),i.obj}var d,m=function(n){return v(n,"timer")},p=["Webkit","webkit","Moz","moz","ms","O","o"];function y(n,t,i,r,e){var o=function(n,t,i){if(t.startsWith("--"))return t;var r;d||(r=Object.create(null),d=r);var e=d[t];if(!e||i){if(e=t,void 0===n[t]){var o=function(n){return n.charAt(0).toUpperCase()+n.slice(1)}(t),u=function(n,t){for(var i=0;i<p.length;i++){var r=p[i]+t;if(void 0!==n[r])return r}return""}(n,o);void 0!==n[u]&&(e=u)}i||(d[t]=e)}return e}(n.style,t,e);if(o){var u,f=r?i+r:i;n.style.setProperty((u=o.replace(/[A-Z]/g,(function(n){return"-"+n.toLowerCase()})),p.some((function(n){return u.startsWith(n+"-")}))?"-".concat(u):u),f)}}function b(n,t){for(var i in t)y(n,i,t[i])}var w=["sans-serif","serif"],g=function(){function n(n){this.qi=n,this.ql=n.win.document,this.Ft=null,this.SE=null,this.EE=!1,this.xE=!1}var t=n.prototype;return t.load=function(n,t){var i=this;return this.SE=n,m(this.qi.win).timeoutPromise(t,this.OE()).then((function(){i.EE=!0,i.RE()}),(function(n){throw i.xE=!0,i.RE(),n}))},t.OE=function(){var n=this;return new Promise((function(t,i){var r=n.SE.fontStyle+" "+n.SE.variant+" "+n.SE.weight+" "+n.SE.size+" '"+n.SE.family+"'";n.FE()?n.ql.fonts.check(r)?t():n.ql.fonts.load(r).then((function(){return n.ql.fonts.load(r)})).then((function(){n.ql.fonts.check(r)?t():i(new Error("Font could not be loaded, probably due to incorrect @font-face."))})).catch(i):n.zE().then(t,i)}))},t.FE=function(){return"fonts"in this.ql},t.zE=function(){var n=this;return new Promise((function(t,i){var r,e,o=(r=n.qi.win,v((e=r).__AMP_TOP||(e.__AMP_TOP=e),"vsync")),u=n.ME(),f=o.createTask({measure:function(){n.EE?t():n.xE?i(new Error("Font loading timed out.")):u.some((function(n){return n.compare()}))?t():f()}});f()}))},t.ME=function(){var n=this,t=this.Ft=this.ql.createElement("div");b(t,{fontSize:"40px",fontVariant:this.SE.variant,fontWeight:this.SE.weight,fontStyle:this.SE.fontStyle,left:"-999px",lineHeight:"normal",margin:0,padding:0,position:"absolute",top:"-999px",visibility:"hidden"});var i=w.map((function(i){return new j(t,n.SE.family,i)}));return this.qi.getBody().appendChild(t),i},t.RE=function(){var n,t;this.Ft&&(null===(t=(n=this.Ft).parentElement)||void 0===t||t.removeChild(n)),this.Ft=null},n}(),j=function(){function n(n,t,i){var r=n.ownerDocument,e="".concat(t,",").concat(i);this.TE=this.AE(r,i),this.kE=this.AE(r,e),n.appendChild(this.TE),n.appendChild(this.kE)}var t=n.prototype;return t.AE=function(n,t){var i=n.createElement("div");return i.textContent="MAxmTYklsjo190QW",b(i,{float:"left",fontFamily:t,margin:0,padding:0,whiteSpace:"nowrap"}),i},t.compare=function(){var n=Math.abs(this.TE.offsetWidth-this.kE.offsetWidth)>2,t=Math.abs(this.TE.offsetHeight-this.kE.offsetHeight)>2;return n||t},n}(),S="amp-font",E=function(n){!function(n,i){if("function"!=typeof i&&null!==i)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(i&&i.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),i&&t(n,i)}(f,n);var r,o,u=(r=f,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(n){return!1}}(),function(){var n,t=i(r);if(o){var u=i(this).constructor;n=Reflect.construct(t,arguments,u)}else n=t.apply(this,arguments);return e(this,n)});function f(n){var t;return(t=u.call(this,n)).PE="",t.WE="",t.qE="",t.BE="",t.ZE=null,t}f.prerenderAllowed=function(){return!0};var s=f.prototype;return s.buildCallback=function(){var n,t;this.PE=(n=this.element.getAttribute("font-family"),"The font-family attribute is required for <amp-font> %s",t=this.element,c().assert(n,"The font-family attribute is required for <amp-font> %s",t,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined)),this.WE=this.element.getAttribute("font-weight")||"400",this.qE=this.element.getAttribute("font-style")||"normal",this.BE=this.element.getAttribute("font-variant")||"normal",this.ZE=new g(this.getAmpDoc()),this.CE()},s.CE=function(){var n=this,t={fontStyle:this.qE,variant:this.BE,weight:this.WE,size:"medium",family:this.PE};this.ZE.load(t,this.DE()).then((function(){n.HE()})).catch((function(t){n.IE(),c().warn(S,"Font download timed out for "+n.PE)}))},s.HE=function(){var n=this.element.getAttribute("on-load-add-class"),t=this.element.getAttribute("on-load-remove-class");this.LE(n,t)},s.IE=function(){var n=this.element.getAttribute("on-error-add-class"),t=this.element.getAttribute("on-error-remove-class");this.LE(n,t)},s.LE=function(n,t){var i=this.getAmpDoc(),r=i.getRootNode().documentElement||i.getBody();n&&r.classList.add(n),t&&r.classList.remove(t),this.RE()},s.RE=function(){this.ZE=null},s.DE=function(){var n,t=parseInt(this.element.getAttribute("timeout"),10);return t="number"!=typeof(n=t)||!isFinite(n)||t<0?3e3:t,Math.max(t-m(this.win).timeSinceStart(),100)},f}(n.BaseElement);n.registerElement(S,E)}();
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */}});
//# sourceMappingURL=amp-font-0.1.js.map