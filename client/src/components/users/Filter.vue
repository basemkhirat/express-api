<template>
    <div class="filter--items">
        <div class="row">
            <div class="col-12 col-lg-6">
                <div class="filter--items--left">
                    <div class="input--fuild">
                        <button class="button w-100" :class="{'is-primary' : checkItem && allItemChecked.length}"
                            @click="selectAllItems">
                            {{$t('selectAll')}}
                        </button>
                    </div>
                    <div class="input--fuild">
                        <v-select :options="groups" v-model="group" label="name" :placeholder="$t('sorByGroup')"
                            class="select--with--icon w-100 v--select--scroll">
                            <template slot="option" slot-scope="option">
                                {{ option.name }}
                            </template>
                        </v-select>
                    </div>
                    <div class="input--fuild">
                        <v-select :options="allStatus" v-model="status" label="name"
                        :placeholder="$t('sortByStatus')"
                            class="select--with--icon w-100 v--select--scroll w-fuild-md">
                            <template slot="option" slot-scope="option">
                                {{ option.name }}
                            </template>
                        </v-select>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6">
                <div class="filter--items--right">
                    <div class="input--fuild">
                        <div class="search icon--right">
                            <b-input :placeholder="$t('search') + '...'" type="search" icon-pack="fa" icon="search"
                                v-model="searchQuery">
                            </b-input>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const groupsRepository = RepositoryFactory.get('groups')
    export default {
        props:['allItemChecked'],
        data() {
            return {
                group: '',
                groups: [],
                checkItem: false,
                page: 1,
                limit: 50,
                filters: {},
                searchQuery: '',
                status: '',
                allStatus: [{
                    id: '1',
                    name: this.$t('active')
                }, {
                    id: '0',
                    name: this.$t('notActive')
                }],
            }
        },
        created() {
            this.fetchAllItems()
        },
        watch: {
            allItemChecked(){
                if(this.allItemChecked == 0){
                    this.checkItem= false
                }
            },
            group() {
                if (this.group) {
                    this.filters.group = this.group.id
                    this.$emit('featchByFilter', this.filters)
                } else {
                    this.filters.group = ''
                    this.$emit('featchByFilter', this.filters)
                }
            },

            // Status
            status() {
                if (this.status) {
                    this.filters.status = this.status.id
                    this.$emit('featchByFilter', this.filters)
                } else {
                    this.filters.status = ''
                    this.$emit('featchByFilter', this.filters)
                }
            },
            searchQuery() {
                this.filters.searchQuery = this.searchQuery
                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    this.$emit('featchByFilter', this.filters)
                }, 500);
            }
        },
        methods: {
            selectAllItems() {
                this.checkItem = !this.checkItem
                this.$emit('selectAllItems')
            },
            async fetchAllItems() {
                const groups = await groupsRepository.getAllGroups(this.page, this.limit)
                this.groups = groups.data.docs;
            },
        }
    }
</script>
