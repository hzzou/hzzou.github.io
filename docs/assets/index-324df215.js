import{r as a,j as o}from"./index-189c03b4.js";import{e as D,u as j,C as G,O as N}from"./OrbitControls-33771011.js";import{N as T,aj as B,ak as E,al as R,am as V,V as g,an as I,C as p,k as v}from"./three.module-e72dd0cd.js";import{u as U}from"./Gltf-b9a61636.js";import{_ as x}from"./extends-4c19d496.js";function W(d,e,l,r){const n=class extends B{constructor(c={}){const s=Object.entries(d);super({uniforms:s.reduce((i,[t,f])=>{const h=E.clone({[t]:{value:f}});return{...i,...h}},{}),vertexShader:e,fragmentShader:l}),this.key="",s.forEach(([i])=>Object.defineProperty(this,i,{get:()=>this.uniforms[i].value,set:t=>this.uniforms[i].value=t})),Object.assign(this,c),r&&r(this)}};return n.key=T.generateUUID(),n}const H=()=>parseInt(R.replace(/\D+/g,"")),L=H(),A=W({cellSize:.5,sectionSize:1,fadeDistance:100,fadeStrength:1,fadeFrom:1,cellThickness:.5,sectionThickness:1,cellColor:new p,sectionColor:new p,infiniteGrid:!1,followCamera:!1,worldCamProjPosition:new g,worldPlanePosition:new g},`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform vec3 worldPlanePosition;
    uniform float fadeDistance;
    uniform bool infiniteGrid;
    uniform bool followCamera;

    void main() {
      localPosition = position.xzy;
      if (infiniteGrid) localPosition *= 1.0 + fadeDistance;
      
      worldPosition = modelMatrix * vec4(localPosition, 1.0);
      if (followCamera) {
        worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
        localPosition = (inverse(modelMatrix) * worldPosition).xyz;
      }

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform float cellSize;
    uniform float sectionSize;
    uniform vec3 cellColor;
    uniform vec3 sectionColor;
    uniform float fadeDistance;
    uniform float fadeStrength;
    uniform float fadeFrom;
    uniform float cellThickness;
    uniform float sectionThickness;

    float getGrid(float size, float thickness) {
      vec2 r = localPosition.xz / size;
      vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
      float line = min(grid.x, grid.y) + 1.0 - thickness;
      return 1.0 - min(line, 1.0);
    }

    void main() {
      float g1 = getGrid(cellSize, cellThickness);
      float g2 = getGrid(sectionSize, sectionThickness);

      vec3 from = worldCamProjPosition*vec3(fadeFrom);
      float dist = distance(from, worldPosition.xyz);
      float d = 1.0 - min(dist / fadeDistance, 1.0);
      vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

      gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
      gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
      if (gl_FragColor.a <= 0.0) discard;

      #include <tonemapping_fragment>
      #include <${L>=154?"colorspace_fragment":"encodings_fragment"}>
    }
  `),q=a.forwardRef(({args:d,cellColor:e="#000000",sectionColor:l="#2080ff",cellSize:r=.5,sectionSize:n=1,followCamera:u=!1,infiniteGrid:c=!1,fadeDistance:s=100,fadeStrength:i=1,fadeFrom:t=1,cellThickness:f=.5,sectionThickness:h=1,side:C=I,...y},b)=>{D({GridMaterial:A});const m=a.useRef(null);a.useImperativeHandle(b,()=>m.current,[]);const w=new V,M=new g(0,1,0),k=new g(0,0,0);j(_=>{w.setFromNormalAndCoplanarPoint(M,k).applyMatrix4(m.current.matrixWorld);const P=m.current.material,O=P.uniforms.worldCamProjPosition,F=P.uniforms.worldPlanePosition;w.projectPoint(_.camera.position,O.value),F.value.set(0,0,0).applyMatrix4(m.current.matrixWorld)});const z={cellSize:r,sectionSize:n,cellColor:e,sectionColor:l,cellThickness:f,sectionThickness:h},S={fadeDistance:s,fadeStrength:i,fadeFrom:t,infiniteGrid:c,followCamera:u};return a.createElement("mesh",x({ref:m,frustumCulled:!1},y),a.createElement("gridMaterial",x({transparent:!0,"extensions-derivatives":!0,side:C},z,S)),a.createElement("planeGeometry",{args:d}))}),$="star-fqVv1",J={star:$},oe=()=>{const e=U("/models/ferrari.glb").scene,l=[e.getObjectByName("wheel_fl"),e.getObjectByName("wheel_fr"),e.getObjectByName("wheel_rl"),e.getObjectByName("wheel_rr")],r=a.useRef(null),n=new v({color:16711680,metalness:1,roughness:.5,clearcoat:1,clearcoatRoughness:.03});e.getObjectByName("body").material=n;const u=new v({color:16777215,metalness:.25,roughness:0,transmission:1});e.getObjectByName("glass").material=u;const c=()=>j(i=>{const t=-performance.now()/1e3;l.map(f=>{f.rotation.x=t*Math.PI*2}),r.current.position.z=-t%1}),s=i=>{};return o.jsx("div",{id:J.star,children:o.jsxs(G,{camera:{position:[3,2,-3.5],fov:60,aspect:window.innerWidth/window.innerHeight,near:.1,far:100},children:[o.jsx("color",{attach:"background",args:["#333"]}),o.jsx(q,{ref:r,args:[100,100],sectionSize:2,sectionColor:"#f0f",cellSize:1,cellColor:"rgba(255, 100, 0, 0.7)",fadeDistance:80}),o.jsx("axesHelper",{args:[100]}),o.jsx(N,{maxDistance:20,minDistance:5}),o.jsx("pointLight",{color:"#fff",position:[10,50,-10]}),o.jsx("ambientLight",{intensity:.3}),o.jsxs("group",{onClick:s,rotation:[0,0,0],children:[o.jsx("primitive",{object:e}),o.jsx(c,{})]})]})})};export{oe as default};
