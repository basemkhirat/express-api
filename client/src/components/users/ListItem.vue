<template>
    <div class="block--item" v-if="user.policies.indexOf('user.view') > -1">
        <div class="row align-items-center">
            <div class="item--checkbox" v-if="isInUserPermissions('user.delete')">
                <b-checkbox v-model="userSelected" @input="updateCheckbox(user.id)" :native-value="user.id">
                </b-checkbox>
            </div>
            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="block--item--title d-flex align-items-center item--text">
                    <div class="item--avatar--img">
                        <template v-if="user.photo">
                            <img :src="user.photo.thumbnails.small" :alt="user.photo.title">
                        </template>
                        <img src="./../../assets/images/user/64.png">
                    </div>
                    <div class="text--title text-capitalize">
                        {{user.first_name}}
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="item--text">
                    <b-tooltip :label="user.email"
                    type="is-dark"
                    position="is-top">
                        <span class="icon">
                            <i class="fas fa-envelope"></i>
                        </span>
                        {{ user.email | textLimit(16) }}
                    </b-tooltip>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="item--text">
                    <span class="icon">
                        <i class="fas fa-clock"></i>
                    </span>
                    {{user.created}}
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="item--text text-center">
                    <template v-if="user.role">
                        <span class="icon">
                            <i class="fas fa-award"></i>
                        </span>
                        {{user.role.name}}
                    </template>
                    <template v-else>
                        <span class="icon">
                            <i class="fas fa-award"></i>
                        </span>
                        {{$t('noRole')}}
                    </template>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl -1 table--item">
                <div class="item--text text-md-center">
                    <div class="field" v-if="user.policies.indexOf('user.status') > -1">
                        <b-switch v-model="userStatus" true-value="Active" false-value="Not Active">
                            {{$t('active')}}
                        </b-switch>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-xl item--text table--item">
                <div class="all--item--action d-flex align-item-center">
                    <router-link :to="'/userForm/' + user.id" v-if="user.policies.indexOf('user.update') > -1 && isInUserPermissions('user.update')" class="button--circle is-primary-light"><i class="fas fa-pen"></i></router-link>
                    <button v-if="isInUserPermissions('user.delete') && user.policies.indexOf('user.delete') > -1" class="button--circle is-danger-light" @click="deleteItem(user.id)"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

     // Repository Data
     import { RepositoryFactory } from '../../repositories/RepositoryFactory'
     const usersRepository = RepositoryFactory.get('users')
    export default {
        props: ['user', 'usersSelected'],
        data () {
            return {
                userSelected: false,
                userStatus: this.user.status == 1? 'Active' : 'Not Active'
            };
        },
        watch:{
            userStatus(){
                let data = {}
                if(this.userStatus == 'Active'){
                    data.status = 1
                } else {
                    data.status = 0
                }
                this.updateUser(this.user.id, data)
            },
            usersSelected(){
                if(this.usersSelected.length){
                     this.usersSelected.map(item => {
                        if(item == this.user.id){
                            this.userSelected = true
                        }
                    })
                } else {
                     this.userSelected = false
                }

            }
        },
        methods: {
            updateCheckbox(){
                this.$emit('checkboxUser', {id: this.user.id, status: this.userSelected})
            },
            deleteItem(id){
                this.confirmCustomDelete(id)
            },
            async updateUser(id, data) {
                const user = await usersRepository.updateUser(id, data)
                this.isLoading = false
                if (user.success) {
                    this.successMessage(user.message)
                } else {
                    this.errorMessage(user[0])
                }
            },
            async deleteUser(id) {
                const user = await usersRepository.deleteUser(id)

                if (user.success) {
                    this.successMessage(user.message)
                    this.$emit('fetchAllItems')
                } else {
                    this.errorMessage(user[0])
                }

            },

            errorMessage(textMessage) {
                this.$snackbar.open({
                    message: textMessage,
                    type: 'is-danger',
                    position: 'is-bottom-right',
                    actionText: 'OK',
                    queue: false,
                    duration: 10000,
                    indefinite: false,
                })
            },
            successMessage(textMessage) {
                this.$snackbar.open({
                    message: textMessage,
                    type: 'is-success',
                    position: 'is-bottom-right',
                    actionText: 'OK',
                    queue: false,
                    duration: 10000,
                    indefinite: false,
                })
            },

            aleartMessage(textMessage){
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
                    title: this.$t('usersPage.messages.deleteUser.title'),
                    message: this.$t('usersPage.messages.deleteUser.message'),
                    confirmText: this.$t('usersPage.messages.deleteUser.confirmText'),
                    cancelText: this.$t('usersPage.messages.deleteUser.cancelText'),
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deleteUser(id)
                })
            }
        }
    }
</script>
