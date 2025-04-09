import{m as ce,c as Ve,u as K,n as Ke,o as le,j as e,d as E,p as de,q as D,e as R,i as ze,f as $,r as U,g as Ge,s as $e,t as ie}from"./ui-vendor-C7McgsY-.js";import{r as o,b as Be,L as M}from"./react-vendor-BhqeUVA1.js";import{c as F,a as Ue,u as ue,B as P}from"./index-BImgQHmp.js";import{u as He}from"./index-CDHhSjWI.js";import{C as Je,H as V,B as H,a as J,S as Ye,P as We,U as qe,e as ae}from"./icons-CbYejn_e.js";var A="NavigationMenu",[X,me,Qe]=ce(A),[Y,Xe,Ze]=ce(A),[Z,Ct]=Ve(A,[Qe,Ze]),[et,I]=Z(A),[tt,nt]=Z(A),xe=o.forwardRef((t,n)=>{const{__scopeNavigationMenu:s,value:i,onValueChange:a,defaultValue:r,delayDuration:c=200,skipDelayDuration:u=300,orientation:d="horizontal",dir:N,...l}=t,[f,b]=o.useState(null),y=K(n,w=>b(w)),h=Ke(N),g=o.useRef(0),j=o.useRef(0),C=o.useRef(0),[T,m]=o.useState(!0),[v="",x]=le({prop:i,onChange:w=>{const S=w!=="",B=u>0;S?(window.clearTimeout(C.current),B&&m(!1)):(window.clearTimeout(C.current),C.current=window.setTimeout(()=>m(!0),u)),a?.(w)},defaultProp:r}),p=o.useCallback(()=>{window.clearTimeout(j.current),j.current=window.setTimeout(()=>x(""),150)},[x]),_=o.useCallback(w=>{window.clearTimeout(j.current),x(w)},[x]),k=o.useCallback(w=>{v===w?window.clearTimeout(j.current):g.current=window.setTimeout(()=>{window.clearTimeout(j.current),x(w)},c)},[v,x,c]);return o.useEffect(()=>()=>{window.clearTimeout(g.current),window.clearTimeout(j.current),window.clearTimeout(C.current)},[]),e.jsx(ve,{scope:s,isRootMenu:!0,value:v,dir:h,orientation:d,rootNavigationMenu:f,onTriggerEnter:w=>{window.clearTimeout(g.current),T?k(w):_(w)},onTriggerLeave:()=>{window.clearTimeout(g.current),p()},onContentEnter:()=>window.clearTimeout(j.current),onContentLeave:p,onItemSelect:w=>{x(S=>S===w?"":w)},onItemDismiss:()=>x(""),children:e.jsx(E.nav,{"aria-label":"Main","data-orientation":d,dir:h,...l,ref:y})})});xe.displayName=A;var fe="NavigationMenuSub",st=o.forwardRef((t,n)=>{const{__scopeNavigationMenu:s,value:i,onValueChange:a,defaultValue:r,orientation:c="horizontal",...u}=t,d=I(fe,s),[N="",l]=le({prop:i,onChange:a,defaultProp:r});return e.jsx(ve,{scope:s,isRootMenu:!1,value:N,dir:d.dir,orientation:c,rootNavigationMenu:d.rootNavigationMenu,onTriggerEnter:f=>l(f),onItemSelect:f=>l(f),onItemDismiss:()=>l(""),children:e.jsx(E.div,{"data-orientation":c,...u,ref:n})})});st.displayName=fe;var ve=t=>{const{scope:n,isRootMenu:s,rootNavigationMenu:i,dir:a,orientation:r,children:c,value:u,onItemSelect:d,onItemDismiss:N,onTriggerEnter:l,onTriggerLeave:f,onContentEnter:b,onContentLeave:y}=t,[h,g]=o.useState(null),[j,C]=o.useState(new Map),[T,m]=o.useState(null);return e.jsx(et,{scope:n,isRootMenu:s,rootNavigationMenu:i,value:u,previousValue:He(u),baseId:de(),dir:a,orientation:r,viewport:h,onViewportChange:g,indicatorTrack:T,onIndicatorTrackChange:m,onTriggerEnter:D(l),onTriggerLeave:D(f),onContentEnter:D(b),onContentLeave:D(y),onItemSelect:D(d),onItemDismiss:D(N),onViewportContentChange:o.useCallback((v,x)=>{C(p=>(p.set(v,x),new Map(p)))},[]),onViewportContentRemove:o.useCallback(v=>{C(x=>x.has(v)?(x.delete(v),new Map(x)):x)},[]),children:e.jsx(X.Provider,{scope:n,children:e.jsx(tt,{scope:n,items:j,children:c})})})},he="NavigationMenuList",ge=o.forwardRef((t,n)=>{const{__scopeNavigationMenu:s,...i}=t,a=I(he,s),r=e.jsx(E.ul,{"data-orientation":a.orientation,...i,ref:n});return e.jsx(E.div,{style:{position:"relative"},ref:a.onIndicatorTrackChange,children:e.jsx(X.Slot,{scope:s,children:a.isRootMenu?e.jsx(Re,{asChild:!0,children:r}):r})})});ge.displayName=he;var pe="NavigationMenuItem",[it,Ne]=Z(pe),we=o.forwardRef((t,n)=>{const{__scopeNavigationMenu:s,value:i,...a}=t,r=de(),c=i||r||"LEGACY_REACT_AUTO_VALUE",u=o.useRef(null),d=o.useRef(null),N=o.useRef(null),l=o.useRef(()=>{}),f=o.useRef(!1),b=o.useCallback((h="start")=>{if(u.current){l.current();const g=q(u.current);g.length&&ne(h==="start"?g:g.reverse())}},[]),y=o.useCallback(()=>{if(u.current){const h=q(u.current);h.length&&(l.current=mt(h))}},[]);return e.jsx(it,{scope:s,value:c,triggerRef:d,contentRef:u,focusProxyRef:N,wasEscapeCloseRef:f,onEntryKeyDown:b,onFocusProxyEnter:b,onRootContentClose:y,onContentFocusOutside:y,children:e.jsx(E.li,{...a,ref:n})})});we.displayName=pe;var W="NavigationMenuTrigger",je=o.forwardRef((t,n)=>{const{__scopeNavigationMenu:s,disabled:i,...a}=t,r=I(W,t.__scopeNavigationMenu),c=Ne(W,t.__scopeNavigationMenu),u=o.useRef(null),d=K(u,c.triggerRef,n),N=Ee(r.baseId,c.value),l=Te(r.baseId,c.value),f=o.useRef(!1),b=o.useRef(!1),y=c.value===r.value;return e.jsxs(e.Fragment,{children:[e.jsx(X.ItemSlot,{scope:s,value:c.value,children:e.jsx(Ie,{asChild:!0,children:e.jsx(E.button,{id:N,disabled:i,"data-disabled":i?"":void 0,"data-state":se(y),"aria-expanded":y,"aria-controls":l,...a,ref:d,onPointerEnter:R(t.onPointerEnter,()=>{b.current=!1,c.wasEscapeCloseRef.current=!1}),onPointerMove:R(t.onPointerMove,G(()=>{i||b.current||c.wasEscapeCloseRef.current||f.current||(r.onTriggerEnter(c.value),f.current=!0)})),onPointerLeave:R(t.onPointerLeave,G(()=>{i||(r.onTriggerLeave(),f.current=!1)})),onClick:R(t.onClick,()=>{r.onItemSelect(c.value),b.current=y}),onKeyDown:R(t.onKeyDown,h=>{const j={horizontal:"ArrowDown",vertical:r.dir==="rtl"?"ArrowLeft":"ArrowRight"}[r.orientation];y&&h.key===j&&(c.onEntryKeyDown(),h.preventDefault())})})})}),y&&e.jsxs(e.Fragment,{children:[e.jsx(ze,{"aria-hidden":!0,tabIndex:0,ref:c.focusProxyRef,onFocus:h=>{const g=c.contentRef.current,j=h.relatedTarget,C=j===u.current,T=g?.contains(j);(C||!T)&&c.onFocusProxyEnter(C?"start":"end")}}),r.viewport&&e.jsx("span",{"aria-owns":l})]})]})});je.displayName=W;var at="NavigationMenuLink",oe="navigationMenu.linkSelect",ot=o.forwardRef((t,n)=>{const{__scopeNavigationMenu:s,active:i,onSelect:a,...r}=t;return e.jsx(Ie,{asChild:!0,children:e.jsx(E.a,{"data-active":i?"":void 0,"aria-current":i?"page":void 0,...r,ref:n,onClick:R(t.onClick,c=>{const u=c.target,d=new CustomEvent(oe,{bubbles:!0,cancelable:!0});if(u.addEventListener(oe,N=>a?.(N),{once:!0}),ie(u,d),!d.defaultPrevented&&!c.metaKey){const N=new CustomEvent(z,{bubbles:!0,cancelable:!0});ie(u,N)}},{checkForDefaultPrevented:!1})})})});ot.displayName=at;var ee="NavigationMenuIndicator",be=o.forwardRef((t,n)=>{const{forceMount:s,...i}=t,a=I(ee,t.__scopeNavigationMenu),r=!!a.value;return a.indicatorTrack?Be.createPortal(e.jsx($,{present:s||r,children:e.jsx(rt,{...i,ref:n})}),a.indicatorTrack):null});be.displayName=ee;var rt=o.forwardRef((t,n)=>{const{__scopeNavigationMenu:s,...i}=t,a=I(ee,s),r=me(s),[c,u]=o.useState(null),[d,N]=o.useState(null),l=a.orientation==="horizontal",f=!!a.value;o.useEffect(()=>{const h=r().find(g=>g.value===a.value)?.ref.current;h&&u(h)},[r,a.value]);const b=()=>{c&&N({size:l?c.offsetWidth:c.offsetHeight,offset:l?c.offsetLeft:c.offsetTop})};return Q(c,b),Q(a.indicatorTrack,b),d?e.jsx(E.div,{"aria-hidden":!0,"data-state":f?"visible":"hidden","data-orientation":a.orientation,...i,ref:n,style:{position:"absolute",...l?{left:0,width:d.size+"px",transform:`translateX(${d.offset}px)`}:{top:0,height:d.size+"px",transform:`translateY(${d.offset}px)`},...i.style}}):null}),L="NavigationMenuContent",ye=o.forwardRef((t,n)=>{const{forceMount:s,...i}=t,a=I(L,t.__scopeNavigationMenu),r=Ne(L,t.__scopeNavigationMenu),c=K(r.contentRef,n),u=r.value===a.value,d={value:r.value,triggerRef:r.triggerRef,focusProxyRef:r.focusProxyRef,wasEscapeCloseRef:r.wasEscapeCloseRef,onContentFocusOutside:r.onContentFocusOutside,onRootContentClose:r.onRootContentClose,...i};return a.viewport?e.jsx(ct,{forceMount:s,...d,ref:c}):e.jsx($,{present:s||u,children:e.jsx(Ce,{"data-state":se(u),...d,ref:c,onPointerEnter:R(t.onPointerEnter,a.onContentEnter),onPointerLeave:R(t.onPointerLeave,G(a.onContentLeave)),style:{pointerEvents:!u&&a.isRootMenu?"none":void 0,...d.style}})})});ye.displayName=L;var ct=o.forwardRef((t,n)=>{const s=I(L,t.__scopeNavigationMenu),{onViewportContentChange:i,onViewportContentRemove:a}=s;return U(()=>{i(t.value,{ref:n,...t})},[t,n,i]),U(()=>()=>a(t.value),[t.value,a]),null}),z="navigationMenu.rootContentDismiss",Ce=o.forwardRef((t,n)=>{const{__scopeNavigationMenu:s,value:i,triggerRef:a,focusProxyRef:r,wasEscapeCloseRef:c,onRootContentClose:u,onContentFocusOutside:d,...N}=t,l=I(L,s),f=o.useRef(null),b=K(f,n),y=Ee(l.baseId,i),h=Te(l.baseId,i),g=me(s),j=o.useRef(null),{onItemDismiss:C}=l;o.useEffect(()=>{const m=f.current;if(l.isRootMenu&&m){const v=()=>{C(),u(),m.contains(document.activeElement)&&a.current?.focus()};return m.addEventListener(z,v),()=>m.removeEventListener(z,v)}},[l.isRootMenu,t.value,a,C,u]);const T=o.useMemo(()=>{const v=g().map(S=>S.value);l.dir==="rtl"&&v.reverse();const x=v.indexOf(l.value),p=v.indexOf(l.previousValue),_=i===l.value,k=p===v.indexOf(i);if(!_&&!k)return j.current;const w=(()=>{if(x!==p){if(_&&p!==-1)return x>p?"from-end":"from-start";if(k&&x!==-1)return x>p?"to-start":"to-end"}return null})();return j.current=w,w},[l.previousValue,l.value,l.dir,g,i]);return e.jsx(Re,{asChild:!0,children:e.jsx(Ge,{id:h,"aria-labelledby":y,"data-motion":T,"data-orientation":l.orientation,...N,ref:b,disableOutsidePointerEvents:!1,onDismiss:()=>{const m=new Event(z,{bubbles:!0,cancelable:!0});f.current?.dispatchEvent(m)},onFocusOutside:R(t.onFocusOutside,m=>{d();const v=m.target;l.rootNavigationMenu?.contains(v)&&m.preventDefault()}),onPointerDownOutside:R(t.onPointerDownOutside,m=>{const v=m.target,x=g().some(_=>_.ref.current?.contains(v)),p=l.isRootMenu&&l.viewport?.contains(v);(x||p||!l.isRootMenu)&&m.preventDefault()}),onKeyDown:R(t.onKeyDown,m=>{const v=m.altKey||m.ctrlKey||m.metaKey;if(m.key==="Tab"&&!v){const p=q(m.currentTarget),_=document.activeElement,k=p.findIndex(B=>B===_),S=m.shiftKey?p.slice(0,k).reverse():p.slice(k+1,p.length);ne(S)?m.preventDefault():r.current?.focus()}}),onEscapeKeyDown:R(t.onEscapeKeyDown,m=>{c.current=!0})})})}),te="NavigationMenuViewport",Me=o.forwardRef((t,n)=>{const{forceMount:s,...i}=t,r=!!I(te,t.__scopeNavigationMenu).value;return e.jsx($,{present:s||r,children:e.jsx(lt,{...i,ref:n})})});Me.displayName=te;var lt=o.forwardRef((t,n)=>{const{__scopeNavigationMenu:s,children:i,...a}=t,r=I(te,s),c=K(n,r.onViewportChange),u=nt(L,t.__scopeNavigationMenu),[d,N]=o.useState(null),[l,f]=o.useState(null),b=d?d?.width+"px":void 0,y=d?d?.height+"px":void 0,h=!!r.value,g=h?r.value:r.previousValue;return Q(l,()=>{l&&N({width:l.offsetWidth,height:l.offsetHeight})}),e.jsx(E.div,{"data-state":se(h),"data-orientation":r.orientation,...a,ref:c,style:{pointerEvents:!h&&r.isRootMenu?"none":void 0,"--radix-navigation-menu-viewport-width":b,"--radix-navigation-menu-viewport-height":y,...a.style},onPointerEnter:R(t.onPointerEnter,r.onContentEnter),onPointerLeave:R(t.onPointerLeave,G(r.onContentLeave)),children:Array.from(u.items).map(([C,{ref:T,forceMount:m,...v}])=>{const x=g===C;return e.jsx($,{present:m||x,children:e.jsx(Ce,{...v,ref:$e(T,p=>{x&&p&&f(p)})})},C)})})}),dt="FocusGroup",Re=o.forwardRef((t,n)=>{const{__scopeNavigationMenu:s,...i}=t,a=I(dt,s);return e.jsx(Y.Provider,{scope:s,children:e.jsx(Y.Slot,{scope:s,children:e.jsx(E.div,{dir:a.dir,...i,ref:n})})})}),re=["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"],ut="FocusGroupItem",Ie=o.forwardRef((t,n)=>{const{__scopeNavigationMenu:s,...i}=t,a=Xe(s),r=I(ut,s);return e.jsx(Y.ItemSlot,{scope:s,children:e.jsx(E.button,{...i,ref:n,onKeyDown:R(t.onKeyDown,c=>{if(["Home","End",...re].includes(c.key)){let d=a().map(f=>f.ref.current);if([r.dir==="rtl"?"ArrowRight":"ArrowLeft","ArrowUp","End"].includes(c.key)&&d.reverse(),re.includes(c.key)){const f=d.indexOf(c.currentTarget);d=d.slice(f+1)}setTimeout(()=>ne(d)),c.preventDefault()}})})})});function q(t){const n=[],s=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode:i=>{const a=i.tagName==="INPUT"&&i.type==="hidden";return i.disabled||i.hidden||a?NodeFilter.FILTER_SKIP:i.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;s.nextNode();)n.push(s.currentNode);return n}function ne(t){const n=document.activeElement;return t.some(s=>s===n?!0:(s.focus(),document.activeElement!==n))}function mt(t){return t.forEach(n=>{n.dataset.tabindex=n.getAttribute("tabindex")||"",n.setAttribute("tabindex","-1")}),()=>{t.forEach(n=>{const s=n.dataset.tabindex;n.setAttribute("tabindex",s)})}}function Q(t,n){const s=D(n);U(()=>{let i=0;if(t){const a=new ResizeObserver(()=>{cancelAnimationFrame(i),i=window.requestAnimationFrame(s)});return a.observe(t),()=>{window.cancelAnimationFrame(i),a.unobserve(t)}}},[t,s])}function se(t){return t?"open":"closed"}function Ee(t,n){return`${t}-trigger-${n}`}function Te(t,n){return`${t}-content-${n}`}function G(t){return n=>n.pointerType==="mouse"?t(n):void 0}var Pe=xe,_e=ge,xt=we,Se=je,ke=be,De=ye,Fe=Me;const Le=o.forwardRef(({className:t,children:n,...s},i)=>e.jsxs(Pe,{ref:i,className:F("relative z-10 flex max-w-max flex-1 items-center justify-center",t),...s,children:[n,e.jsx(Oe,{})]}));Le.displayName=Pe.displayName;const Ae=o.forwardRef(({className:t,...n},s)=>e.jsx(_e,{ref:s,className:F("group flex flex-1 list-none items-center justify-center space-x-1",t),...n}));Ae.displayName=_e.displayName;const O=xt,ft=Ue("group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"),vt=o.forwardRef(({className:t,children:n,...s},i)=>e.jsxs(Se,{ref:i,className:F(ft(),"group",t),...s,children:[n," ",e.jsx(Je,{className:"relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180","aria-hidden":"true"})]}));vt.displayName=Se.displayName;const ht=o.forwardRef(({className:t,...n},s)=>e.jsx(De,{ref:s,className:F("left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",t),...n}));ht.displayName=De.displayName;const Oe=o.forwardRef(({className:t,...n},s)=>e.jsx("div",{className:F("absolute left-0 top-full flex justify-center"),children:e.jsx(Fe,{className:F("origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",t),ref:s,...n})}));Oe.displayName=Fe.displayName;const gt=o.forwardRef(({className:t,...n},s)=>e.jsx(ke,{ref:s,className:F("top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",t),...n,children:e.jsx("div",{className:"relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md"})}));gt.displayName=ke.displayName;const pt=()=>{const{signOut:t}=ue();return e.jsx("header",{className:"bg-white shadow-sm",children:e.jsx("div",{className:"container-app",children:e.jsxs("div",{className:"flex items-center justify-between py-4",children:[e.jsx("div",{className:"flex items-center",children:e.jsxs(M,{to:"/",className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-10 h-10 rounded-full bg-islamic-green flex items-center justify-center",children:e.jsx(V,{className:"h-5 w-5 text-islamic-cream"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-xl font-bold text-islamic-green",children:"Iman Journey"}),e.jsx("p",{className:"text-xs text-islamic-teal",children:"For Muslim Fathers"})]})]})}),e.jsx(Le,{children:e.jsxs(Ae,{children:[e.jsx(O,{children:e.jsxs(M,{to:"/lessons",className:"flex items-center gap-2 px-4 py-2 text-sm font-medium text-islamic-green hover:text-islamic-teal",children:[e.jsx(H,{className:"h-4 w-4"}),"Lessons"]})}),e.jsx(O,{children:e.jsxs(M,{to:"/milestones",className:"flex items-center gap-2 px-4 py-2 text-sm font-medium text-islamic-green hover:text-islamic-teal",children:[e.jsx(J,{className:"h-4 w-4"}),"Milestones"]})}),e.jsx(O,{children:e.jsxs(M,{to:"/duas",className:"flex items-center gap-2 px-4 py-2 text-sm font-medium text-islamic-green hover:text-islamic-teal",children:[e.jsx(Ye,{className:"h-4 w-4"}),"Duas"]})}),e.jsx(O,{children:e.jsxs(M,{to:"/journal",className:"flex items-center gap-2 px-4 py-2 text-sm font-medium text-islamic-green hover:text-islamic-teal",children:[e.jsx(We,{className:"h-4 w-4"}),"Journal"]})}),e.jsx(O,{children:e.jsxs(M,{to:"/community",className:"flex items-center gap-2 px-4 py-2 text-sm font-medium text-islamic-green hover:text-islamic-teal",children:[e.jsx(qe,{className:"h-4 w-4"}),"Community"]})})]})}),e.jsx("div",{className:"flex space-x-2",children:e.jsx(P,{variant:"outline",onClick:t,children:"Sign Out"})})]})})})},Mt=()=>{const[t,n]=o.useState(!0),{user:s}=ue();return e.jsxs("div",{className:"flex flex-col min-h-screen",children:[s?e.jsx(pt,{}):e.jsx("header",{className:"bg-white shadow-sm",children:e.jsx("div",{className:"container-app",children:e.jsxs("div",{className:"flex items-center justify-between py-4",children:[e.jsx("div",{className:"flex items-center",children:e.jsxs(M,{to:"/",className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-10 h-10 rounded-full bg-islamic-green flex items-center justify-center",children:e.jsx(V,{className:"h-5 w-5 text-islamic-cream"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-xl font-bold text-islamic-green",children:"Iman Journey"}),e.jsx("p",{className:"text-xs text-islamic-teal",children:"For Muslim Fathers"})]})]})}),e.jsxs("div",{className:"flex space-x-2",children:[e.jsx(P,{variant:"outline",asChild:!0,children:e.jsx(M,{to:"/auth?mode=signin",children:"Sign In"})}),e.jsx(P,{asChild:!0,children:e.jsx(M,{to:"/auth?mode=signup",children:"Register"})})]})]})})}),e.jsxs("main",{className:"flex-grow",children:[e.jsxs("section",{className:"relative overflow-hidden",children:[e.jsx("div",{className:`transition-opacity duration-500 ${t?"opacity-100":"opacity-0"}`,children:e.jsx("div",{className:"bg-islamic-green text-white py-20",children:e.jsx("div",{className:"container mx-auto px-4 max-w-6xl",children:e.jsxs("div",{className:"flex flex-col md:flex-row md:items-center",children:[e.jsxs("div",{className:"md:w-1/2 mb-8 md:mb-0",children:[e.jsx("h2",{className:"text-4xl md:text-5xl font-bold mb-4 font-decorative",children:"Your Iman Journey as a Father"}),e.jsx("p",{className:"text-xl mb-6 text-islamic-sand",children:"Islamic guidance and practical tools for Muslim fathers navigating parenthood with faith and purpose."}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4",children:[e.jsx(P,{className:"bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-green",asChild:!0,children:e.jsx(M,{to:"/auth?mode=signup",children:"Start Your Journey"})}),e.jsx(P,{variant:"outline",className:"border-islamic-sand text-islamic-sand hover:bg-islamic-sand/10",onClick:()=>n(!1),children:"Learn More"})]})]}),e.jsx("div",{className:"md:w-1/2 md:pl-8",children:e.jsxs("div",{className:"rounded-lg overflow-hidden shadow-lg bg-islamic-teal relative",children:[e.jsx("div",{className:"absolute inset-0 islamic-pattern opacity-10"}),e.jsxs("div",{className:"p-8 relative z-10",children:[e.jsx("h2",{className:"text-2xl font-bold mb-4 text-islamic-cream",children:'"The best of you are those who are best to their families."'}),e.jsx("p",{className:"italic text-islamic-sand",children:"- Prophet Muhammad (peace be upon him)"})]})]})})]})})})}),e.jsx("div",{className:`absolute inset-0 transition-opacity duration-500 ${t?"opacity-0":"opacity-100"}`,children:e.jsx("div",{className:"bg-islamic-blue text-white py-20",children:e.jsx("div",{className:"container mx-auto px-4 max-w-6xl",children:e.jsxs("div",{className:"flex flex-col md:flex-row md:items-center",children:[e.jsxs("div",{className:"md:w-1/2 mb-8 md:mb-0",children:[e.jsx("h2",{className:"text-4xl md:text-5xl font-bold mb-4 font-decorative",children:"Track Your Child's Growth"}),e.jsx("p",{className:"text-xl mb-6",children:"Monitor milestones, celebrate achievements, and nurture development with Islamic guidance."}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4",children:[e.jsx(P,{className:"bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-blue",asChild:!0,children:e.jsx(M,{to:"/auth?mode=signup",children:"Register Now"})}),e.jsx(P,{variant:"outline",className:"border-white text-white hover:bg-white/10",onClick:()=>n(!0),children:"Back"})]})]}),e.jsx("div",{className:"md:w-1/2 md:pl-8",children:e.jsx("div",{className:"grid grid-cols-2 gap-4",children:[{icon:J,title:"Physical Development",description:"Track physical growth milestones"},{icon:H,title:"Cognitive Learning",description:"Monitor intellectual development"},{icon:V,title:"Emotional Growth",description:"Nurture emotional intelligence"},{icon:ae,title:"Islamic Values",description:"Incorporate Islamic teachings"}].map((i,a)=>e.jsxs("div",{className:"bg-white/10 p-4 rounded-lg backdrop-blur-sm",children:[e.jsx(i.icon,{className:"h-8 w-8 mb-2 text-islamic-gold"}),e.jsx("h3",{className:"font-bold mb-1",children:i.title}),e.jsx("p",{className:"text-sm",children:i.description})]},a))})})]})})})})]}),e.jsx("section",{className:"py-16 bg-white",children:e.jsxs("div",{className:"container mx-auto px-4 max-w-6xl",children:[e.jsxs("div",{className:"text-center mb-12",children:[e.jsx("h2",{className:"text-3xl font-bold mb-4 text-islamic-green",children:"Features Designed for Muslim Fathers"}),e.jsx("p",{className:"text-lg text-gray-600 max-w-2xl mx-auto",children:"Our app combines Islamic wisdom with practical parenting tools to help you raise children with strong faith and character."})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:[{title:"Child Milestone Tracking",description:"Monitor your child's development across physical, cognitive, social, emotional, and spiritual domains with Islamic perspective.",icon:J},{title:"Islamic Lessons",description:"Access age-appropriate Islamic teachings to introduce to your children at the right developmental stages.",icon:H},{title:"Personalized Dashboard",description:"Get an overview of your child's progress and upcoming developmental milestones to focus on.",icon:ae}].map((i,a)=>e.jsxs("div",{className:"border rounded-lg p-6 hover:shadow-lg transition-shadow",children:[e.jsx("div",{className:"w-12 h-12 rounded-full bg-islamic-green/10 flex items-center justify-center mb-4",children:e.jsx(i.icon,{className:"h-6 w-6 text-islamic-green"})}),e.jsx("h3",{className:"text-xl font-bold mb-2 text-islamic-green",children:i.title}),e.jsx("p",{className:"text-gray-600",children:i.description})]},a))})]})}),e.jsx("section",{className:"py-16 bg-islamic-green text-white text-center",children:e.jsxs("div",{className:"container mx-auto px-4 max-w-6xl",children:[e.jsx(V,{className:"h-16 w-16 mx-auto mb-6 text-islamic-gold"}),e.jsx("h2",{className:"text-3xl font-bold mb-4",children:"Start Your Iman Journey Today"}),e.jsx("p",{className:"max-w-2xl mx-auto mb-8 text-islamic-sand",children:"Join thousands of Muslim fathers growing spiritually while nurturing their families with confidence and purpose."}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center",children:[e.jsx(P,{className:"bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-green text-lg px-8 py-6 h-auto",asChild:!0,children:e.jsx(M,{to:"/auth?mode=signup",children:"Register Now"})}),e.jsx(P,{variant:"outline",className:"border-islamic-sand text-islamic-sand hover:bg-islamic-sand/10 text-lg px-8 py-6 h-auto",asChild:!0,children:e.jsx(M,{to:"/auth?mode=signin",children:"Sign In"})})]})]})})]}),e.jsx("footer",{className:"bg-gray-800 text-white py-8",children:e.jsxs("div",{className:"container mx-auto px-4 max-w-6xl",children:[e.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-center",children:[e.jsxs("div",{className:"mb-4 md:mb-0",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-8 h-8 rounded-full bg-islamic-green flex items-center justify-center",children:e.jsx(V,{className:"h-4 w-4 text-white"})}),e.jsx("span",{className:"font-bold text-xl",children:"Iman Journey"})]}),e.jsx("p",{className:"text-sm mt-2 text-gray-300",children:"Supporting Muslim fathers in their parenting journey"})]}),e.jsx("div",{className:"flex gap-8",children:e.jsxs("div",{children:[e.jsx("h4",{className:"font-bold mb-2",children:"Quick Links"}),e.jsxs("ul",{className:"space-y-1 text-sm text-gray-300",children:[e.jsx("li",{children:e.jsx(M,{to:"/auth?mode=signin",className:"hover:text-islamic-gold",children:"Sign In"})}),e.jsx("li",{children:e.jsx(M,{to:"/auth?mode=signup",className:"hover:text-islamic-gold",children:"Register"})})]})]})})]}),e.jsxs("div",{className:"mt-8 pt-4 border-t border-gray-700 text-sm text-center text-gray-400",children:["© ",new Date().getFullYear()," Iman Journey. All rights reserved."]})]})})]})};export{Mt as default};
