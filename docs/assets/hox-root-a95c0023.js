import{r as y,R as s}from"./index-cc8122ae.js";var i={},d={get exports(){return i},set exports(e){i=e}},p={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u=y;function m(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var x=typeof Object.is=="function"?Object.is:m,S=u.useState,v=u.useEffect,E=u.useLayoutEffect,g=u.useDebugValue;function h(e,t){var n=t(),r=S({inst:{value:n,getSnapshot:t}}),o=r[0].inst,c=r[1];return E(function(){o.value=n,o.getSnapshot=t,a(o)&&c({inst:o})},[e,n,t]),v(function(){return a(o)&&c({inst:o}),e(function(){a(o)&&c({inst:o})})},[e]),g(n),n}function a(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!x(e,n)}catch{return!0}}function O(e,t){return t()}var w=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?O:h;p.useSyncExternalStore=u.useSyncExternalStore!==void 0?u.useSyncExternalStore:w;(function(e){e.exports=p})(d);globalThis&&globalThis.__rest;let l=[];const f=new Set;function j(e){l=[...l,e],f.forEach(t=>t())}const _=e=>{const t=i.useSyncExternalStore(n=>(f.add(n),()=>{f.delete(n)}),()=>l);return s.createElement(s.Fragment,null,t.map((n,r)=>s.createElement(n,{key:r})),e.children)};export{_ as H,j as r,i as s};
