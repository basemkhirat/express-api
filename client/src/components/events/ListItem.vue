<template>
    <div class="block--item">
        <div class="row align-items-center">
            <div class="item--checkbox">
                <b-checkbox v-model="checkItemSelected" @input="updateCheckbox(item.id)" :native-value="item.id">
                </b-checkbox>
            </div>
            <div class="col-12 col-sm-6 col-xl-3 table--item-4">
                <div class="block--item--title d-flex align-items-center item--text">
                    <div class="text--title">
                        {{item.title}}
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="item--text" v-if="item.place">
                    <span class="icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </span>
                    {{item.place | address}}
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="item--text">
                    <span class="icon">
                        <i class="fas fa-clock"></i>
                    </span>
                    {{item.created}}
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="item--text">
                    <span class="icon">
                        <i class="far fa-calendar-alt"></i>
                    </span>
                    {{item.scheduled}}
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="block--item--title d-flex align-items-center justify-content-center item--text">
                    <div class="text--title">
                        <b-tag type="is-warning"  v-if="item.type === 'free'">{{$t('free')}}</b-tag>
                        <b-tag type="is-info" v-else>{{$t('paid')}}</b-tag>
                    </div>
                </div>
            </div>

            <!-- <div class="col-12 col-sm-6 col-xl table--item">
                <div class="block--item--title d-flex align-items-center justify-content-center item--text">
                    <div class="text--title">
                        <b-tag type="is-success" v-if="item.status === 1">Published</b-tag>
                        <b-tag type="is-danger" v-else>Not Published</b-tag>
                    </div>
                </div>
            </div> -->

            <div class="col-12 col-sm-6 col-xl-1 table--item">
                <div class="item--text text-md-center">
                    <div class="field" v-if="item.policies.indexOf('event.manage') > -1">
                        <b-switch @input="changeStatus" v-model="eventStatus" :true-value="1" :false-value="0">
                        </b-switch>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-12 col-xl item--text table--item">
                <div class="all--item--action d-flex align-item-center">
                    <div class="all--item--action d-flex align-item-center">
                        <router-link :to="'/eventForm/' + item.id" v-if="item.policies.indexOf('event.manage') > -1"
                            class="button--circle is-primary-light"><i class="fas fa-pen"></i></router-link>
                        <button class="button--circle is-danger-light" @click="deleteItem(item.id)"
                            v-if="item.policies.indexOf('event.manage') > -1"><i class="fas fa-trash"></i></button>
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
    const eventsRepository = RepositoryFactory.get('events')

    export default {
        props: ['item', 'itemsSelected'],
        data() {
            return {
                checkItemSelected: false,
                eventStatus: this.item.status
            };
        },
        watch: {
            itemsSelected() {
                if (this.itemsSelected.length) {
                    this.itemsSelected.map(item => {
                        if (item == this.item.id) {
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
                this.$emit('checkboxItem', {
                    id: this.item.id,
                    status: this.checkItemSelected
                })
            },
            async updateEvent(id, data) {
                const event = await eventsRepository.updateEvent(id, data)
                this.aleartMessage(event.message)
            },
            async deleteEvent(id) {
                const event = await eventsRepository.deleteEvent(id)
                this.aleartMessage(event.message)
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
                    title: this.$t('eventsPage.messages.deleteEvent.title'),
                    message: this.$t('eventsPage.messages.deleteEvent.message'),
                    confirmText: this.$t('eventsPage.messages.deleteEvent.confirmText'),
                    cancelText: this.$t('eventsPage.messages.deleteEvent.cancelText'),
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deleteEvent(id)
                })
            },
            changeStatus() {
                this.updateEvent(this.item.id, {status: this.eventStatus})
            }
        }
    }
</script>
