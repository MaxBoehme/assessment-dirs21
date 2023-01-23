<script setup>
    import { ref, defineProps } from 'vue'
    import { useDishesStore } from '@/stores/dishes.store'
    import DishForm from '@/modules/menu-manager/dish-form.vue'

    const props = defineProps(['tableConfig', 'row'])

    const dishesStore = useDishesStore()
    const isInEditMode = ref(false)

    function onClick() {
        isInEditMode.value = true
    }

    function onSavedDish() {
        isInEditMode.value = false
    }

    function onRevertChanges() {
        dishesStore.resetDishEdit({ dishId: props.row.dishId })
        isInEditMode.value = false
    }

    function onDeleted() {
        isInEditMode.value = false
    }
</script>

<template>
    <div class="dishes-table-item"
    >
        <div v-if="!isInEditMode" 
            class="value-box"
            :class="{
                highlight: props.tableConfig.highlightHovered,
                clickable: props.tableConfig.clickable
            }"
            @click="onClick"
        >
            <div v-for="itemRow in props.tableConfig.itemRows"
                class="item-row"
            >
                <div v-for="column in itemRow.columns"
                    class="column"
                    :style="column.style"
                >
                    {{ column.format ? column.format(props.row[column.field]) : props.row[column.field] }}
                </div>
            </div>
        </div>
        <div v-else>
            <DishForm
                class="dish-form"
                :dishId="props.row.dishId"
                :hideLabels="true"
                :showDeleteOption="true"
                :buttonSize="'s'"
                @on-discard="onRevertChanges"
                @on-saved="onSavedDish"
                @on-deleted="onDeleted"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .dishes-table-item {
        display: flex;
        flex-direction: column;

        &:not(:last-child) {
            border-bottom: var(--border-width-s) solid var(--primary);
        }
        .value-box {
            display: flex;
            flex-direction: column;

            &.highlight:hover {
                background-color: var(--secondary);
            }
    
            .item-row {
                width: 100%;
                display: flex;
    
                .column {
                    flex-grow: 1;
                }
            }
        }

        .dish-form {
            padding-top: var(--padding-s);
            padding-bottom: var(--padding-s);
            background-color: var(--light-grey);
        }
    }
</style>
