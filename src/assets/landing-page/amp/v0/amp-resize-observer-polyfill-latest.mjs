;
(self.AMP=self.AMP||[]).push({m:1,v:"2203281422000",n:"amp-resize-observer-polyfill",ev:"0.1",l:!0,f:function(t,n){(()=>{function t(t,n){(null==n||n>t.length)&&(n=t.length);for(var i=0,e=new Array(n);i<n;i++)e[i]=t[i];return e}function n(n,i){var e="undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(e)return(e=e.call(n)).next.bind(e);if(Array.isArray(n)||(e=function(n,i){if(n){if("string"==typeof n)return t(n,i);var e=Object.prototype.toString.call(n).slice(8,-1);return"Object"===e&&n.constructor&&(e=n.constructor.name),"Map"===e||"Set"===e?Array.from(n):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?t(n,i):void 0}}(n))||i&&n&&"number"==typeof n.length){e&&(n=e);var r=0;return function(){return r>=n.length?{done:!0}:{done:!1,value:n[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,e=class{constructor(t){this.st=t,this.ct=[],this.ut=null,e._upgraders.push(this.lt.bind(this))}disconnect(){this.ut?this.ut.disconnect():this.ct.length=0}observe(t){this.ut?this.ut.observe(t):-1==this.ct.indexOf(t)&&this.ct.push(t)}unobserve(t){if(this.ut)this.ut.unobserve(t);else{const n=this.ct.indexOf(t);-1!=n&&this.ct.splice(n,1)}}lt(t){const i=new t(this.st);this.ut=i;for(var e,r=n(this.ct,!0);!(e=r()).done;){const t=e.value;i.observe(t)}this.ct.length=0}};e._upgraders=[];var r,s,o,{hasOwnProperty:u,toString:f}=Object.prototype,h=self.AMP_CONFIG||{},a=("string"==typeof h.thirdPartyFrameRegex?new RegExp(h.thirdPartyFrameRegex):h.thirdPartyFrameRegex,("string"==typeof h.cdnProxyRegex?new RegExp(h.cdnProxyRegex):h.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/);function c(t){if(!self.document||!self.document.head)return null;if(self.location&&a.test(self.location.origin))return null;const n=self.document.head.querySelector(`meta[name="${t}"]`);return n&&n.getAttribute("content")||null}function l(t,n,i,e,r,s,o,u,f,h,a){return t}function v(t,n){l(function(t,n){const i=t.__AMP_SERVICES&&t.__AMP_SERVICES[n];return!(!i||!i.ctor)}(t,n));const i=d(t)[n];return i.obj||(l(i.ctor),l(i.context),i.obj=new i.ctor(i.context),l(i.obj),i.context=null,i.resolve&&i.resolve(i.obj)),i.obj}function d(t){let n=t.__AMP_SERVICES;return n||(n=t.__AMP_SERVICES={}),n}function p(t){t.ResizeObserver=function(){var n=function(){if("undefined"!=typeof Map)return Map;function t(t,n){var i=-1;return t.some((function(t,e){return t[0]===n&&(i=e,!0)})),i}return function(){function n(){this.__entries__=[]}return Object.defineProperty(n.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),n.prototype.get=function(n){var i=t(this.__entries__,n),e=this.__entries__[i];return e&&e[1]},n.prototype.set=function(n,i){var e=t(this.__entries__,n);~e?this.__entries__[e][1]=i:this.__entries__.push([n,i])},n.prototype.delete=function(n){var i=this.__entries__,e=t(i,n);~e&&i.splice(e,1)},n.prototype.has=function(n){return!!~t(this.__entries__,n)},n.prototype.clear=function(){this.__entries__.splice(0)},n.prototype.forEach=function(t,n){void 0===n&&(n=null);for(var i=0,e=this.__entries__;i<e.length;i++){var r=e[i];t.call(n,r[1],r[0])}},n}()}(),i=function(t,n){for(var i=0,e=Object.keys(n);i<e.length;i++){var r=e[i];Object.defineProperty(t,r,{value:n[r],enumerable:!1,writable:!1,configurable:!0})}return t},e=void 0!==t&&t.Math===Math?t:"undefined"!=typeof self&&self.Math===Math?self:"undefined"!=typeof window&&window.Math===Math?window:Function("return this")(),r=function(t){return t&&t.ownerDocument&&t.ownerDocument.defaultView||e},s="undefined"!=typeof window&&"undefined"!=typeof document&&window.document===document,o=c(0,0,0,0);function u(t){return parseFloat(t)||0}function f(t){for(var n=[],i=1;i<arguments.length;i++)n[i-1]=arguments[i];return n.reduce((function(n,i){return n+u(t["border-"+i+"-width"])}),0)}var h="undefined"!=typeof SVGGraphicsElement?function(t){return t instanceof r(t).SVGGraphicsElement}:function(t){return t instanceof r(t).SVGElement&&"function"==typeof t.getBBox};function a(t){return s?h(t)?function(t){var n=t.getBBox();return c(0,0,n.width,n.height)}(t):function(t){var n=t.clientWidth,i=t.clientHeight;if(!n&&!i)return o;var e=r(t).getComputedStyle(t),s=function(t){for(var n={},i=0,e=["top","right","bottom","left"];i<e.length;i++){var r=e[i],s=t["padding-"+r];n[r]=u(s)}return n}(e),h=s.left+s.right,a=s.top+s.bottom,l=u(e.width),v=u(e.height);if("border-box"===e.boxSizing&&(Math.round(l+h)!==n&&(l-=f(e,"left","right")+h),Math.round(v+a)!==i&&(v-=f(e,"top","bottom")+a)),!function(t){return t===r(t).document.documentElement}(t)){var d=Math.round(l+h)-n,p=Math.round(v+a)-i;1!==Math.abs(d)&&(l-=d),1!==Math.abs(p)&&(v-=p)}return c(s.left,s.top,l,v)}(t):o}function c(t,n,i,e){return{x:t,y:n,width:i,height:e}}var l=function(){function t(t,n){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=c(0,0,0,0),this.target=t,this.rootNode=n}return t.prototype.isActive=function(){var t=a(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},t.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},t}(),v=function(t,n){var e,r,s,o,u,f,h,a=(r=(e=n).x,s=e.y,o=e.width,u=e.height,f="undefined"!=typeof DOMRectReadOnly?DOMRectReadOnly:Object,h=Object.create(f.prototype),i(h,{x:r,y:s,width:o,height:u,top:s,right:r+o,bottom:u+s,left:r}),h);i(this,{target:t,contentRect:a})},d="undefined"!=typeof IntersectionObserver,p=function(){function t(t,i,e){var r=this;if(this.activeObservations_=[],this.observations_=new n,this.rootNodes_=new n,this.intersectionObserver_=null,"function"!=typeof t)throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=i,this.callbackCtx_=e,d&&(this.intersectionObserver_=new IntersectionObserver((function(){return r.checkRootChanges_()})))}return t.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof r(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var n=this.observations_;if(!n.has(t)){var i=w(t,t.ownerDocument);n.set(t,new l(t,i));var e=this.rootNodes_.get(i);e||(e=[],this.rootNodes_.set(i,e),this.controller_.addObserver(i,this)),e.push(t),this.intersectionObserver_&&this.intersectionObserver_.observe(t),this.controller_.refresh(i)}}},t.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof r(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var n=this.observations_,i=n.get(t);if(i){n.delete(t),this.intersectionObserver_&&this.intersectionObserver_.unobserve(t);var e=i.rootNode,s=this.rootNodes_.get(e);if(s){var o=s.indexOf(t);~o&&s.splice(o,1),0===s.length&&(this.rootNodes_.delete(e),this.controller_.removeObserver(e,this))}}}},t.prototype.disconnect=function(){var t=this;this.clearActive(),this.observations_.clear(),this.rootNodes_.forEach((function(n,i){t.controller_.removeObserver(i,t)})),this.rootNodes_.clear(),this.intersectionObserver_&&(this.intersectionObserver_.disconnect(),this.intersectionObserver_=null)},t.prototype.gatherActive=function(){var t=this;this.checkRootChanges_(),this.clearActive(),this.observations_.forEach((function(n){n.isActive()&&t.activeObservations_.push(n)}))},t.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,n=this.activeObservations_.map((function(t){return new v(t.target,t.broadcastRect())}));this.callback_.call(t,n,t),this.clearActive()}},t.prototype.clearActive=function(){this.activeObservations_.splice(0)},t.prototype.hasActive=function(){return this.activeObservations_.length>0},t.prototype.checkRootChanges_=function(){var t=this,n=null;this.observations_.forEach((function(t){var i=t.target,e=t.rootNode;w(i,e)!==e&&(n||(n=[]),n.push(i))})),n&&n.forEach((function(n){t.unobserve(n),t.observe(n)}))},t}();function w(t,n){var i=function(t){if("function"==typeof t.getRootNode)return t.getRootNode();var n;for(n=t;n.parentNode;n=n.parentNode);return n}(t);return 9===i.nodeType||11===i.nodeType?i:n}var b="function"==typeof requestAnimationFrame?requestAnimationFrame.bind(e):function(t){return setTimeout((function(){return t(Date.now())}),1e3/60)},y=["top","right","bottom","left","width","height","size","weight"],m="undefined"!=typeof MutationObserver,g=function(){function t(t,n){this.rootNode_=null,this.globalController_=null,this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.hostObserver_=null,this.observers_=[],this.rootNode_=t,this.globalController_=n,this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=function(t,n){var i=!1,e=!1,r=0;function s(){i&&(i=!1,t()),e&&u()}function o(){b(s)}function u(){var t=Date.now();if(i){if(t-r<2)return;e=!0}else i=!0,e=!1,setTimeout(o,20);r=t}return u}(this.refresh.bind(this))}return t.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},t.prototype.removeObserver=function(t){var n=this.observers_,i=n.indexOf(t);~i&&n.splice(i,1),!n.length&&this.connected_&&this.disconnect_()},t.prototype.refresh=function(){this.updateObservers_()&&this.refresh()},t.prototype.updateObservers_=function(){var t=this.observers_.filter((function(t){return t.gatherActive(),t.hasActive()}));return t.forEach((function(t){return t.broadcastActive()})),t.length>0},t.prototype.connect_=function(){if(s&&!this.connected_){var t=this.rootNode_,n=(t.ownerDocument||t).defaultView;if(t.addEventListener("transitionend",this.onTransitionEnd_,!0),n&&n.addEventListener("resize",this.refresh,!0),m){this.mutationsObserver_=new MutationObserver(this.refresh);try{this.mutationsObserver_.observe(t,{attributes:!0,childList:!0,characterData:!0,subtree:!0})}catch(t){}t.host&&this.mutationsObserver_.observe(t.host,{attributes:!0,childList:!0,characterData:!0,subtree:!0})}else t.addEventListener("DOMSubtreeModified",this.refresh,!0),this.mutationEventsAdded_=!0;t.host&&(this.hostObserver_=new p(this.refresh,this.globalController_,this),this.hostObserver_.observe(t.host)),this.connected_=!0}},t.prototype.disconnect_=function(){if(s&&this.connected_){var t=this.rootNode_,n=(t.ownerDocument||t).defaultView;t.removeEventListener("transitionend",this.onTransitionEnd_,!0),n&&n.removeEventListener("resize",this.refresh,!0),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&t.removeEventListener("DOMSubtreeModified",this.refresh,!0),this.hostObserver_&&this.hostObserver_.disconnect(),this.hostObserver_=null,this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1}},t.prototype.onTransitionEnd_=function(t){var n=t.propertyName,i=void 0===n?"":n;y.some((function(t){return!!~i.indexOf(t)}))&&this.refresh()},t}(),M=function(){function t(){this.rootNodeControllers_="undefined"!=typeof WeakMap?new WeakMap:new Map}return t.prototype.addObserver=function(t,n){var i=this.rootNodeControllers_.get(t);i||(i=new g(t,this),this.rootNodeControllers_.set(t,i)),i.addObserver(n)},t.prototype.removeObserver=function(t,n){var i=this.rootNodeControllers_.get(t);i&&i.removeObserver(n)},t.prototype.refresh=function(t){var n=this.rootNodeControllers_.get(t);n&&n.refresh()},t.getInstance=function(){return this.instance_||(this.instance_=new t),this.instance_},t.instance_=null,t}(),O="undefined"!=typeof WeakMap?new WeakMap:new n,E=function t(n){if(!(this instanceof t))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var i=M.getInstance(),e=new p(n,i,this);O.set(this,e)};return["observe","unobserve","disconnect"].forEach((function(t){E.prototype[t]=function(){var n;return(n=O.get(this))[t].apply(n,arguments)}})),void 0!==e.ResizeObserver?e.ResizeObserver:E}()}h.thirdPartyUrl,h.thirdPartyFrameHost,h.cdnUrl||c("runtime-host"),h.errorReportingUrl,h.betaErrorReportingUrl,h.localDev,h.geoApiUrl||c("amp-geo-api"),self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null},self.__AMP_LOG,s="amp-resize-observer-polyfill",o=function(t){return function(t,e){const r=t.ResizeObserver._stub;if(r){delete t.ResizeObserver,delete t.ResizeObserverEntry,e();const u=t.ResizeObserver,f=r._upgraders.slice(0),h=i||(i=Promise.resolve(void 0)),a=t=>{h.then((()=>t(u)))};for(var s,o=n(f,!0);!(s=o()).done;)a(s.value);r._upgraders={"push":a}}else e()}(t,(()=>{p(t)})),{}},function(t,n,i,e,r,s){const o=d(t);let u=o[i];u||(u=o[i]={obj:null,promise:null,resolve:null,reject:null,context:null,ctor:null,sharedInstance:!1}),u.ctor||(u.ctor=e,u.context=n,u.sharedInstance=!1,u.resolve&&v(t,i))}(r=function(t){return t.__AMP_TOP||(t.__AMP_TOP=t)}(r=window),r,s,o),v(r,s)})()}});
//# sourceMappingURL=amp-resize-observer-polyfill-0.1.mjs.map