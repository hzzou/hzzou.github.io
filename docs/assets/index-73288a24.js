import{u as a,j as o}from"./index-1ea85c40.js";import{u as e,B as l}from"./globalStore-94b19468.js";import"./index-2e4736b8.js";import"./extends-98964cd2.js";import"./hox-root-018b4882.js";const p=()=>{const s=a();console.log("ue:",e());const{countState:t,countDispatch:n}=e();console.log("c:",t);const c=()=>{s("/home")},i=()=>{n({type:"SUB"})};return o.jsxs("div",{className:"home-detail",children:[o.jsx("div",{children:t.count}),o.jsx(l,{onClick:i,children:"reducer共享"}),o.jsx("div",{children:"homeDetail"}),o.jsx("div",{onClick:c,children:"返回"})]})};export{p as default};