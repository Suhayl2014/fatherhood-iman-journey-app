import{j as e}from"./ui-vendor-C7McgsY-.js";import{i as I,r as j,e as E,L as g}from"./react-vendor-BhqeUVA1.js";import{z as r,u as f}from"./form-vendor-BfT7G_Dv.js";import{F as w,a as n,b as l,c as o,d as i,e as c,t as y}from"./form-mLNjPGYL.js";import{u as A,B as b,t as C}from"./index-BImgQHmp.js";import{I as m}from"./input-DPPaCPuN.js";import{H as U}from"./icons-CbYejn_e.js";import"./label-D3kNmkFD.js";const D=r.object({email:r.string().email("Please enter a valid email address"),password:r.string().min(6,"Password must be at least 6 characters")}),J=r.object({fullName:r.string().min(2,"Full name must be at least 2 characters"),email:r.string().email("Please enter a valid email address"),password:r.string().min(6,"Password must be at least 6 characters"),confirmPassword:r.string().min(6,"Password must be at least 6 characters")}).refine(a=>a.password===a.confirmPassword,{message:"Passwords don't match",path:["confirmPassword"]}),Y=()=>{const[a]=I(),[d,N]=j.useState(a.get("mode")!=="signup"),{signIn:S,signUp:v,user:p}=A(),h=E();j.useEffect(()=>{p&&h("/dashboard")},[p,h]),j.useEffect(()=>{N(a.get("mode")!=="signup")},[a]);const x=f({resolver:y(D),defaultValues:{email:"",password:""}}),t=f({resolver:y(J),defaultValues:{fullName:"",email:"",password:"",confirmPassword:""}}),P=async s=>{try{await S(s.email,s.password),h("/dashboard")}catch(u){console.error("Sign in error:",u)}},F=async s=>{try{await v(s.email,s.password,s.fullName),C({title:"Check your email",description:"Please verify your email address to continue."})}catch(u){console.error("Sign up error:",u)}};return e.jsxs("div",{className:"min-h-screen flex flex-col bg-gray-50",children:[e.jsx("header",{className:"bg-white shadow-sm",children:e.jsx("div",{className:"container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",children:e.jsx("div",{className:"flex justify-between h-16 items-center",children:e.jsxs(g,{to:"/",className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-10 h-10 rounded-full bg-islamic-green flex items-center justify-center",children:e.jsx(U,{className:"h-5 w-5 text-islamic-cream"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-xl font-bold text-islamic-green",children:"Iman Journey"}),e.jsx("p",{className:"text-xs text-islamic-teal",children:"For Muslim Fathers"})]})]})})})}),e.jsx("div",{className:"flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8",children:e.jsxs("div",{className:"max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("h2",{className:"mt-2 text-3xl font-extrabold text-gray-900",children:d?"Sign in to your account":"Create your account"}),e.jsxs("p",{className:"mt-2 text-sm text-gray-600",children:[d?"Don't have an account? ":"Already have an account? ",e.jsx(g,{to:d?"/auth?mode=signup":"/auth?mode=signin",className:"font-medium text-islamic-green hover:text-islamic-green/80",children:d?"Sign up":"Sign in"})]})]}),d?e.jsx(w,{...x,children:e.jsxs("form",{onSubmit:x.handleSubmit(P),className:"space-y-6",children:[e.jsx(n,{control:x.control,name:"email",render:({field:s})=>e.jsxs(l,{children:[e.jsx(o,{children:"Email"}),e.jsx(i,{children:e.jsx(m,{placeholder:"you@example.com",...s})}),e.jsx(c,{})]})}),e.jsx(n,{control:x.control,name:"password",render:({field:s})=>e.jsxs(l,{children:[e.jsx(o,{children:"Password"}),e.jsx(i,{children:e.jsx(m,{type:"password",placeholder:"••••••••",...s})}),e.jsx(c,{})]})}),e.jsx(b,{type:"submit",className:"w-full",children:"Sign in"})]})}):e.jsx(w,{...t,children:e.jsxs("form",{onSubmit:t.handleSubmit(F),className:"space-y-6",children:[e.jsx(n,{control:t.control,name:"fullName",render:({field:s})=>e.jsxs(l,{children:[e.jsx(o,{children:"Full Name"}),e.jsx(i,{children:e.jsx(m,{placeholder:"John Doe",...s})}),e.jsx(c,{})]})}),e.jsx(n,{control:t.control,name:"email",render:({field:s})=>e.jsxs(l,{children:[e.jsx(o,{children:"Email"}),e.jsx(i,{children:e.jsx(m,{placeholder:"you@example.com",...s})}),e.jsx(c,{})]})}),e.jsx(n,{control:t.control,name:"password",render:({field:s})=>e.jsxs(l,{children:[e.jsx(o,{children:"Password"}),e.jsx(i,{children:e.jsx(m,{type:"password",placeholder:"••••••••",...s})}),e.jsx(c,{})]})}),e.jsx(n,{control:t.control,name:"confirmPassword",render:({field:s})=>e.jsxs(l,{children:[e.jsx(o,{children:"Confirm Password"}),e.jsx(i,{children:e.jsx(m,{type:"password",placeholder:"••••••••",...s})}),e.jsx(c,{})]})}),e.jsx(b,{type:"submit",className:"w-full",children:"Sign up"})]})})]})}),e.jsx("footer",{className:"bg-white py-4 border-t",children:e.jsxs("div",{className:"container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500",children:["© ",new Date().getFullYear()," Iman Journey. All rights reserved."]})})]})};export{Y as default};
