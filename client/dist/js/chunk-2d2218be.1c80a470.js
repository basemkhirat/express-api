(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2218be"],{cb8a:function(t,e,s){"use strict";s.r(e);var i,a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"posts"},[s("div",{staticClass:"page--head"},[s("div",{staticClass:"wrap--content"},[s("div",{staticClass:"page--title"},[s("div",[s("h1",{staticClass:"title--text"},[t._v("\n                        Posts\n                        "),t.total?s("span",{staticClass:"badge--count"},[t._v("\n                            ("+t._s(t.total)+")\n                        ")]):t._e()]),s("breadcrumb",{attrs:{links:t.breadcrumb}})],1),t.isInUserPermissions("post.create")?s("div",{staticClass:"page--title--action ml-auto"},[s("router-link",{staticClass:"button is-primary is-rounded",attrs:{to:"/postForm"}},[t._v("Add New Post")])],1):t._e()])])]),s("div",{staticClass:"wrap--content"},[s("div",{staticClass:"card-filter--herader"},[s("filter-items",{attrs:{allItemChecked:t.allItemChecked},on:{selectAllItems:t.selectAllItems,featchByFilter:t.featchByFilter}})],1),t.dataLoading?[s("loading-data")]:[t.posts.length?s("list",{attrs:{allItemsSelected:t.allItemsSelected,data:t.posts},on:{fetchAllItems:t.fetchAllItems,checkButtonSelectAll:t.checkButtonSelectAll}}):s("div",{staticClass:"no-data"},[s("span",[t._v("No Data Here")])])],t.posts.length?[s("div",{staticClass:"pagination--custom--number"},[s("b-pagination",{attrs:{total:t.total,current:t.page,order:t.order,rounded:!0,"per-page":t.limit},on:{"update:current":function(e){t.page=e}}})],1)]:t._e()],2)])},l=[],c=(s("96cf"),s("3b8d")),n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._l(t.data,function(e){return s("item",{key:e.id,attrs:{item:e,itemsSelected:t.itemsSelected},on:{fetchAllItems:t.fetchAllItems,checkboxItem:t.checkboxItemStatus}})}),[s("div",{staticClass:"all--actions",class:{"show--action--bottom":t.itemsSelected.length}},[s("div",{staticClass:"wrap--content"},[s("button",{staticClass:"button is-danger is-rounded",on:{click:function(e){return t.deleteItems()}}},[t._v("Delete All Selected")])])])]],2)},r=[],o=s("bd86"),u=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.item.policies.indexOf("post.view")>-1?s("div",{staticClass:"block--item"},[s("div",{staticClass:"row align-items-center"},[s("div",{staticClass:"item--checkbox"},[s("b-checkbox",{attrs:{"native-value":t.item.id},on:{input:function(e){return t.updateCheckbox(t.item.id)}},model:{value:t.checkItemSelected,callback:function(e){t.checkItemSelected=e},expression:"checkItemSelected"}})],1),s("div",{staticClass:"col-12 col-sm-6 col-xl table--item-4"},[s("div",{staticClass:"block--item--title d-flex align-items-center item--text"},[s("div",{staticClass:"text--title"},[t._v("\n                        "+t._s(t.item.title)+"\n                    ")])])]),s("div",{staticClass:"col-12 col-sm-6 col-xl table--item"},[s("div",{staticClass:"block--item--title d-flex align-items-center item--text"},[t._m(0),s("div",{staticClass:"text--title text-capitalize"},[t._v("\n                        "+t._s(t.item.user.first_name+" "+t.item.user.last_name)+"\n                    ")])])]),s("div",{staticClass:"col-12 col-sm-6 col-xl table--item"},[s("div",{staticClass:"block--item--title d-flex align-items-center justify-content-center item--text"},[s("div",{staticClass:"text--title"},[1===t.item.status?s("b-tag",{attrs:{type:"is-success",rounded:""}},[t._v("Published")]):s("b-tag",{attrs:{type:"is-danger",rounded:""}},[t._v("Not Published")])],1)])]),s("div",{staticClass:"col-12 col-sm-6 col-xl table--item"},[s("div",{staticClass:"item--text"},[t._m(1),t._v("\n                    "+t._s(t.item.created)+"\n                ")])]),s("div",{staticClass:"col-12 col-sm-12 col-xl item--text table--item"},[s("div",{staticClass:"all--item--action d-flex align-item-center"},[s("div",{staticClass:"all--item--action d-flex align-item-center"},[t.item.policies.indexOf("post.update")>-1?s("router-link",{staticClass:"button--circle is-primary-light",attrs:{to:"/postForm/"+t.item.id}},[s("i",{staticClass:"fas fa-pen"})]):t._e(),t.item.policies.indexOf("post.delete")>-1?s("button",{staticClass:"button--circle is-danger-light",on:{click:function(e){return t.deleteItem(t.item.id)}}},[s("i",{staticClass:"fas fa-trash"})]):t._e()],1)])])])]):t._e()},d=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon"},[s("i",{staticClass:"fas fa-user"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon"},[s("i",{staticClass:"fas fa-clock"})])}],m=s("d7f2"),h=m["a"].get("posts"),f={props:["item","itemsSelected"],data:function(){return{checkItemSelected:!1}},watch:{itemsSelected:function(){var t=this;this.itemsSelected.length?this.itemsSelected.map(function(e){e==t.item.id&&(t.checkItemSelected=!0)}):this.checkItemSelected=!1}},methods:{deleteItem:function(t){this.confirmCustomDelete(t)},updateCheckbox:function(){this.$emit("checkboxItem",{id:this.item.id,status:this.checkItemSelected})},updatePost:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(e,s){var i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,h.updatePost(e,s);case 2:i=t.sent,this.aleartMessage(i.message);case 4:case"end":return t.stop()}},t,this)}));function e(e,s){return t.apply(this,arguments)}return e}(),deletePost:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(e){var s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,h.deletePost(e);case 2:s=t.sent,this.aleartMessage(s.message),this.$emit("fetchAllItems");case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),aleartMessage:function(t){this.$snackbar.open({message:t,type:"is-success",position:"is-bottom-right",actionText:"OK",queue:!1,duration:3e3,indefinite:!1})},confirmCustomDelete:function(t){var e=this;this.$dialog.confirm({title:"Deleting Post",message:"Are you sure you want to <b>delete</b> This Post? This action cannot be undone.",confirmText:"Delete Post",type:"is-danger",hasIcon:!0,onConfirm:function(){return e.deletePost(t)}})}}},p=f,v=s("2877"),b=Object(v["a"])(p,u,d,!1,null,null,null),g=b.exports,C=m["a"].get("posts"),k={props:["data","allItemsSelected"],data:function(){return{itemsSelected:[]}},components:{Item:g},watch:{allItemsSelected:function(){var t=this;this.allItemsSelected?this.data.map(function(e){t.itemsSelected.push(e.id)}):this.itemsSelected=[]},itemsSelected:function(){this.itemsSelected.length&&this.$emit("checkButtonSelectAll",this.itemsSelected)}},methods:(i={checkboxItemStatus:function(t){if(1==t.status)!this.itemsSelected.indexOf(t.id)>-1&&this.itemsSelected.push(t.id);else if(this.itemsSelected.indexOf(t.id)>-1)for(var e=0;e<this.itemsSelected.length;e++)this.itemsSelected[e]==t.id&&this.itemsSelected.splice(e,1)},deleteItems:function(){this.confirmCustomDelete(this.itemsSelected)},deletePosts:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,C.deletePosts(e);case 2:t.sent,this.$emit("fetchAllItems");case 4:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},Object(o["a"])(i,"deletePosts",function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(e){var s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,C.deletePosts(e);case 2:s=t.sent,this.$emit("fetchAllItems"),this.aleartMessage(s.message);case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()),Object(o["a"])(i,"updatePosts",function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(e,s){var i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,C.updatePosts(e,s);case 2:i=t.sent,this.$emit("fetchAllItems"),this.aleartMessage(i.message);case 5:case"end":return t.stop()}},t,this)}));function e(e,s){return t.apply(this,arguments)}return e}()),Object(o["a"])(i,"fetchAllItems",function(){this.$emit("fetchAllItems")}),Object(o["a"])(i,"aleartMessage",function(t){this.$snackbar.open({message:t,type:"is-success",position:"is-bottom-right",actionText:"OK",queue:!1,duration:3e3,indefinite:!1})}),Object(o["a"])(i,"confirmCustomDelete",function(t){var e=this;this.$dialog.confirm({title:"Deleting Groups",message:"Are you sure you want to <b>delete</b> all Groups? This action cannot be undone.",confirmText:"Delete Groups",type:"is-danger",hasIcon:!0,onConfirm:function(){return e.deletePosts(t)}})}),i)},y=k,x=Object(v["a"])(y,n,r,!1,null,null,null),I=x.exports,w=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"filter--items"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 col-lg"},[s("div",{staticClass:"filter--items--left"},[s("div",{staticClass:"input--fuild"},[s("button",{staticClass:"button is-rounded w-100",class:{"is-primary":t.checkItem},on:{click:t.selectAllItems}},[t._v("\n                        Select All\n                    ")])])])]),s("div",{staticClass:"col-12 col-lg"},[s("div",{staticClass:"filter--items--right"},[s("div",{staticClass:"input--fuild"},[s("b-tooltip",{attrs:{always:!!this.dateFrom>0||!!this.dateTo.length>0,type:"is-dark",active:!this.modalFilterByDate&&(!!this.dateFrom.length||!!this.dateTo.length),label:(this.dateFrom?"From: "+this.dateFrom:"")+(this.dateFrom&&this.dateTo?" - ":"")+(this.dateTo?"To: "+this.dateTo:"")}},[s("button",{staticClass:"button is-rounded w-100",on:{click:t.filterByDate}},[s("i",{staticClass:"far fa-calendar-alt"})])])],1),s("div",{staticClass:"input--fuild"},[s("v-select",{staticClass:"select--with--icon w-100 w-fuild-md v--select--scroll",attrs:{options:t.orderOptions,clearable:!1,label:"title"},scopedSlots:t._u([{key:"option",fn:function(e){return[t._v("\n                            "+t._s(e.title)+"\n                        ")]}}]),model:{value:t.order,callback:function(e){t.order=e},expression:"order"}})],1),s("div",{staticClass:"input--fuild"},[s("v-select",{staticClass:"select--with--icon w-100 v--select--scroll",attrs:{options:t.allCategories,label:"name",placeholder:"Sort By Categories"},scopedSlots:t._u([{key:"option",fn:function(e){return[t._v("\n                            "+t._s(e.name)+"\n                        ")]}}]),model:{value:t.categories,callback:function(e){t.categories=e},expression:"categories"}})],1),s("div",{staticClass:"input--fuild"},[s("v-select",{staticClass:"select--with--icon w-100 v--select--scroll w-fuild-md",attrs:{options:t.allFormat,label:"name",placeholder:"Sort By Format"},scopedSlots:t._u([{key:"option",fn:function(e){return[t._v("\n                            "+t._s(e.name)+"\n                        ")]}}]),model:{value:t.format,callback:function(e){t.format=e},expression:"format"}})],1),s("div",{staticClass:"input--fuild"},[s("v-select",{staticClass:"select--with--icon w-100 v--select--scroll w-fuild-md",attrs:{options:t.allStatus,label:"name",placeholder:"Sort By Status"},scopedSlots:t._u([{key:"option",fn:function(e){return[t._v("\n                            "+t._s(e.name)+"\n                        ")]}}]),model:{value:t.status,callback:function(e){t.status=e},expression:"status"}})],1),s("div",{staticClass:"input--fuild"},[s("div",{staticClass:"search icon--right"},[s("b-input",{attrs:{placeholder:"Search...",type:"search","icon-pack":"fa",rounded:"",icon:"search"},model:{value:t.searchQuery,callback:function(e){t.searchQuery=e},expression:"searchQuery"}})],1)])])])]),s("b-modal",{staticClass:"modal--custom",attrs:{"has-modal-card":!1,active:t.modalFilterByDate,"can-cancel":!1,width:640,scroll:"keep"},on:{"update:active":function(e){t.modalFilterByDate=e}}},[s("div",{staticClass:"card-content text-left"},[s("b-field",{staticClass:"field-group flex-column"},[s("label",{staticClass:"label"},[t._v("Date From")]),s("datetime",{staticClass:"custom--datetime theme-primary",attrs:{type:"datetime",placeholder:"From","use12-hour":""},model:{value:t.dateFrom,callback:function(e){t.dateFrom=e},expression:"dateFrom"}})],1),s("b-field",{staticClass:"field-group flex-column"},[s("label",{staticClass:"label"},[t._v("Date To")]),s("datetime",{staticClass:"custom--datetime theme-primary",attrs:{type:"datetime",placeholder:"To","use12-hour":""},model:{value:t.dateTo,callback:function(e){t.dateTo=e},expression:"dateTo"}})],1)],1),s("div",{staticClass:"d-flex justify-content-center"},[s("button",{staticClass:"button is-rounded is-danger mr-2",attrs:{type:"button"},on:{click:function(e){return t.unsetDate()}}},[t._v("Unset Date")]),s("button",{staticClass:"button is-primary is-rounded",attrs:{type:"button"},on:{click:t.setDate}},[t._v("Set Date")])])])],1)},S=[],_=s("859b"),F=(s("d355"),s("3304")),A=m["a"].get("categories"),B={props:["allItemChecked"],data:function(){return{status:"",checkItem:!1,searchQuery:"",filters:{categories:[]},allStatus:[{id:"1",name:"Published"},{id:"0",name:"Not Published"}],categories:[],allCategories:[],format:"",allFormat:F["a"],page:1,limit:100,modalFilterByDate:!1,dateFrom:"",dateTo:"",orderOptions:F["b"],order:"Recent"}},components:{Datetime:_["Datetime"]},watch:{allItemChecked:function(){0==this.allItemChecked&&(this.checkItem=!1)},searchQuery:function(){var t=this;this.filters.searchQuery=this.searchQuery,clearTimeout(this.debounce),this.debounce=setTimeout(function(){t.$emit("featchByFilter",t.filters)},500)},status:function(){this.status?(this.filters.status=this.status.id,this.$emit("featchByFilter",this.filters)):(this.filters.status="",this.$emit("featchByFilter",this.filters))},order:function(){this.filters.order=this.order.value,this.$emit("featchByFilter",this.filters)},format:function(){this.format?(this.filters.format=this.format.value,this.$emit("featchByFilter",this.filters)):(this.filters.format="",this.$emit("featchByFilter",this.filters))},categories:function(){this.categories?(this.filters.categories=this.categories.id,this.$emit("featchByFilter",this.filters)):(this.filters.categories="",this.$emit("featchByFilter",this.filters))}},created:function(){this.fetchAllCategories()},methods:{selectAllItems:function(){this.checkItem=!this.checkItem,this.$emit("selectAllItems",this.checkItem)},filterByDate:function(){this.modalFilterByDate=!0},unsetDate:function(){this.modalFilterByDate=!1,this.dateFrom="",this.dateTo="",this.filters.dateFrom=this.dateFrom,this.filters.dateTo=this.dateTo,this.$emit("featchByFilter",this.filters)},setDate:function(){this.modalFilterByDate=!1,this.filters.dateFrom=this.dateFrom,this.filters.dateTo=this.dateTo,this.$emit("featchByFilter",this.filters)},fetchAllCategories:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,A.getAllCategories(this.page,this.limit);case 2:e=t.sent,this.allCategories=e.data.docs;case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()}},D=B,$=Object(v["a"])(D,w,S,!1,null,null,null),T=$.exports,O=m["a"].get("posts"),P={name:"posts",data:function(){return{posts:[],total:null,allItemsSelected:!1,allItemChecked:0,page:1,limit:10,order:"is-centered",dataLoading:!0,breadcrumb:[{link:"",label:"posts"}]}},components:{List:I,FilterItems:T},created:function(){this.fetchAllItems()},watch:{page:function(){this.fetchAllItems()}},methods:{selectAllItems:function(t){this.allItemsSelected=!!t},checkButtonSelectAll:function(t){this.allItemChecked=t},fetchAllItems:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(e){var s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.dataLoading=!0,t.next=3,O.getAllPosts(this.page,this.limit,e);case 3:s=t.sent,this.posts=s.data.docs,this.total=s.data.total,this.dataLoading=!1;case 7:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),featchByFilter:function(t){this.fetchAllItems(t)}}},j=P,R=Object(v["a"])(j,a,l,!1,null,null,null);e["default"]=R.exports}}]);
//# sourceMappingURL=chunk-2d2218be.1c80a470.js.map