import{r as _,j as g}from"./index-5149de6d.js";import{c as l}from"./index-2e4736b8.js";const a="https://hzzou.github.io/react-three-fiber-demo/assets/img_01-e20e6161.png",m=Object.freeze(Object.defineProperty({__proto__:null,default:a},Symbol.toStringTag,{value:"Module"})),u="https://hzzou.github.io/react-three-fiber-demo/assets/img_02-0cd05c5f.png",b=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"})),d="https://hzzou.github.io/react-three-fiber-demo/assets/img_03-695c4925.png",p=Object.freeze(Object.defineProperty({__proto__:null,default:d},Symbol.toStringTag,{value:"Module"})),f="https://hzzou.github.io/react-three-fiber-demo/assets/img_04-788d5e6d.png",h=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"})),z="https://hzzou.github.io/react-three-fiber-demo/assets/img_05-90e73cef.png",v=Object.freeze(Object.defineProperty({__proto__:null,default:z},Symbol.toStringTag,{value:"Module"})),y="https://hzzou.github.io/react-three-fiber-demo/assets/img_06-be1921d3.png",j=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"})),O="https://hzzou.github.io/react-three-fiber-demo/assets/img_07-d793eabd.png",S=Object.freeze(Object.defineProperty({__proto__:null,default:O},Symbol.toStringTag,{value:"Module"})),M="https://hzzou.github.io/react-three-fiber-demo/assets/img_08-6cec969c.png",T=Object.freeze(Object.defineProperty({__proto__:null,default:M},Symbol.toStringTag,{value:"Module"})),P="https://hzzou.github.io/react-three-fiber-demo/assets/img_09-8d49e176.png",x=Object.freeze(Object.defineProperty({__proto__:null,default:P},Symbol.toStringTag,{value:"Module"})),I="https://hzzou.github.io/react-three-fiber-demo/assets/img_10-edb9e57f.png",q=Object.freeze(Object.defineProperty({__proto__:null,default:I},Symbol.toStringTag,{value:"Module"})),C="https://hzzou.github.io/react-three-fiber-demo/assets/loading-065b38e3.png",L=Object.freeze(Object.defineProperty({__proto__:null,default:C},Symbol.toStringTag,{value:"Module"})),E="lazy-img-qvsL-",N="img-child-Zq7zv",c={"lazy-img":"lazy-img-qvsL-",lazyImg:E,"img-child":"img-child-Zq7zv",imgChild:N},Z=s=>{const[t,o]=_.useState(!1),i=_.useMemo(()=>new IntersectionObserver((e,r)=>{console.log("entires:",e),e.map(n=>{n.isIntersecting&&setTimeout(()=>{o(!0),r.disconnect()},2e3)})}),[]);return _.useEffect(()=>(s.current&&i.observe(s.current),()=>{i.disconnect()}),[s.current]),t},R=()=>{const s=Object.assign({"/src/assets/img/img_01.png":m,"/src/assets/img/img_02.png":b,"/src/assets/img/img_03.png":p,"/src/assets/img/img_04.png":h,"/src/assets/img/img_05.png":v,"/src/assets/img/img_06.png":j,"/src/assets/img/img_07.png":S,"/src/assets/img/img_08.png":T,"/src/assets/img/img_09.png":x,"/src/assets/img/img_10.png":q,"/src/assets/img/loading.png":L});let t=[];for(const e in s)s[e].default&&t.push(s[e].default);const o=t.filter(e=>e.includes("loading"))[0];t=t.filter(e=>!e.includes("loading")),console.log(o),console.log(t);const i=e=>{const r=_.useRef(),n=Z(r);return g.jsx("div",{ref:r,className:l(c.imgChild),children:n?g.jsx("img",{src:e}):g.jsx("img",{src:o})},e)};return g.jsx("div",{className:l(c.lazyImg),children:t.map(i)})};export{R as default};