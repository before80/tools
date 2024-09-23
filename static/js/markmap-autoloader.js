/**
 * Minified by jsDelivr using Terser v5.19.0.
 * Original file: /npm/markmap-autoloader@0.15.4/dist/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
/*! markmap-autoloader v0.15.4 | MIT License */
this.markmap=this.markmap||{},function(t){"use strict";function e(){return e=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},e.apply(this,arguments)}
/*! markmap-common v0.15.3 | MIT License */function r(){return r=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},r.apply(this,arguments)}const n={jsdelivr:t=>`https://cdn.jsdelivr.net/npm/${t}`,unpkg:t=>`https://unpkg.com/${t}`};const o=new class{constructor(){this.providers=r({},n),this.provider="jsdelivr"}getFastestProvider(t=5e3,e="npm2url/dist/index.cjs"){return new Promise(((r,n)=>{Promise.all(Object.entries(this.providers).map((async([t,n])=>{try{const o=await fetch(n(e));if(!o.ok)throw o;await o.text(),r(t)}catch(t){}}))).then((()=>n(new Error("All providers failed")))),setTimeout(n,t,new Error("Timed out"))}))}async findFastestProvider(t){return this.provider=await this.getFastestProvider(t),this.provider}setProvider(t,e){e?this.providers[t]=e:delete this.providers[t]}getFullUrl(t,e=this.provider){if(t.includes("://"))return t;const r=this.providers[e];if(!r)throw new Error(`Provider ${e} not found`);return r(t)}};Math.random().toString(36).slice(2,8);
/*! @gera2ld/jsx-dom v2.2.2 | ISC License */
const a=1,s=2,i="http://www.w3.org/2000/svg",l="http://www.w3.org/1999/xlink",d={show:l,actuate:l,href:l},c=t=>"string"==typeof t||"number"==typeof t,p=t=>(null==t?void 0:t.vtype)===a,u=t=>(null==t?void 0:t.vtype)===s;function f(t,e,...r){return function(t,e){let r;if("string"==typeof t)r=a;else{if("function"!=typeof t)throw new Error("Invalid VNode type");r=s}return{vtype:r,type:t,props:e}}(t,e=Object.assign({},e,{children:1===r.length?r[0]:r}))}function m(t){return t.children}const v={isSvg:!1};function h(t,e){Array.isArray(e)||(e=[e]),(e=e.filter(Boolean)).length&&t.append(...e)}const y={className:"class",labelFor:"for"};function g(t,e,r,n){if(e=y[e]||e,!0===r)t.setAttribute(e,"");else if(!1===r)t.removeAttribute(e);else{const o=n?d[e]:void 0;void 0!==o?t.setAttributeNS(o,e,r):t.setAttribute(e,r)}}function w(t,e){return Array.isArray(t)?t.map((t=>w(t,e))).reduce(((t,e)=>t.concat(e)),[]):b(t,e)}function b(t,e=v){if(null==t||"boolean"==typeof t)return null;if(t instanceof Node)return t;if(u(t)){const{type:r,props:n}=t;if(r===m){const t=document.createDocumentFragment();if(n.children){h(t,w(n.children,e))}return t}return b(r(n),e)}if(c(t))return document.createTextNode(`${t}`);if(p(t)){let r;const{type:n,props:o}=t;if(e.isSvg||"svg"!==n||(e=Object.assign({},e,{isSvg:!0})),r=e.isSvg?document.createElementNS(i,n):document.createElement(n),function(t,e,r){for(const n in e)if("key"!==n&&"children"!==n&&"ref"!==n)if("dangerouslySetInnerHTML"===n)t.innerHTML=e[n].__html;else if("innerHTML"===n||"textContent"===n||"innerText"===n||"value"===n&&["textarea","select"].includes(t.tagName)){const r=e[n];null!=r&&(t[n]=r)}else n.startsWith("on")?t[n.toLowerCase()]=e[n]:g(t,n,e[n],r.isSvg)}(r,o,e),o.children){let t=e;e.isSvg&&"foreignObject"===n&&(t=Object.assign({},t,{isSvg:!1}));const a=w(o.children,t);null!=a&&h(r,a)}const{ref:a}=o;return"function"==typeof a&&a(r),r}throw new Error("mount: Invalid Vnode!")}function k(...t){return b(f(...t))}const S=function(t){const e={};return function(...r){const n=`${r[0]}`;let o=e[n];return o||(o={value:t(...r)},e[n]=o),o.value}}((t=>{document.head.append(k("link",{rel:"preload",as:"script",href:t}))})),j={},O={};async function P(t,e){var n;const o="script"===t.type&&(null==(n=t.data)?void 0:n.src)||"";if(t.loaded||(t.loaded=j[o]),!t.loaded&&("script"===t.type&&(t.loaded=new Promise(((e,n)=>{document.head.append(k("script",r({},t.data,{onLoad:e,onError:n}))),o||e(void 0)})).then((()=>{t.loaded=!0})),o&&(j[o]=t.loaded)),"iife"===t.type)){const{fn:r,getParams:n}=t.data;r(...(null==n?void 0:n(e))||[]),t.loaded=!0}await t.loaded}function E(t){const e="stylesheet"===t.type&&t.data.href||"";t.loaded||(t.loaded=O[e]),t.loaded||(t.loaded=!0,e&&(O[e]=!0),"style"===t.type?document.head.append(k("style",{textContent:t.data})):"stylesheet"===t.type&&document.head.append(k("link",r({rel:"stylesheet"},t.data))))}async function A(t,e){t.forEach((t=>{var e;"script"===t.type&&null!=(e=t.data)&&e.src&&S(t.data.src)})),e=r({getMarkmap:()=>window.markmap},e);for(const r of t)await P(r,e)}function x(t){for(const e of t)E(e)}var C;const L={},T=e({baseJs:["d3@7.8.5","markmap-lib@0.15.4","markmap-view@0.15.4","markmap-toolbar@0.15.4"],baseCss:["markmap-toolbar@0.15.4/dist/style.css"],manual:!1,toolbar:!1},null==(C=window.markmap)?void 0:C.autoLoader);const F=async function(){if("function"==typeof T.provider)o.setProvider(o.provider="autoLoader",T.provider);else if("string"==typeof T.provider)o.provider=T.provider;else try{await o.findFastestProvider()}catch(t){}await Promise.all([A(T.baseJs.map((t=>"string"==typeof t?{type:"script",data:{src:o.getFullUrl(t)}}:t))),x(T.baseCss.map((t=>"string"==typeof t?{type:"stylesheet",data:{href:o.getFullUrl(t)}}:t)))]);const{markmap:t}=window,e=document.createElement("style");e.textContent=t.globalCSS,document.body.prepend(e),null==T.onReady||T.onReady()}();function M(t){var e;const{Transformer:r,Markmap:n,deriveOptions:a,Toolbar:s}=window.markmap,i=(null==(e=t.textContent)?void 0:e.split("\n"))||[];let l=1/0;i.forEach((t=>{var e;const r=(null==(e=t.match(/^\s*/))?void 0:e[0].length)||0;r<t.length&&(l=Math.min(l,r))}));const d=i.map((t=>t.slice(l))).join("\n").trim(),c=new r(T.transformPlugins);c.urlBuilder=o,t.innerHTML="<svg></svg>";const p=t.firstChild,u=n.create(p,{embedGlobalCSS:!1});if(T.toolbar){const{el:e}=s.create(u);Object.assign(e.style,{position:"absolute",right:"20px",bottom:"20px"}),t.append(e)}const f=()=>{const{root:t,frontmatter:e}=function(t,e){const r=t.transform(e),n=Object.keys(r.features).filter((t=>!L[t]));n.forEach((t=>{L[t]=!0}));const{styles:o,scripts:a}=t.getAssets(n),{markmap:s}=window;return o&&s.loadCSS(o),a&&s.loadJS(a),r}(c,d),r=null==e?void 0:e.markmap,n=a(r);u.setData(t,n),u.fit()};c.hooks.retransform.tap(f),f()}async function N(t){await F,t.querySelectorAll(".markmap").forEach(M)}function $(){return N(document)}T.manual||("loading"===document.readyState?document.addEventListener("DOMContentLoaded",(()=>{$()})):$()),t.ready=F,t.render=M,t.renderAll=$,t.renderAllUnder=N}(this.markmap.autoLoader=this.markmap.autoLoader||{});
//# sourceMappingURL=/sm/1f08acc2a9a27d19a01ba8f84089b887335f952084ab403dded57be471561626.map