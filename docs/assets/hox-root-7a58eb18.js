import{r as S,R as c}from"./index-189c03b4.js";var l={},d={get exports(){return l},set exports(e){l=e}},p={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u=S;function y(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var E=typeof Object.is=="function"?Object.is:y,v=u.useState,m=u.useEffect,x=u.useLayoutEffect,b=u.useDebugValue;function h(e,t){var r=t(),n=v({inst:{value:r,getSnapshot:t}}),o=n[0].inst,a=n[1];return x(function(){o.value=r,o.getSnapshot=t,s(o)&&a({inst:o})},[e,r,t]),m(function(){return s(o)&&a({inst:o}),e(function(){s(o)&&a({inst:o})})},[e]),b(r),r}function s(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!E(e,r)}catch{return!0}}function g(e,t){return t()}var O=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?g:h;p.useSyncExternalStore=u.useSyncExternalStore!==void 0?u.useSyncExternalStore:O;(function(e){e.exports=p})(d);globalThis&&globalThis.__rest;let f=[];const i=new Set;function j(e){f=[...f,e],i.forEach(t=>t())}const R=e=>{const t=l.useSyncExternalStore(r=>(i.add(r),()=>{i.delete(r)}),()=>f);return c.createElement(c.Fragment,null,t.map((r,n)=>c.createElement(r,{key:n})),e.children)};export{R as H,j as r,l as s};
