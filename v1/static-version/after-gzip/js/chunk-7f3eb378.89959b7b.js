(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7f3eb378"],{"4f36":function(t,e,s){"use strict";s.r(e);var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"follower-page"},[t._l(t.followesList,function(e){return s("div",{key:e.username,staticClass:"follower-item"},[s("div",{staticClass:"follower-cover"},[s("img",{attrs:{src:e.avatar,alt:"cover"}})]),s("div",{staticClass:"follower-name"},[s("span",{staticClass:"github-nickname"},[t._v(t._s(e.nick))]),s("span",{staticClass:"github-name"},[t._v(t._s(e.username))])]),s("div",{staticClass:"motto-desc"},[t._v("\n            "+t._s(e.bio)+"\n        ")]),s("div",{staticClass:"detail-info"},[e.company?s("div",{staticClass:"follower-company"},[s("Icon",{staticStyle:{"font-size":"20px"},attrs:{type:"ios-people"}}),t._v(" "+t._s(e.company)+"\n            ")],1):t._e(),s("div",{staticClass:"follower-location"},[s("i",{staticClass:"iconfont ",staticStyle:{"font-size":"20px"}},[t._v("")]),t._v(t._s(e.location)+"\n            ")])]),s("div",{staticClass:"follow-button"},[t._v("\n            Unfollow\n        ")])])}),s("div",{staticClass:"paging"},[s("Page",{attrs:{"show-total":"","show-sizer":"","page-size":t.pageSize,total:t.totalFollowers,current:t.currentPage,"page-size-opts":t.sizeList},on:{"update:current":function(e){t.currentPage=e},"on-change":t.changePage,"on-page-size-change":t.changeSize}})],1)],2)},a=[],n=(s("ac6a"),{name:"followers",data:function(){return{followesList:[],sizeList:[5,10,20,50],totalFollowers:10,currentPage:1,pageSize:5}},methods:{fetchFollowers:function(){var t=this;this.$axios.get("/api/profile/followers/".concat(this.pageSize,"/").concat(this.currentPage)).then(function(e){var s=e.data,o=s.data;t.followesList.splice(0,t.followesList.length),o.forEach(function(e){t.followesList.push(e)}),t.totalFollowers=s.totalFollowers}).catch(function(t){console.log(t)})},changePage:function(t){this.currentPage=t,this.fetchFollowers()},changeSize:function(t){var e=this;this.pageSize=t,this.$nextTick(function(){e.fetchFollowers()})}},created:function(){this.fetchFollowers()},beforeRouteEnter:function(t,e,s){localStorage.setItem("currentTab","followers"),s()}}),i=n,l=(s("5159"),s("2877")),c=Object(l["a"])(i,o,a,!1,null,null,null);e["default"]=c.exports},5159:function(t,e,s){"use strict";var o=s("753e"),a=s.n(o);a.a},"753e":function(t,e,s){}}]);
//# sourceMappingURL=chunk-7f3eb378.89959b7b.js.map