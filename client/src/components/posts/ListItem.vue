<template>
    <div class="block--item">
        <div class="row align-items-center">
                <div class="item--checkbox">
                    <b-checkbox v-model="checkItemSelected" @input="updateCheckbox(item.id)" :native-value="item.id">
                    </b-checkbox>
                </div>
                <div class="col-12 col-sm-6 col-xl table--item-4">
                    <div class="block--item--title d-flex align-items-center item--text">
                        <div class="text--title">
                            {{item.title}}
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="block--item--title d-flex align-items-center item--text">
                        <span class="icon">
                            <i class="fas fa-user"></i>
                        </span>
                        <div class="text--title text-capitalize">
                            {{item.user.first_name + ' ' + item.user.last_name}}
                        </div>
                    </div>
                </div>
                <!-- <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="block--item--title d-flex align-items-center justify-content-center item--text">
                        <div class="text--title">
                            <b-tag type="is-success"  v-if="item.status === 1">Published</b-tag>
                            <b-tag type="is-danger"  v-else>Not Published</b-tag>
                        </div>
                    </div>
                </div> -->

                <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="item--text">
                        <span class="icon">
                            <i class="fas fa-clock"></i>
                        </span>
                        {{item.created}}
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-xl-1 table--item mw-10">
                    <div class="item--text text-center">
                        <div class="field" v-if="item.policies.indexOf('post.update') > -1">
                            <b-switch @input="changeStatus" v-model="postStatus" :true-value="1" :false-value="0">
                                {{$t('published')}}
                            </b-switch>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-12 col-xl item--text table--item">
                    <div class="all--item--action d-flex align-item-center">
                        <div class="all--item--action d-flex align-item-center">
                            <router-link :to="'/postForm/' + item.id" v-if="item.policies.indexOf('post.update') > -1" class="button--circle is-primary-light"><i class="fas fa-pen"></i></router-link>
                            <button class="button--circle is-danger-light" @click="deleteItem(item.id)" v-if="item.policies.indexOf('post.delete') > -1"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>

     // Repository Data
    import { RepositoryFactory } from '../../repositories/RepositoryFactory'
    const postsRepository = RepositoryFactory.get('posts')

    export default {
        props: ['item', 'itemsSelected'],
        data () {
            return {
                checkItemSelected: false,
                postStatus: this.item.status
            };
        },
        watch:{
            itemsSelected(){
                if(this.itemsSelected.length) {
                     this.itemsSelected.map(item => {
                        if(item == this.item.id) {
                            this.checkItemSelected = true
                        }
                    })
                } else {
                     this.checkItemSelected = false
                }

            }
        },
        methods: {
            deleteItem(id) {
                this.confirmCustomDelete(id)
            },
            updateCheckbox() {
                this.$emit('checkboxItem', {id: this.item.id, status: this.checkItemSelected})
            },
            async updatePost(id, data) {
                const post = await postsRepository.updatePost(id, data)
                this.aleartMessage(post.message)
            },
            async deletePost(id) {
                const post = await postsRepository.deletePost(id)
                this.aleartMessage(post.message)
                this.$emit('fetchAllItems')
            },
            aleartMessage(textMessage) {
                this.$snackbar.open({
                    message: textMessage,
                    type: 'is-success',
                    position: 'is-bottom-right',
                    actionText: 'OK',
                    queue: false,
                    duration: 3000,
                    indefinite: false,
                })
            },
            confirmCustomDelete(id) {
                this.$dialog.confirm({
                    title: this.$t('postsPage.messages.deletePost.title'),
                    message: this.$t('postsPage.messages.deletePost.message'),
                    confirmText: this.$t('postsPage.messages.deletePost.confirmText'),
                    cancelText: this.$t('postsPage.messages.deletePost.cancelText'),
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deletePost(id)
                })
            },
            // Change Status Post
            changeStatus() {
                this.updatePost(this.item.id, {status: this.postStatus})
            }
        }
    }
</script>
