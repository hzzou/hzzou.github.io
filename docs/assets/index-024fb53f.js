import{r as s,j as l}from"./index-b4fe13d6.js";import{c as g}from"./index-2e4736b8.js";const m=""+new URL("img_01-e20e6161.png",import.meta.url).href,a=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"})),u=""+new URL("img_02-0cd05c5f.png",import.meta.url).href,d=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"})),p=""+new URL("img_03-695c4925.png",import.meta.url).href,f=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"})),b=""+new URL("img_04-788d5e6d.png",import.meta.url).href,v=Object.freeze(Object.defineProperty({__proto__:null,default:b},Symbol.toStringTag,{value:"Module"})),y=""+new URL("img_05-90e73cef.png",import.meta.url).href,j=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"})),O=""+new URL("img_06-be1921d3.png",import.meta.url).href,S=Object.freeze(Object.defineProperty({__proto__:null,default:O},Symbol.toStringTag,{value:"Module"})),h=""+new URL("img_07-d793eabd.png",import.meta.url).href,z=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"})),L=""+new URL("img_08-6cec969c.png",import.meta.url).href,w=Object.freeze(Object.defineProperty({__proto__:null,default:L},Symbol.toStringTag,{value:"Module"})),M=""+new URL("img_09-8d49e176.png",import.meta.url).href,R=Object.freeze(Object.defineProperty({__proto__:null,default:M},Symbol.toStringTag,{value:"Module"})),T=""+new URL("img_10-edb9e57f.png",import.meta.url).href,P=Object.freeze(Object.defineProperty({__proto__:null,default:T},Symbol.toStringTag,{value:"Module"})),U=""+new URL("loading-065b38e3.png",import.meta.url).href,x=Object.freeze(Object.defineProperty({__proto__:null,default:U},Symbol.toStringTag,{value:"Module"})),I="lazy-img-qvsL-",q="img-child-Zq7zv",c={"lazy-img":"lazy-img-qvsL-",lazyImg:I,"img-child":"img-child-Zq7zv",imgChild:q},C=o=>{const[t,r]=s.useState(!1),i=s.useMemo(()=>new IntersectionObserver((e,n)=>{console.log("entires:",e),e.map(_=>{_.isIntersecting&&setTimeout(()=>{r(!0),n.disconnect()},2e3)})}),[]);return s.useEffect(()=>(o.current&&i.observe(o.current),()=>{i.disconnect()}),[o.current]),t},Z=()=>{const o=Object.assign({"/src/assets/img/img_01.png":a,"/src/assets/img/img_02.png":d,"/src/assets/img/img_03.png":f,"/src/assets/img/img_04.png":v,"/src/assets/img/img_05.png":j,"/src/assets/img/img_06.png":S,"/src/assets/img/img_07.png":z,"/src/assets/img/img_08.png":w,"/src/assets/img/img_09.png":R,"/src/assets/img/img_10.png":P,"/src/assets/img/loading.png":x});let t=[];for(const e in o)o[e].default&&t.push(o[e].default);const r=t.filter(e=>e.includes("loading"))[0];t=t.filter(e=>!e.includes("loading")),console.log(r),console.log(t);const i=e=>{const n=s.useRef(),_=C(n);return l.jsx("div",{ref:n,className:g(c.imgChild),children:_?l.jsx("img",{src:e}):l.jsx("img",{src:r})},e)};return l.jsx("div",{className:g(c.lazyImg),children:t.map(i)})};export{Z as default};