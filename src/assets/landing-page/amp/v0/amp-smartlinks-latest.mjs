;
(self.AMP=self.AMP||[]).push({m:1,v:"2203281422000",n:"amp-smartlinks",ev:"0.1",l:!0,f:function(t,n){(()=>{var n="load-start",{isArray:i}=Array;function s(t,n){(null==n||n>t.length)&&(n=t.length);for(var i=0,s=new Array(n);i<n;i++)s[i]=t[i];return s}var{hasOwnProperty:e,toString:r}=Object.prototype;function o(t){return(t.ownerDocument||t).defaultView}function h(t,n,i){return function(t,n){for(const i in n)t.setAttribute(i,n[i]);return t}(t.createElement(n),i)}var u=self.AMP_CONFIG||{},l=("string"==typeof u.thirdPartyFrameRegex?new RegExp(u.thirdPartyFrameRegex):u.thirdPartyFrameRegex,("string"==typeof u.cdnProxyRegex?new RegExp(u.cdnProxyRegex):u.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/);function c(t){if(!self.document||!self.document.head)return null;if(self.location&&l.test(self.location.origin))return null;const n=self.document.head.querySelector(`meta[name="${t}"]`);return n&&n.getAttribute("content")||null}u.thirdPartyUrl,u.thirdPartyFrameHost,u.cdnUrl||c("runtime-host"),u.errorReportingUrl,u.betaErrorReportingUrl,u.localDev,u.geoApiUrl||c("amp-geo-api"),self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null};var a,_=self.__AMP_LOG;function f(t){return function(t,n){throw new Error("failed to call initLogConstructor")}()}function p(t,n,i,s,e,r,o,h,u,l,c){return t}function m(){return a||(a=Promise.resolve(void 0))}function A(t,n){return E(t=function(t){return t.__AMP_TOP||(t.__AMP_TOP=t)}(t),n)}function P(t,n){return E(g(k(t)),n)}function d(t,n){return function(t,n){const i=I(t,n);if(i)return i;const s=T(t);return s[n]=function(){const t=new class{constructor(){this.promise=new Promise(((t,n)=>{this.resolve=t,this.reject=n}))}},{promise:n,reject:i,resolve:s}=t;return n.catch((()=>{})),{obj:null,promise:n,resolve:s,reject:i,context:null,ctor:null}}(),s[n].promise}(g(t),n)}function v(t,n){return I(g(t),n)}function k(t){return t.nodeType?(n=o(t),A(n,"ampdoc")).getAmpDoc(t):t;var n}function g(t){const n=k(t);return n.isSingleDoc()?n.win:n}function E(t,n){p(function(t,n){const i=t.__AMP_SERVICES&&t.__AMP_SERVICES[n];return!(!i||!i.ctor)}(t,n));const i=T(t)[n];return i.obj||(p(i.ctor),p(i.context),i.obj=new i.ctor(i.context),p(i.obj),i.context=null,i.resolve&&i.resolve(i.obj)),i.obj}function I(t,n){const i=T(t)[n];return i?i.promise?i.promise:(E(t,n),i.promise=Promise.resolve(i.obj)):null}function T(t){let n=t.__AMP_SERVICES;return n||(n=t.__AMP_SERVICES={}),n}var b=t=>k(t),R=t=>function(t,n,i,s){const e=v(t,n);if(e)return e;const r=k(t);return r.whenExtensionsKnown().then((()=>{const t=r.getExtensionVersion(i);return t?A(r.win,"extensions").waitForExtension(i,t):null})).then((i=>i?s?v(t,n):d(t,n):null))}(t,"amp-analytics-instrumentation","amp-analytics"),y=t=>A(t,"extensions");function w(t){return t.data}var M="https://api.narrativ.com/api",V={PAGE_IMPRESSION_ENDPOINT:`${M}/v1/events/impressions/page_impression/`,NRTV_CONFIG_ENDPOINT:`${M}/v0/publishers/.nrtv_slug./amp_config/`,LINKMATE_ENDPOINT:`${M}/v1/publishers/.pub_id./linkmate/smart_links/`},L=class{constructor(t,n){this.syncResponse=t,this.asyncResponse=n}};function N(t){return t.getAttribute("nrtv-account-name").toLowerCase()}function x(t){return!!t.hasAttribute("linkmate")}function S(t){return!!t.hasAttribute("exclusive-links")}function O(t){const n=t.getAttribute("link-attribute");return n?n.toLowerCase():"href"}function C(t){const n=t.getAttribute("link-selector");return n?n.toLowerCase():"a"}var j,U=(new Set(["c","v","a","ad"]),0),$="data-link-rewriter-original-url",D=["Webkit","webkit","Moz","moz","ms","O","o"];function q(t,n,i,s,e){const r=function(t,n,i){if(n.startsWith("--"))return n;j||(j=Object.create(null));let s=j[n];if(!s||i){if(s=n,void 0===t[n]){const i=function(t){return t.charAt(0).toUpperCase()+t.slice(1)}(n),e=function(t,n){for(let i=0;i<D.length;i++){const s=D[i]+n;if(void 0!==t[s])return s}return""}(t,i);void 0!==t[e]&&(s=e)}i||(j[n]=s)}return s}(t.style,n,e);if(!r)return;const o=s?i+s:i;t.style.setProperty(function(t){const n=t.replace(/[A-Z]/g,(t=>"-"+t.toLowerCase()));return D.some((t=>n.startsWith(t+"-")))?`-${n}`:n}(r),o)}var F=!1,z=/nochunking=1/.test(self.location.hash),G=m();var H="not_run",B=class{constructor(t){this.state=H,this.Yi=t}Ji(t){if("run"!=this.state){this.state="run";try{this.Yi(t)}catch(t){throw this.Qi(t),t}}}Xi(){return this.Yi.displayName||this.Yi.name}Qi(t){}Zi(){return!1}ts(){return!1}},K=class extends B{constructor(t,n,i){super(t),this.ss=i}Qi(t){var n;p((n=self.document).defaultView),F||(F=!0,function(t){!function(t,n){for(const i in n)q(t,i,n[i])}(t.body,{opacity:1,visibility:"visible","animation":"none"})}(n))}Zi(){return this.es()}ts(){return this.ss.ns}es(){return this.ss.ampdoc.isVisible()}},W=class{constructor(t){var n;this.ampdoc=t,this.i=t.win,this.rs=new class{constructor(){this.qi=[]}peek(){const t=this.length;return t?this.qi[t-1].item:null}enqueue(t,n){if(isNaN(n))throw new Error("Priority must not be NaN.");const i=this.Wi(n);this.qi.splice(i,0,{item:t,priority:n})}Wi(t){let n=-1,i=0,s=this.length;for(;i<=s&&(n=Math.floor((i+s)/2),n!==this.length);)if(this.qi[n].priority<t)i=n+1;else{if(!(n>0&&this.qi[n-1].priority>=t))break;s=n-1}return n}forEach(t){let n=this.length;for(;n--;)t(this.qi[n].item)}dequeue(){const t=this.qi.pop();return t?t.item:null}get length(){return this.qi.length}},this.hs=this.os.bind(this),this.us=0,this.ls=!(!this.i.navigator.scheduling||!this.i.navigator.scheduling.isInputPending),this.cs=!1,this.Ki=this.i.document.documentElement.hasAttribute("i-amphtml-no-boilerplate"),this.i.addEventListener("message",(t=>{"amp-macro-task"==w(t)&&this.os(null)})),this.ns=!1,(n=t,d(n,"viewer")).then((()=>{this.ns=!0})),t.onVisibilityChanged((()=>{t.isVisible()&&this.ds()}))}run(t,n){const i=new B(t);this.fs(i,n)}runForStartup(t){const n=new K(t,this.i,this);this.fs(n,Number.POSITIVE_INFINITY)}fs(t,n){this.rs.enqueue(t,n),this.ds()}ps(t){let n=this.rs.peek();for(;n&&n.state!==H;)this.rs.dequeue(),n=this.rs.peek();return n&&t&&this.rs.dequeue(),n}os(t){const n=this.ps(!0);if(!n)return this.cs=!1,this.us=0,!1;let i;try{i=Date.now(),n.Ji(t)}finally{G.then().then().then().then().then().then().then().then().then((()=>{this.cs=!1,this.us+=Date.now()-i,this.ds()}))}return!0}_s(t){if(this.Ki&&(this.ls?this.i.navigator.scheduling.isInputPending():this.us>5))return this.us=0,void this.As();G.then((()=>{this.hs(t)}))}ds(){if(this.cs)return;const t=this.ps();return t?t.Zi()?(this.cs=!0,void this._s(null)):void(t.ts()&&this.i.requestIdleCallback?function(t,n,i,s){const e=Date.now();t.requestIdleCallback((function n(i){if(i.timeRemaining()<15){const r=2e3-(Date.now()-e);r<=0||i.didTimeout?s(i):t.requestIdleCallback(n,{timeout:r})}else s(i)}),{timeout:2e3})}(this.i,0,0,this.hs):this.As()):void 0}As(){this.i.postMessage("amp-macro-task","*")}},Z=class extends t.BaseElement{constructor(t){super(t),this.eR=null,this.hO=null,this.Ik=null,this.tL=null,this.nL=null,this.iL=null,this.cO=null}buildCallback(){this.hO=this.getAmpDoc(),this.eR=A(this.hO.win,"xhr");const t=P(this.hO,"viewer");var n;return this.nL={nrtvSlug:N(n=this.element),linkmateEnabled:x(n),exclusiveLinks:S(n),linkAttribute:O(n),linkSelector:C(n)},this.Ik=new class{constructor(t){this.Ec=t.getRootNode(),this.Uk=this.Ok(t),this.$k=[],this.Sk(this.Ec),(t=>P(t,"navigation"))(t).registerAnchorMutator(this.maybeRewriteLink.bind(this),U)}registerLinkRewriter(t,n,i){const e=new class{constructor(t,n,i,e){this.events=new class{constructor(){this.Tt=null}add(t){return this.Tt||(this.Tt=[]),this.Tt.push(t),()=>{this.remove(t)}}remove(t){this.Tt&&function(t,n){const i=t.indexOf(n);-1!=i&&t.splice(i,1)}(this.Tt,t)}removeAll(){this.Tt&&(this.Tt.length=0)}fire(t){if(this.Tt)for(var n,i=function(t,n){var i="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(i)return(i=i.call(t)).next.bind(i);if(Array.isArray(t)||(i=function(t,n){if(t){if("string"==typeof t)return s(t,n);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?s(t,n):void 0}}(t))||t&&"number"==typeof t.length){i&&(t=i);var e=0;return function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(this.Tt.slice());!(n=i()).done;)(0,n.value)(t)}getHandlerCount(){var t,n;return null!==(t=null===(n=this.Tt)||void 0===n?void 0:n.length)&&void 0!==t?t:0}},this.id=n,this.Ec=t,this.xk=i,this.Lk=e.linkSelector||"a",this.Nk=300,this.Ck=new class{constructor(){this.Dk=[],this.Jk=[]}updateLinkList(t){this.Jk=t.map(this.getReplacementUrlForAnchor.bind(this)),this.Dk=t}updateReplacementUrls(t){t.forEach((t=>{const{anchor:n,replacementUrl:i}=t,s=this.Dk.indexOf(n);-1!==s&&(this.Jk[s]=i)}))}getReplacementUrlForAnchor(t){const n=this.Dk.indexOf(t);return-1!==n?this.Jk[n]:null}isInCache(t){return-1!==this.Dk.indexOf(t)}getAnchorReplacementList(){return this.Dk.map((t=>({anchor:t,replacementUrl:this.getReplacementUrlForAnchor(t)})))}}}getReplacementUrl(t){return this.isWatchingLink(t)?this.Ck.getReplacementUrlForAnchor(t):null}getAnchorReplacementList(){return this.Ck.getAnchorReplacementList()}isWatchingLink(t){return this.Ck.isInCache(t)}rewriteAnchorUrl(t){const n=this.getReplacementUrl(t);return!(!n||n===t.href||(t.setAttribute($,t.href),t.href=n,setTimeout((()=>{t.href=t.getAttribute($),t.removeAttribute($)}),this.Nk),0))}onDomUpdated(){return new Promise((t=>{!function(t,n,i){if(z)return void G.then(n);const s=function(t){return function(t,n,i,s){const e=k(t);!function(t,n,i,s,e,r){const o=T(t);let h=o[i];h||(h=o[i]={obj:null,promise:null,resolve:null,reject:null,context:null,ctor:null,sharedInstance:!1}),h.ctor||(h.ctor=s,h.context=n,h.sharedInstance=!1,h.resolve&&E(t,i))}(g(e),e,n,i)}(t,"chunk",W),P(t,"chunk")}(t);s.run(n,i)}(this.Ec.nodeType==Node.DOCUMENT_NODE?this.Ec.documentElement:this.Ec,(()=>this.Fk().then((()=>{this.events.fire({type:"PAGE_SCANNED"}),t()}))),10)}))}Fk(){const t=this.Bk(),n=this.Gk(t);if(this.Ck.updateLinkList(t),!n.length)return m();this.Ck.updateReplacementUrls(n.map((t=>({anchor:t,replacementUrl:null}))));const i=this.xk(n);return s=i instanceof L,e='Invalid response from provided "resolveUnknownLinks" function."resolveUnknownLinks" should return an instance of TwoStepsResponse',(_.user||(_.user=f()),void _.user.win?_.userForEmbed||(_.userForEmbed=f()):_.user).assert(s,e,r,o,h,u,l,c,a,p,A),i.syncResponse&&this.Ck.updateReplacementUrls(i.syncResponse),i.asyncResponse?i.asyncResponse.then((t=>{this.Ck.updateReplacementUrls(t)})):m();var s,e,r,o,h,u,l,c,a,p,A}Gk(t){const n=[];return t.forEach((t=>{this.isWatchingLink(t)||n.push(t)})),n}Bk(){const t=this.Ec.querySelectorAll(this.Lk);return[].slice.call(t)}}(this.Ec,t,n,i);return this.Wk(this.$k,e,this.Uk),e.onDomUpdated(),e}maybeRewriteLink(t,n){const i=this.Zk(t);if(i.length){let s=null;for(let n=0;n<i.length;n++)if(i[n].rewriteAnchorUrl(t)){s=i[n];break}const e={linkRewriterId:s?s.id:null,anchor:t,clickType:n.type};i.forEach((t=>{const n={type:"CLICK",eventData:e};t.events.fire(n)}))}}Ok(t){const n=t.getMetaByName("amp-link-rewriter-priorities");return n?n.trim().split(/\s+/):[]}Sk(t){t.addEventListener("amp:dom-update",this.Hk.bind(this))}Hk(){this.$k.forEach((t=>{t.onDomUpdated()}))}Kk(t){const n=t.hasAttribute("data-link-rewriters")?t.getAttribute("data-link-rewriters").trim():null;return n?n.split(/\s+/):[]}Wk(t,n,i){return t.push(n),t.sort(((t,n)=>{const s=i.indexOf(t.id),e=i.indexOf(n.id);return-1===s&&-1===e?0:-1===s?1:-1===e?-1:s>e?1:-1})),t}Zk(t){const n=this.Kk(t);return this.$k.reduce(((i,s)=>(s.isWatchingLink(t)&&this.Wk(i,s,n),i)),[])}}(this.hO),this.hO.whenReady().then((()=>t.getReferrerUrl())).then((t=>{this.cO=t,this.hO.whenFirstVisible().then((()=>{this.sL()}))}))}sL(){this.eL().then((t=>{t&&(this.nL.linkmateExpected=t.linkmate_enabled,this.nL.publisherID=t.publisher_id,this.rL(),this.iL=new class{constructor(t,n,i,s){this.eR=n,this.oL=i.exclusiveLinks,this.hL=i.publisherID,this.uL=i.linkAttribute,this.Dk=null,this.lL=null,this.i=s}runLinkmate(t){let n=null;const s=this.Dk&&!function(t,n,s=5){if(!isFinite(s)||s<0)throw new Error("Invalid depth: "+s);if(t===n)return!0;const e=[{a:t,b:n,depth:s}];for(;e.length>0;){const{a:t,b:n,depth:s}=e.shift();if(s>0){if(typeof t!=typeof n)return!1;if(i(t)&&i(n)){if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++)e.push({a:t[i],b:n[i],depth:s-1});continue}if(t&&n&&"object"==typeof t&&"object"==typeof n){const i=Object.keys(t),h=Object.keys(n);if(i.length!==h.length)return!1;for(var r=0,o=i;r<o.length;r++){const i=o[r];e.push({a:t[i],b:n[i],depth:s-1})}continue}}if(t!==n)return!1}return!0}(this.Dk,t);if(this.lL&&s&&(n=this.cL()),!this.lL||s){const i=this.aL(t).then((n=>(this.lL=w(n)[0].smart_links,this.Dk=t,this.cL())));return new L(n,i)}return this.Dk=t,new L(n,null)}aL(t){const n=this._L(t),i={"article":this.fL(),"links":n},s=V.LINKMATE_ENDPOINT.replace(".pub_id.",this.hL.toString()),e={method:"POST",ampCors:!1,headers:{"Content-Type":"application/json"},body:i};return this.eR.fetchJson(s,e).then((t=>t.json()))}_L(t){const n=[];return t.forEach((t=>{const i=t.getAttribute(this.uL);if(/shop-links.co/.test(i))/\?amp=true$/.test(i)||(t[this.uL]=`${t[this.uL]}?amp=true`);else if(!/#donotlink$/.test(i)){const t={"raw_url":i,"exclusive_match_requested":this.oL||/#locklink$/.test(i),"link_source":"linkmate"};n.push(t)}})),n}fL(){return{"name":this.pL(),"url":this.mL()}}pL(){let t=null;return this.i.document.getElementsByTagName("title").length>0&&(t=this.i.document.getElementsByTagName("title")[0].text),t}mL(){return this.i.location.href}cL(){const t=[];return this.Dk.forEach((n=>{this.lL.forEach((i=>{n.getAttribute(this.uL)===i.url&&i.auction_id&&t.push({anchor:n,replacementUrl:`https://shop-links.co/${i.auction_id}/?amp=true`})}))})),t}}(this.hO,this.eR,this.nL,this.win),this.tL=this.AL(),this.nL.linkmateEnabled&&this.nL.linkmateExpected&&this.tL.getAnchorReplacementList())}))}eL(){const t=V.NRTV_CONFIG_ENDPOINT.replace(".nrtv_slug.",this.nL.nrtvSlug);try{return this.eR.fetchJson(t,{method:"GET",ampCors:!1}).then((t=>t.json())).then((t=>w(t)[0].amp_config))}catch(t){return null}}rL(){this.signals().signal(n);const t=this.PL(),s=new class{constructor(t){this.qt=t,this.lU={"requests":{},"triggers":{}}}setTransportConfig(t){this.lU.transport=t}setExtraUrlParams(t){this.lU.extraUrlParams=t}track(t,n){n=i(n)?n:[n],p(!this.lU.triggers[t]);const s=[];for(let i=0;i<n.length;i++){const e=`${t}-request-${i}`;this.lU.requests[e]=n[i],s.push(e)}return this.lU.triggers[t]={"on":t,"request":s},this}build(){p(this.lU);const t=new class{constructor(t,i){p(i.triggers),this.ci=t.getResourceId(),this.qt=t,this.lU=i;for(const t in i.triggers){const n=i.triggers[t].on;p(n);const s=this.fU(n);i.triggers[t].on=s}this.qt.signals().whenSignal(n).then((()=>{!function(t,n,i=!1,s=!1){const e=t.ownerDocument,r=h(e,"amp-analytics",{"sandbox":"true","trigger":s?"":"immediate"}),u=h(e,"script",{"type":"application/json"});if(u.textContent=JSON.stringify(n),r.appendChild(u),r.CONFIG=n,i){const n=y(o(t)),i=b(t);n.installExtensionForDoc(i,"amp-analytics")}else R(t).then((t=>{p(t)}));t.appendChild(r)}(this.qt,i,!0)}))}trigger(t,n){p(this.lU.triggers[t]),function(t,n,i={},s=!0){R(t).then((e=>{e&&e.triggerEventForTarget(t,n,i,s)}))}(this.qt,this.fU(t),n,!1)}fU(t){return`sandbox-${this.ci}-${t}`}}(this.qt,this.lU);return this.lU=null,t}}(this.element);s.track("page-impression",V.PAGE_IMPRESSION_ENDPOINT),s.setTransportConfig({"beacon":!0,"image":!1,"xhrpost":!0,"useBody":!0}),s.setExtraUrlParams(t),s.build().trigger("page-impression")}AL(){const t={linkSelector:this.nL.linkSelector};return this.Ik.registerLinkRewriter("amp-smartlinks",(t=>this.iL.runLinkmate(t)),t)}PL(){return{"events":[{"is_amp":!0}],"organization_id":this.nL.publisherID,"organization_type":"publisher","user":{"page_session_uuid":this.dL(),"source_url":this.mL(),"previous_url":this.cO,"user_agent":this.hO.win.navigator.userAgent}}}mL(){return this.win.location.href}dL(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(t=>(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16)))}};t.registerElement("amp-smartlinks",Z)})();
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */}});
//# sourceMappingURL=amp-smartlinks-0.1.mjs.map