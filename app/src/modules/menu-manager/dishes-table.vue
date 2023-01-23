<script setup>
    import { storeToRefs } from 'pinia'
    import { useDishesStore } from '@/stores/dishes.store'
    import TableWrap from '@/components/table-wrap.vue'
    import { dishItemConfig } from '@/modules/menu-manager/dish-item-config.js'
    import DishesTableItem from '@/modules/menu-manager/dishes-table-item.vue'
    import { enrichItemConfig } from '@/helpers/item-config.js'

    const dishesStore = useDishesStore()

    const { dishesCategories, availabilityOptions, waitingTimeOptions } = storeToRefs(dishesStore)

    const formatters = [
        {
            field: 'price',
            format(value) {
                return parseFloat(value).toFixed(2) + '€'
            }
        },
        {
            field: 'category',
            format(value) {
                const category = dishesCategories.value.find(category => category.categoryId === value)
                return category?.text
            }
        },
        {
            field: 'isActive',
            format(value) {
                return value ? 'active' : 'hidden'
            }
        },
        {
            field: 'waitingTime',
            format(value) {
                const waitingTime = waitingTimeOptions.value.find(waitingTime => waitingTime.waitingTimeId === value)
                return waitingTime?.text
            }
        },
        {
            field: 'description',
            format(value) {
                return `"${value}"`
            }
        },
        {
            field: 'availability',
            format(values) {
                return values.sort().map(value => availabilityOptions.value.find(availability => availability.availabilityId === value)?.text).join(', ')
            }
        }
    ]

    let tableConfig = {
        ...dishItemConfig,
        idProperty: 'dishId',
        highlightHovered: true,
        clickable: true,
        sortable: true,
        sortFunction(column) {
            dishesStore.sortDishes({ column })
        }
    }
    formatters.forEach(formatter => {
        tableConfig = enrichItemConfig(tableConfig, formatter.field, formatter)
    })
</script>

<template>
    <div class="dishes-table"
    >
        <div class="block-headline">
            dishes
        </div>
        <TableWrap
            :tableConfig="tableConfig"
        >
            <DishesTableItem v-for="row in dishesStore.getDishesRows"
                :tableConfig="tableConfig"    
                :row="row"
            />
        </TableWrap>
    </div>
</template>

<style scoped lang="scss">
</style>
