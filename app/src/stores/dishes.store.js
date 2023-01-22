import { defineStore } from 'pinia'
import { fetchWrapper } from '@/helpers/fetch-wrapper.js'

export const useDishesStore = defineStore({
    id: 'dishes',
    state: () => ({
        dishes: []
    }),
    getters: {
	},
    actions: {
        async loadDishes() {
            try {
                const data = await fetchWrapper.get('dishes')
                this.dishes = data
            }
            catch(error) {
                console.log(error)
            }
        }
    }
})
