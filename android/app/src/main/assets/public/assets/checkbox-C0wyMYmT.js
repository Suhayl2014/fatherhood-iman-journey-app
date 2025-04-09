import{c as O,u as A,o as B,j as n,d as w,e as P,f as H,v as K}from"./ui-vendor-C7McgsY-.js";import{r as s}from"./react-vendor-BhqeUVA1.js";import{u as L}from"./index-CDHhSjWI.js";import{c as j}from"./index-BImgQHmp.js";import{m as q}from"./icons-CbYejn_e.js";var E="Checkbox",[z,Y]=O(E),[T,X]=z(E),N=s.forwardRef((e,c)=>{const{__scopeCheckbox:t,name:d,checked:p,defaultChecked:r,required:h,disabled:i,value:b="on",onCheckedChange:x,form:u,...C}=e,[l,k]=s.useState(null),v=A(c,o=>k(o)),y=s.useRef(!1),R=l?u||!!l.closest("form"):!0,[f=!1,g]=B({prop:p,defaultProp:r,onChange:x}),M=s.useRef(f);return s.useEffect(()=>{const o=l?.form;if(o){const m=()=>g(M.current);return o.addEventListener("reset",m),()=>o.removeEventListener("reset",m)}},[l,g]),n.jsxs(T,{scope:t,state:f,disabled:i,children:[n.jsx(w.button,{type:"button",role:"checkbox","aria-checked":a(f)?"mixed":f,"aria-required":h,"data-state":_(f),"data-disabled":i?"":void 0,disabled:i,value:b,...C,ref:v,onKeyDown:P(e.onKeyDown,o=>{o.key==="Enter"&&o.preventDefault()}),onClick:P(e.onClick,o=>{g(m=>a(m)?!0:!m),R&&(y.current=o.isPropagationStopped(),y.current||o.stopPropagation())})}),R&&n.jsx(F,{control:l,bubbles:!y.current,name:d,value:b,checked:f,required:h,disabled:i,form:u,style:{transform:"translateX(-100%)"},defaultChecked:a(r)?!1:r})]})});N.displayName=E;var S="CheckboxIndicator",I=s.forwardRef((e,c)=>{const{__scopeCheckbox:t,forceMount:d,...p}=e,r=X(S,t);return n.jsx(H,{present:d||a(r.state)||r.state===!0,children:n.jsx(w.span,{"data-state":_(r.state),"data-disabled":r.disabled?"":void 0,...p,ref:c,style:{pointerEvents:"none",...e.style}})})});I.displayName=S;var F=e=>{const{control:c,checked:t,bubbles:d=!0,defaultChecked:p,...r}=e,h=s.useRef(null),i=L(t),b=K(c);s.useEffect(()=>{const u=h.current,C=window.HTMLInputElement.prototype,k=Object.getOwnPropertyDescriptor(C,"checked").set;if(i!==t&&k){const v=new Event("click",{bubbles:d});u.indeterminate=a(t),k.call(u,a(t)?!1:t),u.dispatchEvent(v)}},[i,t,d]);const x=s.useRef(a(t)?!1:t);return n.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:p??x.current,...r,tabIndex:-1,ref:h,style:{...e.style,...b,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function a(e){return e==="indeterminate"}function _(e){return a(e)?"indeterminate":e?"checked":"unchecked"}var D=N,$=I;const G=s.forwardRef(({className:e,...c},t)=>n.jsx(D,{ref:t,className:j("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",e),...c,children:n.jsx($,{className:j("flex items-center justify-center text-current"),children:n.jsx(q,{className:"h-3.5 w-3.5"})})}));G.displayName=D.displayName;export{G as C};
