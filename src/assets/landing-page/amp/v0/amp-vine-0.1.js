;
(self.AMP=self.AMP||[]).push({m:0,v:"2203281422000",n:"amp-vine",ev:"0.1",l:!0,f:function(n,t){!function(){function t(n,e){return(t=Object.setPrototypeOf||function(n,t){return n.__proto__=t,n})(n,e)}function e(n){return(e=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)})(n)}function r(n){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function i(n,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}(n)}function o(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}function u(n,t){var e="undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(e)return(e=e.call(n)).next.bind(e);if(Array.isArray(n)||(e=function(n,t){if(n){if("string"==typeof n)return o(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);return"Object"===e&&n.constructor&&(e=n.constructor.name),"Map"===e||"Set"===e?Array.from(n):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?o(n,t):void 0}}(n))||t&&n&&"number"==typeof n.length){e&&(n=e);var r=0;return function(){return r>=n.length?{done:!0}:{done:!1,value:n[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}Array.isArray;var f=Object.prototype,a=(f.hasOwnProperty,f.toString,"fixed");function c(n){var t=Object.getOwnPropertyDescriptor(n,"message");if(null!=t&&t.writable)return n;var e=n.message,r=n.stack,i=new Error(e);for(var o in n)i[o]=n[o];return i.stack=r,i}function l(n){for(var t,e=null,r="",i=u(arguments,!0);!(t=i()).done;){var o=t.value;o instanceof Error&&!e?e=c(o):(r&&(r+=" "),r+=o)}return e?r&&(e.message=r+": "+e.message):e=new Error(r),e}function s(n){var t,e;null===(t=(e=self).__AMP_REPORT_ERROR)||void 0===t||t.call(e,n)}function v(n){var t=l.apply(null,arguments);setTimeout((function(){throw s(t),t}))}function h(n){try{for(var t=arguments.length,e=new Array(t>1?t-1:0),r=1;r<t;r++)e[r-1]=arguments[r];return n.apply(null,e)}catch(n){v(n)}}var d={"getPropertyPriority":function(){return""},"getPropertyValue":function(){return""}},p=/vertical/,y=new WeakMap,m=new WeakMap,b=new WeakMap;function w(n){var t=y.get(n);return t||(t=new n.ResizeObserver(g),y.set(n,t)),t}function g(n){for(var t=new Set,e=n.length-1;e>=0;e--){var r=n[e],i=r.target;if(!t.has(i)){t.add(i);var o=m.get(i);if(o){b.set(i,r);for(var u=0;u<o.length;u++){var f=o[u],a=f.callback;S(f.type,a,r)}}}}}function S(n,t,e){if(0==n){var r=e.contentRect,i=r.height;h(t,{width:r.width,height:i})}else if(1==n){var o,u=e.borderBoxSize;if(u)o=u.length>0?u[0]:{inlineSize:0,blockSize:0};else{var f,a,c=e.target,l=((b=c).ownerDocument||b).defaultView,s=p.test(function(n,t){return n.getComputedStyle(t)||d}(l,c).writingMode),v=c,y=v.offsetHeight,m=v.offsetWidth;s?(a=m,f=y):(f=m,a=y),o={inlineSize:f,blockSize:a}}h(t,o)}var b}var j=function(){function n(n){this.Gn=n,this.Zn=!1,this.Un=!1,this.Jn=this.Jn.bind(this)}var t=n.prototype;return t.updatePlaying=function(n){n!==this.Zn&&(this.Zn=n,n?(this.Un=!1,function(n,t,e){var r=n.ownerDocument.defaultView;if(r){var i=m.get(n);if(i||(i=[],m.set(n,i),w(r).observe(n)),!i.some((function(n){return n.callback===e&&1===n.type}))){i.push({type:1,callback:e});var o=b.get(n);o&&setTimeout((function(){return S(1,e,o)}))}}}(this.Gn,0,this.Jn)):function(n,t){!function(n,t,e){var r=m.get(n);if(r&&(function(n,t){for(var r=[],i=0,o=0;o<n.length;o++){var u=n[o];(f=u).callback===e&&1===f.type?r.push(u):(i<o&&(n[i]=u),i++)}var f;i<n.length&&(n.length=i)}(r),0==r.length)){m.delete(n),b.delete(n);var i=n.ownerDocument.defaultView;i&&w(i).unobserve(n)}}(n,0,t)}(this.Gn,this.Jn))},t.Jn=function(n){var t=n.blockSize,e=n.inlineSize>0&&t>0;if(e!==this.Un){this.Un=e;var r=this.Gn;e||r.pause()}},n}(),E=self.AMP_CONFIG||{},O=("string"==typeof E.thirdPartyFrameRegex?new RegExp(E.thirdPartyFrameRegex):E.thirdPartyFrameRegex,("string"==typeof E.cdnProxyRegex?new RegExp(E.cdnProxyRegex):E.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/);function R(n){if(!self.document||!self.document.head)return null;if(self.location&&O.test(self.location.origin))return null;var t=self.document.head.querySelector('meta[name="'.concat(n,'"]'));return t&&t.getAttribute("content")||null}E.thirdPartyUrl,E.thirdPartyFrameHost,E.cdnUrl||R("runtime-host"),E.errorReportingUrl,E.betaErrorReportingUrl,E.localDev,E.geoApiUrl||R("amp-geo-api"),self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null};var A=self.__AMP_LOG;function x(n){return function(n,t){throw new Error("failed to call initLogConstructor")}()}function T(n,t,e,r,i,o,u,f,a,c,l){return n}var k=function(n){return t="preconnect",function(n,t){T(function(n,t){var e=n.__AMP_SERVICES&&n.__AMP_SERVICES[t];return!(!e||!e.ctor)}(n,t));var e=function(n){var t=n.__AMP_SERVICES;return t||(t=n.__AMP_SERVICES={}),t}(n)[t];return e.obj||(T(e.ctor),T(e.context),e.obj=new e.ctor(e.context),T(e.obj),e.context=null,e.resolve&&e.resolve(e.obj)),e.obj}(function(n){return n.__AMP_TOP||(n.__AMP_TOP=n)}(n),t);var t},z=function(n){!function(n,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),e&&t(n,e)}(f,n);var r,o,u=(r=f,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(n){return!1}}(),function(){var n,t=e(r);if(o){var u=e(this).constructor;n=Reflect.construct(t,arguments,u)}else n=t.apply(this,arguments);return i(this,n)});function f(n){var t;return(t=u.call(this,n)).tb=null,t.Gt=new j(t.element),t}var c=f.prototype;return c.preconnectCallback=function(n){k(this.win).url(this.getAmpDoc(),"https://vine.co",n),k(this.win).url(this.getAmpDoc(),"https://v.cdn.vine.co",n)},c.isLayoutSupported=function(n){return function(n){return n==a||"fixed-height"==n||"responsive"==n||"fill"==n||"flex-item"==n||"fluid"==n||"intrinsic"==n}(n)},c.layoutCallback=function(){var n,t,e=(n=this.element.getAttribute("data-vineid"),"The data-vineid attribute is required for <amp-vine> %s",t=this.element,(A.user||(A.user=x()),void A.user.win?A.userForEmbed||(A.userForEmbed=x()):A.user).assert(n,"The data-vineid attribute is required for <amp-vine> %s",t,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined)),r=this.element.ownerDocument.createElement("iframe");return r.setAttribute("frameborder","0"),r.src="https://vine.co/v/"+encodeURIComponent(e)+"/embed/simple",r.classList.add("i-amphtml-fill-content"),this.element.appendChild(r),this.tb=r,this.Gt.updatePlaying(!0),this.loadPromise(r)},c.unlayoutCallback=function(){var n=this.tb;return n&&(this.element.removeChild(n),this.tb=null),this.Gt.updatePlaying(!1),!0},c.pauseCallback=function(){this.tb&&this.tb.contentWindow&&this.tb.contentWindow.postMessage("pause","*")},f}(n.BaseElement);n.registerElement("amp-vine",z)}();
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */}});
//# sourceMappingURL=amp-vine-0.1.js.map