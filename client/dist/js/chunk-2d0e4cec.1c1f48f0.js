(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e4cec"],{9296:function(s,t,e){"use strict";e.r(t);var i=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"groups"},[e("div",{staticClass:"page--title"},[e("h1",{staticClass:"title--text"},[s._v("Groups")]),this.$route.params.id&&s.isInUserPermissions("role.create")?e("div",{staticClass:"page--title--action ml-auto"},[e("router-link",{staticClass:"button is-primary is-rounded",attrs:{to:"/groupForm"}},[s._v("Add New Group")])],1):s._e()]),e("breadcrumb",{attrs:{links:s.breadcrumb}}),e("div",{staticClass:"card--block"},[e("div",{staticClass:"card--content"},[e("form",{staticClass:"row mt-3 justify-content-center",on:{submit:function(t){return t.preventDefault(),s.submitForm()}}},[e("div",{staticClass:"col-12 col-md-10 col-lg-8 "},[e("b-field",{staticClass:"field-group mb-4"},[e("b-input",{attrs:{type:"text",rounded:"",placeholder:"Group Name"},model:{value:s.name,callback:function(t){s.name=t},expression:"name"}})],1)],1),e("div",{staticClass:"col-12 col-md-10 col-lg-8 checkbox--group permissions--items"},[e("div",{staticClass:"row align-items-center"},[s._m(0),e("div",{staticClass:"col-12 col-sm-6 text-center text-sm-right"},[s.permissions.length?e("button",{staticClass:"button is-rounded my-3 mr-2",attrs:{type:"button"},on:{click:s.unSelectAllPermissions}},[s._v("\n                                Unselect All\n                            ")]):s._e(),e("button",{staticClass:"button is-rounded my-3",attrs:{type:"button"},on:{click:s.selectAllPermissions}},[s._v("\n                                Select All\n                            ")])])]),e("div",{staticClass:"row justify-content-center"},[e("div",{staticClass:"col-12"},s._l(s.allPermissions,function(t,i){return e("div",{key:i,staticClass:"permissions--item"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 permission--title"},[s._v("\n                                        "+s._s(i)+"\n                                    ")]),e("div",{staticClass:"col-12 col-sm-6 col-md-8 col-lg-9 col-xl-10 permission--content"},s._l(t,function(t,i){return e("div",{key:t,staticClass:"item-checkbox checkbox--switch"},[e("b-checkbox-button",{attrs:{"native-value":i,type:"is-light"},model:{value:s.permissions,callback:function(t){s.permissions=t},expression:"permissions"}},[e("span",[s._v("\n                                                    "+s._s(t)+"\n                                                ")]),e("span",{staticClass:"switch--item"},[e("span",{staticClass:"check"})])])],1)}),0)])])}),0)])]),e("div",{staticClass:"col-12 text-center button--save--form mt-0"},[e("button",{staticClass:"button is-primary is-rounded",class:{"is-loading":s.isLoading}},[s._v(s._s(this.$route.params.id?"Save Changes":"Add Group"))])])])])])],1)},n=[function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"col-12 col-sm-6"},[e("h3",[s._v(" Add Permissions To Group ")])])}],r=(e("96cf"),e("3b8d")),a=(e("7f7f"),e("d7f2")),o=a["a"].get("groups"),c=a["a"].get("permissions"),u={name:"groupForm",data:function(){return{name:"",isLoading:!1,groupStatus:0,policies:[],selectPermissions:[],permissions:[],allPermissions:[],breadcrumb:[{link:"/groups",label:"groups"},{link:"",label:"add & update group"}]}},watch:{$route:function(s,t){this.$route.params.id?this.getGroup(this.$route.params.id):this.resetfuild()}},created:function(){this.$route.params.id&&this.getGroup(this.$route.params.id),this.getAllPermissions()},methods:{resetfuild:function(){this.name="",this.permissions=[]},selectAllPermissions:function(){for(var s in this.permissions=[],this.allPermissions)for(var t in this.allPermissions[s])this.permissions.push(t)},unSelectAllPermissions:function(){this.permissions=[]},submitForm:function(){this.isLoading=!1;var s={};s.name=this.name,s.permissions=this.permissions,this.isLoading=!0,this.$route.params.id?this.updateGroup(this.$route.params.id,s):this.newGroup(s)},newGroup:function(){var s=Object(r["a"])(regeneratorRuntime.mark(function s(t){var e;return regeneratorRuntime.wrap(function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,o.newGroup(t);case 2:e=s.sent,e.success?(this.successMessage(e.message),this.$router.push("/groupForm/"+e.data)):this.errorMessage(e[0]),this.isLoading=!1;case 5:case"end":return s.stop()}},s,this)}));function t(t){return s.apply(this,arguments)}return t}(),getGroup:function(){var s=Object(r["a"])(regeneratorRuntime.mark(function s(t){var e;return regeneratorRuntime.wrap(function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,o.getGroup(t);case 2:e=s.sent,this.name=e.name,this.policies=e.policies,this.roleStatus=e.status,this.permissions=e.permissions;case 7:case"end":return s.stop()}},s,this)}));function t(t){return s.apply(this,arguments)}return t}(),updateGroup:function(){var s=Object(r["a"])(regeneratorRuntime.mark(function s(t,e){var i;return regeneratorRuntime.wrap(function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,o.updateGroup(t,e);case 2:i=s.sent,i.success?this.successMessage(i.message):this.errorMessage(i[0]),this.isLoading=!1;case 5:case"end":return s.stop()}},s,this)}));function t(t,e){return s.apply(this,arguments)}return t}(),getAllPermissions:function(){var s=Object(r["a"])(regeneratorRuntime.mark(function s(){var t;return regeneratorRuntime.wrap(function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,c.getAllPermissions();case 2:t=s.sent,this.allPermissions=t;case 4:case"end":return s.stop()}},s,this)}));function t(){return s.apply(this,arguments)}return t}(),errorMessage:function(s){this.$snackbar.open({message:s,type:"is-danger",position:"is-bottom-right",actionText:"OK",queue:!1,duration:1e4,indefinite:!1})},successMessage:function(s){this.$snackbar.open({message:s,type:"is-success",position:"is-bottom-right",actionText:"OK",queue:!1,duration:1e4,indefinite:!1})}}},l=u,m=e("2877"),p=Object(m["a"])(l,i,n,!1,null,null,null);t["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d0e4cec.1c1f48f0.js.map