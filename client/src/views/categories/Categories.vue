<template>
    <div class="categories">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                             {{$t('categories')}}
                            <span class="badge--count" v-if="total">
                                ({{total}})
                            </span>
                        </h1>

                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />

                    </div>

                    <div class="page--title--action ml-auto" v-if="isInUserPermissions('category.create')">
                        <router-link :to="{ path: '/categoryForm', query: { parentId: this.$route.params.id}}"
                            class="button is-primary">{{$t('categoriesPage.addNewCategory')}}</router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="wrap--content">
            <div class="card-filter--herader">
                <filter-items @selectAllItems="selectAllItems" @featchByFilter="featchByFilter"
                    :allItemChecked="allItemChecked" />
            </div>
            <template v-if="dataLoading">
                <loading-data></loading-data>
            </template>
            <template v-else>
                <list @fetchAllItems="fetchAllItems" :allItemsSelected="allItemsSelected"
                    @checkButtonSelectAll="checkButtonSelectAll" :data="categories" v-if="categories.length" />
                <template v-else>
                    <no-data :text="$t('categoriesPage.messages.noData')"/>
                </template>
            </template>
            <template v-if="categories.length">
                <div class="pagination--custom--number">
                    <b-pagination :total="total" :current.sync="page" :order="order" :rounded="true" :per-page="limit">
                    </b-pagination>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import List from '../../components/categories/list'
    import FilterItems from '../../components/categories/Filter'

    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const categoriesRepository = RepositoryFactory.get('categories')

    export default {
        name: 'categories',
        data() {
            return {
                categories: [],
                total: null,
                allItemsSelected: false,
                allItemChecked: 0,
                page: 1,
                limit: 10,
                order: 'is-centered',
                dataLoading: true,
                breadcrumb: [{
                    link: '',
                    label: this.$t("categoriesPage.breadcrumb[0]")
                }]
            };
        },
        components: {
            List,
            FilterItems,
        },
        created() {
            this.fetchAllItems()
        },
        watch: {
            page() {
                this.fetchAllItems()
            },
            '$route'(to, from) {
                this.fetchAllItems()
            }
        },
        methods: {
            selectAllItems(checkButton) {
                if (checkButton) {
                    this.allItemsSelected = true
                } else {
                    this.allItemsSelected = false
                }
                // this.allItemsSelected =! this.allItemsSelected
            },
            // Check Button Select All Active Or Not
            checkButtonSelectAll(data) {
                this.allItemChecked = data
            },

            // Fetch All Items
            async fetchAllItems(filters) {
                this.dataLoading = true
                const categories = await categoriesRepository.getAllCategories(this.page, this.limit, filters, this
                    .$route.params.id)
                this.total = categories.data.total;
                this.categories = categories.data.docs;
                this.dataLoading = false;
            },
            // Filters
            featchByFilter(filters) {
                this.fetchAllItems(filters)
            }

        }
    }
</script>
