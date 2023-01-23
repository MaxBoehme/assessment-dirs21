import { defineStore } from 'pinia'
import { fetchWrapper } from '@/helpers/fetch-wrapper.js'

const dishDefaultModel = {
    _id: null,
    name: '',
    description: '',
    price: '',
    category: null,
    availability: [],
    isActive: false,
    waitingTime: null
}

const SERVER_MESSAGES = {
    IS_SAVING: 'is saving ...',
    IS_DELETING: 'is deleting'
}

export const useDishesStore = defineStore({
    id: 'dishes',
    state: () => ({
        isLoadingDishes: false,
        isDishesLoaded: false,
        dishesLoadError: null,
        dishesIdList: [],
        dishes: {
            newDish: {
                edit: dishDefaultModel
            }
        },
        dishesCategories: [
            {
                text: 'starter',
                categoryId: 1
            },
            {
                text: 'main course',
                categoryId: 2
            },
            {
                text: 'dessert',
                categoryId: 3
            },
            {
                text: 'beverage',
                categoryId: 4
            }
        ],
        availabilityOptions: [
            {
                text: 'breakfast',
                availabilityId: 1
            },
            {
                text: 'lunch',
                availabilityId: 2
            },
            {
                text: 'dinner',
                availabilityId: 3
            },
            {
                text: 'weekdays',
                availabilityId: 4
            },
            {
                text: 'weekends',
                availabilityId: 5
            }
        ],
        waitingTimeOptions: [
            {
                text: '< 15min',
                waitingTimeId: 1
            },
            {
                text: '15-30min',
                waitingTimeId: 2
            },
            {
                text: '30-60min',
                waitingTimeId: 3
            },
            {
                text: '> 60min',
                waitingTimeId: 4
            }
        ]
    }),
    getters: {
        getDishEditValue: state => (dishId, property) => {
            return state.dishes[dishId].edit[property]
        },
        getDishIsServerActive: state => dishId => {
            return state.dishes[dishId].isServerActive
        },
        getDishServerMessage: state => dishId => {
            return state.dishes[dishId].serverMessage
        },
        getDishIsServerError: state => dishId => {
            return state.dishes[dishId].isServerError
        },
        getDishesRows: state => {
            return state.dishesIdList.map(dishId => {
                if (state.dishes[dishId]) {
                    return {
                        ...state.dishes[dishId].edit,
                        dishId
                    }
                }
            })
        }
	},
    actions: {
        async loadDishes() {
            try {
                this.dishesLoadError = null
                this.isLoadingDishes = true
                const data = await fetchWrapper.get('dishes')
                this.dishesIdList = data.data.map(dish => dish._id)
                data.data.forEach(dish => {
                    this.dishes[dish._id] = {
                        dishId: dish._id,
                        edit: { ...dish },
                        original: dish
                    }
                })
                this.isLoadingDishes = false
                this.isDishesLoaded = true
            }
            catch(error) {
                this.isLoadingDishes = false
                this.dishesLoadError = error
                throw error
            }
        },
        resetNewDish() {
            this.dishes.newDish = {
                edit: {
                    ...dishDefaultModel
                }
            }
        },
        resetDishEdit({ dishId }) {
            delete this.dishes[dishId].edit
            this.dishes[dishId].edit = {
                ...this.dishes[dishId].original
            }
        },
        setDishProperty({ dishId, propertyName, value }) {
            this.dishes[dishId].edit[propertyName] = value
        },
        async saveDish({ dishId }) {
            try {
                const isNewDish = dishId === 'newDish'
                const dish = {
                    ...this.dishes[dishId].edit,
                    _id: isNewDish ? null : dishId,
                }
                this.dishes[dishId].isServerActive = true
                this.dishes[dishId].serverMessage = SERVER_MESSAGES.IS_SAVING
                const data = await fetchWrapper.put('dishes', dish)
                const savedDish = data.data
                if (isNewDish) {
                    this.dishesIdList.push(savedDish._id)
                    this.resetNewDish()
                }
                this.dishes[savedDish._id] = {
                    dishId: savedDish._id,
                    edit: savedDish,
                    original: savedDish
                }
                this.dishes[dishId].isServerActive = false
                this.dishes[dishId].serverMessage = null
            }
            catch(error) {
                this.dishes[dishId].isServerActive = false
                this.dishes[dishId].isServerError = true
                this.dishes[dishId].serverMessage = error
                throw error
            }
        },
        resetDishServerError({ dishId }) {
            this.dishes[dishId].isServerError = false
            this.dishes[dishId].serverMessage = null
        },
        async deleteDish({ dishId }) {
            try {
                this.dishes[dishId].isServerActive = true
                this.dishes[dishId].serverMessage = SERVER_MESSAGES.IS_DELETING
                const data = await fetchWrapper.delete('dishes/' + dishId)
                this.dishes[dishId].isServerActive = false
                this.dishes[dishId].serverMessage = null

                if (this.dishes[dishId]) {
                    delete this.dishes[dishId]
                    const dishIdIndex = this.dishesIdList.findIndex(item => item === dishId)
                    this.dishesIdList.splice(dishIdIndex, 1);
                }
            }
            catch(error) {
                this.dishes[dishId].isServerActive = false
                this.dishes[dishId].isServerError = true
                this.dishes[dishId].serverMessage = error
                throw error
            }
        },
        sortDishes({ column }) {
            this.dishesIdList.sort((idA, idB) => {
                if (this.dishes[idA].original[column.field] < this.dishes[idB].original[column.field]) {
                    return -1
                }
                if (this.dishes[idA].original[column.field] > this.dishes[idB].original[column.field]) {
                    return 1
                }
                return 0
            })
        }
    }
})
