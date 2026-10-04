import{$ as e,L as t,a as n,i as r,n as i,o as a,r as o,t as s,w as c}from"./r3f-DbCves8A.js";import{D as l,i as u,n as d,r as f}from"./index-Dkr4CE0F.js";var p=e();function m({level:e}){let t=l(e=>e.quality),c=l(e=>e.isMobile);return(0,p.jsxs)(o,{multisampling:c?0:4,enableNormalPass:!1,children:[(0,p.jsx)(s,{luminanceThreshold:.62,luminanceSmoothing:.25,intensity:e===`wide`?.75:.5,mipmapBlur:!0,radius:.65}),e===`micro`&&t===`high`&&!c?(0,p.jsx)(i,{target:[0,.3,0],focalLength:.06,bokehScale:2.4}):(0,p.jsx)(p.Fragment,{}),(0,p.jsx)(n,{offset:.25,darkness:.55}),(0,p.jsx)(r,{mode:a.ACES_FILMIC})]})}var h=(e={})=>{let{sssColor:n=`#ff6a5a`,sssStrength:r=.35,sssPower:i=2.5,rim:a=0,rimColor:o=`#9fe6ff`,deform:s=!1,inflate:l=!1,belly:p=!1,ribFlex:m=!1,...h}=e,g=new t({roughness:.45,metalness:0,clearcoat:.5,clearcoatRoughness:.3,...h}),_={uScale:{value:{x:1,y:1,z:1}},uDome:{value:0},uBreath:{value:0},uInflate:{value:0},uBelly:{value:0},uRibFlex:{value:0},uLightDir:{value:{x:.4,y:.8,z:.5}},uSssColor:{value:new c(n)},uSssStrength:{value:r},uSssPower:{value:i},uRim:{value:a},uRimColor:{value:new c(o)},uHighlight:{value:0}};return g.tissue=_,g.onBeforeCompile=e=>{Object.assign(e.uniforms,_);let t=e.vertexShader,n=e.fragmentShader,r=[`uniform float uInflate;`,`uniform float uBelly;`,`uniform float uRibFlex;`,s?d:`uniform vec3 uScale; uniform float uDome; uniform float uBreath;`].join(`
`);if(t=t.replace(`#include <common>`,`#include <common>\n${r}`),s)t=t.replace(`#include <beginnormal_vertex>`,f),t=t.replace(`#include <begin_vertex>`,u);else{let e=``;l&&(e+=`
transformed += normalize(objectNormal) * uInflate;`),p&&(e+=`
{
  float w = smoothstep(-0.58, -0.32, position.y) * smoothstep(-0.04, -0.22, position.y);
  float front = max(0.0, position.z) / 0.12;
  transformed.z -= uBelly * w * front;
}`),m&&(e+=`
{
  // Lower ribs flex inward (bucket handle: x) and the sternum/anterior ends drop back and down
  // (pump handle: z, y). The AP diameter changes more than the transverse one.
  float w = smoothstep(0.16, -0.22, position.y);
  float kx = 1.0 - uRibFlex * w;
  float kz = 1.0 - 1.4 * uRibFlex * w;
  transformed.x *= kx;
  transformed.z = 0.02 + (transformed.z - 0.02) * kz;
  transformed.y -= 0.5 * uRibFlex * w * max(0.0, transformed.z);
}`),e+=`
transformed *= 1.0 + uBreath * 0.012;`,t=t.replace(`#include <begin_vertex>`,`#include <begin_vertex>${e}`)}n=n.replace(`#include <common>`,`#include <common>
uniform vec3 uLightDir;
uniform vec3 uSssColor;
uniform float uSssStrength;
uniform float uSssPower;
uniform float uRim;
uniform vec3 uRimColor;
uniform float uHighlight;`),n=n.replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
float tissueFresnel = pow(1.0 - saturate(dot(normalize(vViewPosition), normal)), 3.0);
#ifdef USE_TRANSPARENT_RIM
diffuseColor.a = saturate(diffuseColor.a + uRim * tissueFresnel);
#endif`),n=n.replace(`#include <opaque_fragment>`,`{
  vec3 lDir = normalize((viewMatrix * vec4(normalize(uLightDir), 0.0)).xyz);
  vec3 vDir = normalize(vViewPosition);
  vec3 h = normalize(lDir + normal * 0.35);
  float back = pow(saturate(dot(vDir, -h)), uSssPower);
  float wrap = saturate(dot(normal, lDir) * 0.5 + 0.5);
  outgoingLight += uSssColor * (back * uSssStrength + wrap * uSssStrength * 0.25) * diffuseColor.rgb;
  outgoingLight += uRimColor * tissueFresnel * uRim * 0.6;
  outgoingLight += uRimColor * uHighlight * (0.25 + 0.5 * tissueFresnel);
}
#include <opaque_fragment>`),e.vertexShader=t,e.fragmentShader=n},h.transparent&&a>0&&(g.defines={...g.defines??{},USE_TRANSPARENT_RIM:``}),g.customProgramCacheKey=()=>`tissue|${+!!s}${+!!l}${+!!p}${+!!m}${h.transparent&&a>0?1:0}`,g},g=(e,t,n)=>{for(let r of e){let e=r.tissue;e.uScale.value.x=t.sx,e.uScale.value.y=t.sy,e.uScale.value.z=t.sz,e.uDome.value=t.dome,e.uBreath.value=n,e.uBelly.value=t.belly,e.uRibFlex.value=t.ribFlex}};export{h as n,m as r,g as t};