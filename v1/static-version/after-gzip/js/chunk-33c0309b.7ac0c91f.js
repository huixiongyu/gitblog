(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-33c0309b"],{6401:function(t,s,e){},"7f7f":function(t,s,e){var a=e("86cc").f,i=Function.prototype,r=/^\s*function ([^ (]*)/,n="name";n in i||e("9e1e")&&a(i,n,{configurable:!0,get:function(){try{return(""+this).match(r)[1]}catch(t){return""}}})},bbd9:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"register"},[e("div",{staticClass:"register-header"},[e("Row",[e("i-col",{attrs:{span:"3"}},[e("div",[t._v(".")])]),e("i-col",{staticClass:"nav-to",attrs:{span:"10"}},[e("svg",{staticClass:"octicon octicon-mark-github text-white logo-white",attrs:{height:"32",viewBox:"0 0 16 16",version:"1.1",width:"32","aria-hidden":"true"}},[e("path",{attrs:{"fill-rule":"evenodd",d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"}})]),e("a",{staticClass:"register-link",attrs:{href:"/"}},[t._v("Why Github?")]),e("a",{staticClass:"register-link",attrs:{href:"/"}},[t._v("Enterprise")]),e("a",{staticClass:"register-link",attrs:{href:"/"}},[t._v("Explore")]),e("a",{staticClass:"register-link",attrs:{href:"/"}},[t._v("Marketplace")]),e("a",{staticClass:"register-link",attrs:{href:"/"}},[t._v("Pricing")])]),e("i-col",{staticClass:"register-search",attrs:{span:"8",offset:"1"}},[e("Input",{staticStyle:{width:"240px"},attrs:{icon:"md-create",placeholder:"Search Github"}}),e("a",{staticClass:"register-link sign-in",attrs:{href:"/signin"}},[t._v("Sign in")]),e("Button",{staticClass:"register-link sign-up",attrs:{type:"default",ghost:"",to:"/register"}},[t._v("Sign up")])],1),e("i-col",{attrs:{span:"2"}})],1)],1),e("div",{staticClass:"register-content"},[e("i-col",{attrs:{span:"3"}},[e("div",[t._v(".")])]),e("i-col",{attrs:{span:"9"}},[e("h1",{staticClass:"for-developers"},[t._v("Built for developers")]),e("div",{staticClass:"github-desc"},[t._v("GitHub is a development platform inspired by the way you work. From "),e("a",{staticClass:"desc-link"},[t._v("open source")]),t._v(" to "),e("a",{staticClass:"desc-link"},[t._v("business")]),t._v(", you can host and review code, manage projects, and build software alongside 31 million developers.")])]),e("i-col",{attrs:{span:"10",offset:"1"}},[e("Card",{staticClass:"signup-box",staticStyle:{width:"430px",height:"432px"}},[e("Form",{ref:"signInfo",attrs:{model:t.signInfo,rules:t.ruleValidate,"label-position":"top"}},[e("FormItem",{attrs:{label:"Username",prop:"username"}},[e("Input",{attrs:{size:"large",placeholder:"Pick a username"},model:{value:t.signInfo.username,callback:function(s){t.$set(t.signInfo,"username",s)},expression:"signInfo.username"}})],1),e("FormItem",{attrs:{label:"Email",prop:"email"}},[e("Input",{attrs:{size:"large",type:"email",placeholder:"you@example.com"},model:{value:t.signInfo.email,callback:function(s){t.$set(t.signInfo,"email",s)},expression:"signInfo.email"}})],1),e("FormItem",{attrs:{label:"Password",prop:"password"}},[e("Input",{attrs:{size:"large",type:"password",placeholder:"Create a password"},model:{value:t.signInfo.password,callback:function(s){t.$set(t.signInfo,"password",s)},expression:"signInfo.password"}})],1),e("div",{staticClass:"signup-tips"},[t._v("Make sure it's "),e("span",{staticClass:"input-limit"},[t._v("more than 15 characters")]),t._v(" OR "),e("span",{staticClass:"input-limit"},[t._v("at least 8 characters including a number and a lowercase letter")]),t._v("."),e("a",{staticClass:"input-tips"},[t._v(" Learn more")]),t._v(".")]),e("FormItem",[e("Button",{staticClass:"signup-button",staticStyle:{height:"66px"},attrs:{type:"success",long:""},on:{click:function(s){return t.handleSubmit("signInfo")}}},[t._v("Sign up for Github\n                        ")])],1),e("div",{staticClass:"signup-clause"},[t._v("By clicking “Sign up for GitHub”, you agree to our "),e("a",{staticClass:"input-tips"},[t._v("terms of service")]),t._v(" and "),e("a",{staticClass:"input-tips"},[t._v("privacy statement")]),t._v(". We’ll occasionally send you account related emails.")])],1)],1)],1),e("i-col",{attrs:{span:"1"}},[e("div",[t._v(".")])])],1)])},i=[],r=(e("7f7f"),{name:"register",data:function(){var t=function(t,s,e){if(!s)return e(new Error("The password cannot be empty"));/^[~!@#$%^&*\-+=_.0-9a-zA-Z]{8,30}$/.test(s)?e():e("Not satisfied password requirement")};return{signInfo:{username:"",email:"",password:""},ruleValidate:{username:[{required:!0,message:"The username cannot be empty",trigger:"blur"}],mail:[{required:!0,message:"Mailbox cannot be empty",trigger:"blur"},{type:"email",message:"Incorrect email format",trigger:"blur"}],password:[{required:!0,message:"Password cannot be empty",trigger:"blur"},{validator:t}]}}},methods:{handleSubmit:function(t){var s=this;this.$refs[t].validate(function(t){if(!t)return s.$Message.error("Fail!"),!1;s.$axios.post("/api/users/register",s.signInfo).then(function(){s.$Message.success("Success!!Turn to Sign In"),s.$router.push("/signin")})})}}}),n=r,o=(e("d4cd"),e("2877")),l=Object(o["a"])(n,a,i,!1,null,null,null);s["default"]=l.exports},d4cd:function(t,s,e){"use strict";var a=e("6401"),i=e.n(a);i.a}}]);
//# sourceMappingURL=chunk-33c0309b.7ac0c91f.js.map