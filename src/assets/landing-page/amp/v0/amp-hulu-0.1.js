;
(self.AMP=self.AMP||[]).push({m:0,v:"2203281422000",n:"amp-hulu",ev:"0.1",l:!0,f:function(n,e){!function(){function e(n,t){return(e=Object.setPrototypeOf||function(n,e){return n.__proto__=e,n})(n,t)}function t(n){return(t=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)})(n)}function r(n){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function i(n,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}(n)}Array.isArray;var u=Object.prototype;u.hasOwnProperty,u.toString;var o=self.AMP_CONFIG||{},f=("string"==typeof o.thirdPartyFrameRegex?new RegExp(o.thirdPartyFrameRegex):o.thirdPartyFrameRegex,("string"==typeof o.cdnProxyRegex?new RegExp(o.cdnProxyRegex):o.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/);function l(n){if(!self.document||!self.document.head)return null;if(self.location&&f.test(self.location.origin))return null;var e=self.document.head.querySelector('meta[name="'.concat(n,'"]'));return e&&e.getAttribute("content")||null}o.thirdPartyUrl,o.thirdPartyFrameHost,o.cdnUrl||l("runtime-host"),o.errorReportingUrl,o.betaErrorReportingUrl,o.localDev,o.geoApiUrl||l("amp-geo-api"),self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null};var c=self.__AMP_LOG;function s(n){return function(n,e){throw new Error("failed to call initLogConstructor")}()}function a(n,e,t,r,i,u,o,f,l,c,s){return n}var d=function(n){!function(n,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&e(n,t)}(f,n);var r,u,o=(r=f,u=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(n){return!1}}(),function(){var n,e=t(r);if(u){var o=t(this).constructor;n=Reflect.construct(e,arguments,o)}else n=e.apply(this,arguments);return i(this,n)});function f(n){var e;return(e=o.call(this,n)).tb=null,e.TR=null,e}var l=f.prototype;return l.preconnectCallback=function(){var n,e,t;(n=this.win,e=n,t="preconnect",function(n,e){a(function(n,e){var t=n.__AMP_SERVICES&&n.__AMP_SERVICES[e];return!(!t||!t.ctor)}(n,e));var t=function(n){var e=n.__AMP_SERVICES;return e||(e=n.__AMP_SERVICES={}),e}(n)[e];return t.obj||(a(t.ctor),a(t.context),t.obj=new t.ctor(t.context),a(t.obj),t.context=null,t.resolve&&t.resolve(t.obj)),t.obj}(e=function(n){return n.__AMP_TOP||(n.__AMP_TOP=n)}(e),t)).preload(this.getAmpDoc(),this.Nw())},l.isLayoutSupported=function(n){return function(n){return"fixed"==n||"fixed-height"==n||"responsive"==n||"fill"==n||"flex-item"==n||"fluid"==n||"intrinsic"==n}(n)},l.layoutCallback=function(){var n=document.createElement("iframe"),e=this.Nw();return n.setAttribute("frameborder","0"),n.setAttribute("allowfullscreen","true"),n.src=e,n.classList.add("i-amphtml-fill-content"),this.element.appendChild(n),this.tb=n,this.loadPromise(n)},l.unlayoutOnPause=function(){return!0},l.unlayoutCallback=function(){var n,e;return this.tb&&(null===(e=(n=this.tb).parentElement)||void 0===e||e.removeChild(n),this.tb=null),!0},l.buildCallback=function(){var n,e;this.element.classList.add("i-amphtml-media-component"),this.TR=(n=this.element.getAttribute("data-eid"),"The data-eid attribute is required for <amp-hulu> %s",e=this.element,(c.user||(c.user=s()),void c.user.win?c.userForEmbed||(c.userForEmbed=s()):c.user).assert(n,"The data-eid attribute is required for <amp-hulu> %s",e,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined))},l.Nw=function(){return a(this.TR),"https://player.hulu.com/site/dash/mobile_embed.html?amp=1&eid=".concat(encodeURIComponent(this.TR||""))},f}(n.BaseElement);n.registerElement("amp-hulu",d)}();
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */}});
//# sourceMappingURL=amp-hulu-0.1.js.map