import{r,j as e}from"./index-734b79ba.js";import{a as s,C as c,O as m}from"./OrbitControls-a583ce54.js";import{B as g,o as t}from"./three.module-d13e5444.js";import{P as h}from"./PerspectiveCamera-045e2e8d.js";import"./extends-98964cd2.js";const x="house-68vFg",l={house:x},C=()=>{const o=r.useRef();s(t,"/textures/houseImg/top.png"),s(t,"/textures/houseImg/bottom.png"),s(t,"/textures/houseImg/left.png"),s(t,"/textures/houseImg/right.png"),s(t,"/textures/houseImg/front.png"),s(t,"/textures/houseImg/back.png");const a=s(t,"/textures/houseImg/quan.png"),n=()=>(r.useEffect(()=>{console.log(o.current)},[o.current]),null),i=u=>{console.log(u)};return e.jsx("div",{id:l.house,children:e.jsxs(c,{children:[e.jsx("color",{attach:"background",args:["#dedede"]}),e.jsx(h,{fov:6,aspect:window.innerWidth/window.innerHeight,near:.1,far:10,position:[0,0,0]}),e.jsx(m,{minPolarAngle:Math.PI/2,maxPolarAngle:Math.PI/2,minDistance:.1,maxDistance:5}),e.jsx("ambientLight",{intensity:1,args:["#dedede"]}),e.jsxs("mesh",{onClick:i,scale:[2,2,-2],position:[0,0,0],children:[e.jsx("sphereGeometry",{ref:o,args:[3]}),e.jsx("meshStandardMaterial",{side:g,toneMapped:!1,map:a,attach:"material"}),e.jsx(n,{})]})]})})};export{C as default};