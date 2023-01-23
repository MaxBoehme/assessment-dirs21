<script setup>
    import { ref, onMounted } from 'vue'
    import { useDishesStore } from '@/stores/dishes.store'
    import CenterBox from '@/components/center-box.vue'
    import DishForm from '@/modules/menu-manager/dish-form.vue'
    import StandardButton from '@/components/standard-button.vue'
    import DishesTable from '@/modules/menu-manager/dishes-table.vue'
    import UnfoldBlock from '@/components/unfold-block.vue'

    const dishesStore = useDishesStore()

    const isNewDishFormOpen = ref(false)
    const newDishUpdater = ref(false)

    onMounted(() => {
        dishesStore.loadDishes()
    })

    function openNewDishForm() {
        dishesStore.resetNewDish()
        isNewDishFormOpen.value = true
    }

    function onDiscardNewDish() {
        dishesStore.resetNewDish()
        isNewDishFormOpen.value = false
    }

    function onChangeNewDish() {
        newDishUpdater.value = !newDishUpdater.value
    }
</script>

<template>
    <div class="menu-manager">
        <CenterBox>
            <UnfoldBlock
                :isOpen="isNewDishFormOpen"
                :update="newDishUpdater"
            >
                <div class="block-headline">
                    new dish
                </div>
                <DishForm
                    class="dish-form"
                    :dishId="'newDish'"
                    @on-discard="onDiscardNewDish"
                    @on-change="onChangeNewDish"
                />
            </UnfoldBlock>
            <div class="actions-box">
                <div class="actions">
                    <StandardButton
                        class="new-dish-button"
                        v-if="!isNewDishFormOpen"
                        :text="'create new dish'"
                        @on-click="openNewDishForm"
                    />
                </div>
            </div>
            <DishesTable
                class="dishes-table"
            />
        </CenterBox>
    </div>
</template>

<style scoped lang="scss">
    .menu-manager {
        width: 100%;;
        height: 100%;;

        .dish-form,
        .dishes-table {
            width: var(--read-width-l)
        }

        .dish-form {
            margin-bottom: var(--margin-l);
        }

        .actions {
            width: var(--read-width-l);
            display: flex;
            justify-content: flex-end;
            margin-bottom: var(--margin-l);
        
            .new-dish-button {
                min-width: var(--action-button-m);
            }
        }
    }
</style>
