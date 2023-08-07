import{r as a,j as o}from"./index-1ea85c40.js";import{e as G,u as j,m as D,C as B,O as F}from"./OrbitControls-f2d0a94d.js";import{d as T,e as N,U as R,C as x,V as u,f as E,B as U,g as p}from"./three.module-d13e5444.js";import{u as V}from"./useGLTF-02f99b61.js";import{_ as v}from"./extends-98964cd2.js";function W(m,e,l,r){const n=class extends N{constructor(c={}){const s=Object.entries(m);super({uniforms:s.reduce((i,[t,f])=>{const h=R.clone({[t]:{value:f}});return{...i,...h}},{}),vertexShader:e,fragmentShader:l}),this.key="",s.forEach(([i])=>Object.defineProperty(this,i,{get:()=>this.uniforms[i].value,set:t=>this.uniforms[i].value=t})),Object.assign(this,c),r&&r(this)}};return n.key=T.generateUUID(),n}const L=W({cellSize:.5,sectionSize:1,fadeDistance:100,fadeStrength:1,cellThickness:.5,sectionThickness:1,cellColor:new x,sectionColor:new x,infiniteGrid:!1,followCamera:!1,worldCamProjPosition:new u,worldPlanePosition:new u},`
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

      float dist = distance(worldCamProjPosition, worldPosition.xyz);
      float d = 1.0 - min(dist / fadeDistance, 1.0);
      vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

      gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
      gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
      if (gl_FragColor.a <= 0.0) discard;

      #include <tonemapping_fragment>
      #include <encodings_fragment>
    }
  `),A=a.forwardRef(({args:m,cellColor:e="#000000",sectionColor:l="#2080ff",cellSize:r=.5,sectionSize:n=1,followCamera:d=!1,infiniteGrid:c=!1,fadeDistance:s=100,fadeStrength:i=1,cellThickness:t=.5,sectionThickness:f=1,side:h=U,...C},y)=>{G({GridMaterial:L});const g=a.useRef(null),w=new E,b=new u(0,1,0),M=new u(0,0,0);j(S=>{w.setFromNormalAndCoplanarPoint(b,M).applyMatrix4(g.current.matrixWorld);const P=g.current.material,_=P.uniforms.worldCamProjPosition,O=P.uniforms.worldPlanePosition;w.projectPoint(S.camera.position,_.value),O.value.set(0,0,0).applyMatrix4(g.current.matrixWorld)});const z={cellSize:r,sectionSize:n,cellColor:e,sectionColor:l,cellThickness:t,sectionThickness:f},k={fadeDistance:s,fadeStrength:i,infiniteGrid:c,followCamera:d};return a.createElement("mesh",v({ref:D([g,y]),frustumCulled:!1},C),a.createElement("gridMaterial",v({transparent:!0,"extensions-derivatives":!0,side:h},z,k)),a.createElement("planeGeometry",{args:m}))}),H="star-fqVv1",q={star:H},Z=()=>{const e=V("/models/ferrari.glb").scene,l=[e.getObjectByName("wheel_fl"),e.getObjectByName("wheel_fr"),e.getObjectByName("wheel_rl"),e.getObjectByName("wheel_rr")],r=a.useRef(null),n=new p({color:16711680,metalness:1,roughness:.5,clearcoat:1,clearcoatRoughness:.03});e.getObjectByName("body").material=n;const d=new p({color:16777215,metalness:.25,roughness:0,transmission:1});e.getObjectByName("glass").material=d;const c=()=>j(i=>{const t=-performance.now()/1e3;l.map(f=>{f.rotation.x=t*Math.PI*2}),r.current.position.z=-t%1}),s=i=>{console.log("ev:",i)};return o.jsx("div",{id:q.star,children:o.jsxs(B,{camera:{position:[3,2,-3.5],fov:60,aspect:window.innerWidth/window.innerHeight,near:.1,far:100},children:[o.jsx("color",{attach:"background",args:["#333"]}),o.jsx(A,{ref:r,args:[100,100],sectionSize:2,sectionColor:"#f0f",cellSize:1,cellColor:"rgba(255, 100, 0, 0.7)",fadeDistance:80}),o.jsx("axesHelper",{args:[100]}),o.jsx(F,{maxDistance:20,minDistance:5}),o.jsx("pointLight",{color:"#fff",position:[10,50,-10]}),o.jsx("ambientLight",{intensity:.3}),o.jsxs("group",{onClick:s,rotation:[0,0,0],children:[o.jsx("primitive",{object:e}),o.jsx(c,{})]})]})})};export{Z as default};
