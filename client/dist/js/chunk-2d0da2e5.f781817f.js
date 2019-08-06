(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0da2e5"],{"6b03":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"media--page"},[a("div",{staticClass:"page--head"},[a("div",{staticClass:"wrap--content"},[a("div",{staticClass:"page--title"},[a("div",[a("h1",{staticClass:"title--text"},[e._v("\n                        "+e._s(e.$t("media"))+"\n                        "),e.total?a("span",{staticClass:"badge--count"},[e._v("\n                            ("+e._s(e.total)+")\n                        ")]):e._e()]),a("breadcrumb",{attrs:{links:e.breadcrumb}})],1),e.isInUserPermissions("role.create")?a("div",{staticClass:"page--title--action ml-auto"},[a("button",{staticClass:"button is-primary",on:{click:e.changeModalUploadFiles}},[e._v("\n                        "+e._s(e.$t("upload"))+"\n                        "),a("i",{staticClass:"fas fa-cloud-upload-alt ml-2"})])]):e._e()])])]),a("div",{staticClass:"wrap--content"},[a("media-component",{ref:"mediaComponent",on:{setTotalItems:e.setTotalItems}})],1)])},i=[],n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"pb-0"},[a("filter-media",{on:{changeFilters:e.changeFilters}}),a("div",[e.dataLoading?[a("div",{staticClass:"media--items--wrap d-flex align-items-center justify-content-center w-100"},[a("loading-data")],1)]:[a("div",{staticClass:"media--items--wrap"},[a("div",{staticClass:"media--items"},[a("media-items",{attrs:{data:e.items},on:{checkItemsMedia:e.checkItemsMedia,fetchAllItems:e.fetchAllItems}}),a("div",{staticClass:"py-4 text-center w-100"},[a("infinite-loading",{on:{infinite:e.infiniteHandler}},[a("div",{attrs:{slot:"no-more"},slot:"no-more"}),a("div",{attrs:{slot:"no-results"},slot:"no-results"})])],1)],1)])]],2)],1),a("upload-files",{attrs:{uploadFileFromParent:e.mediaModalUploadFile},on:{changeModalUploadFiles:e.changeModalUploadFiles}}),a("create-album",{attrs:{modalCreateAlbum:e.modalCreateAlbum},on:{changeModalCreateAlbum:e.changeModalCreateAlbum}}),a("div",{staticClass:"all--actions",class:{"show--action--bottom":e.itemsSelectedMedia.length}},[a("div",{staticClass:"wrap--content"},[a("button",{staticClass:"button is-danger",on:{click:function(t){return e.confirmCustomDelete()}}},[e._v(e._s(e.$t("deleteAllSelected")))])])])],1)},l=[],o=a("75fc"),r=(a("96cf"),a("3b8d")),c=a("23e0"),d=a("c233"),m=a("8b9f"),u=a("3ce2"),h=a("d7f2"),f=a("e166"),p=a.n(f),g=h["a"].get("media"),b={data:function(){return{mediaModalUploadFile:!1,modalCreateAlbum:!1,items:[],total:null,allUserSelected:!1,page:1,pageLoadMore:2,limit:25,order:"is-centered",dataLoading:!1,filters:{},itemsSelectedMedia:[],filtersItems:{}}},created:function(){this.fetchAllItems()},components:{filterMedia:c["a"],mediaItems:d["a"],uploadFiles:m["a"],createAlbum:u["a"],InfiniteLoading:p.a},methods:{changeModalUploadFiles:function(e){this.mediaModalUploadFile=!this.mediaModalUploadFile,e&&1==e.newItem&&this.fetchAllItems()},changeModalCreateAlbum:function(){this.modalCreateAlbum=!this.modalCreateAlbum},fetchAllItems:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.pageLoadMore=2,this.dataLoading=!0,this.filters.type=this.filtersItems.type,e.next=5,g.getAllMedia(this.page,this.limit,this.filters);case 5:t=e.sent,this.items=t.docs,this.total=t.total,this.$emit("setTotalItems",t.total),this.dataLoading=!1,this.itemsSelectedMedia=[];case 11:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),checkItemsMedia:function(e){this.itemsSelectedMedia=e},confirmCustomDelete:function(){var e=this;this.$dialog.confirm({title:this.$t("mediaPage.messages.deleteItems.title"),message:this.$t("mediaPage.messages.deleteItems.message"),confirmText:this.$t("mediaPage.messages.deleteItems.confirmText"),cancelText:this.$t("mediaPage.messages.deleteItems.cancelText"),type:"is-danger",hasIcon:!0,onConfirm:function(){e.deleteItems()}})},confirmCustomSetGallery:function(){var e=this;this.$dialog.confirm({title:this.$t("mediaPage.messages.setToGallery.title"),message:this.$t("mediaPage.messages.setToGallery.message"),confirmText:this.$t("mediaPage.messages.setToGallery.confirmText"),cancelText:this.$t("mediaPage.messages.setToGallery.cancelText"),type:"is-primary",icon:"information-outline",hasIcon:!0,onConfirm:function(){e.$store.commit("setItemSelected",e.itemsSelectedMedia),e.$store.commit("openMediaImage")}})},deleteItems:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,g.deleteItems(this.itemsSelectedMedia);case 2:t=e.sent,this.fetchAllItems(),this.aleartMessage(t.message);case 5:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),infiniteHandler:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var a,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,g.getAllMedia(this.pageLoadMore,this.limit,this.filters);case 2:a=e.sent,a.docs.length?(this.pageLoadMore+=1,(s=this.items).push.apply(s,Object(o["a"])(a.docs)),t.loaded()):t.complete();case 4:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),aleartMessage:function(e){this.$snackbar.open({message:e,type:"is-success",position:"is-bottom-right",actionText:"OK",queue:!1,duration:3e3,indefinite:!1})},changeFilters:function(e){this.filtersItems=e,this.filters=e,this.fetchAllItems()}}},v=b,C=a("2877"),M=Object(C["a"])(v,n,l,!1,null,null,null),I=M.exports,w={name:"media",data:function(){return{total:"",breadcrumb:[{link:"",label:this.$t("mediaPage.breadcrumb[0]")}]}},components:{MediaComponent:I},created:function(){},watch:{},methods:{setTotalItems:function(e){this.total=e},changeModalUploadFiles:function(){this.$refs.mediaComponent.changeModalUploadFiles()}}},$=w,x=Object(C["a"])($,s,i,!1,null,null,null);t["default"]=x.exports}}]);
//# sourceMappingURL=chunk-2d0da2e5.f781817f.js.map