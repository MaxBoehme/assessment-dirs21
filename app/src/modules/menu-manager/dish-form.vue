<script setup>
    import { reactive } from 'vue'
    import { storeToRefs } from 'pinia'
    import { useDishesStore } from '@/stores/dishes.store'
    import InputWrap from '@/components/input-wrap.vue'
    import DropdownWrap from '@/components/dropdown-wrap.vue'
    import MultiSelect from '@/components/multi-select.vue'
    import StandardButton from '@/components/standard-button.vue'
    import { dishItemConfig } from '@/modules/menu-manager/dish-item-config.js'

    const dishesStore = useDishesStore()

    const props = defineProps(['dishId', 'hideLabels', 'showDeleteOption', 'buttonSize'])
    const emit = defineEmits(['onChange', 'onDiscard', 'onSubmit', 'onSaved', 'onDeleted'])

    const { dishesCategories, availabilityOptions, waitingTimeOptions } = storeToRefs(dishesStore)
    const errors = reactive({})

    const validation = {
        name(value) {
            if (!value || !value.length) {
                errors.name = {
                    message: 'Please enter a name'
                }
            }
            else {
                delete errors.name
                return true
            }
        },
        description(value) {
            if (!value || !value.length) {
                errors.description = {
                    message: 'Please enter a description'
                }
            }
            else {
                delete errors.description
                return true
            }
        },
        price(value) {
            if (!value) {
                errors.price = {
                    message: 'Please enter a price'
                }
            }
            else if (parseFloat(value) < 0) {
                errors.price = {
                    message: 'The price must be positive'
                }
            }
            else {
                delete errors.price
                return true
            }
        },
        category(categoryId) {
            if (!categoryId) {
                errors.category = {
                    message: 'Please select a category'
                }
            }
            else {
                delete errors.category
                return true
            }
        },
        waitingTime(waitingTimeyId) {
            if (!waitingTimeyId) {
                errors.waitingTime = {
                    message: 'Please select a waitingTime'
                }
            }
            else {
                delete errors.waitingTime
                return true
            }
        },
        availability(selectedOptions) {
            if (!selectedOptions || !selectedOptions.length) {
                errors.availability = {
                    message: 'Please select at least one availability'
                }
            }
            else {
                delete errors.availability
                return true
            }
        }
    }

    function onNameChange(name) {
        if (validation.name(name)) {
            dishesStore.setDishProperty({
                dishId: props.dishId,
                propertyName: 'name',
                value: name
            })
        }
        emit('onChange')
    }

    function onDescriptionChange(description) {
        if (validation.description(description)) {
            dishesStore.setDishProperty({
                dishId: props.dishId,
                propertyName: 'description',
                value: description
            })
        }
        emit('onChange')
    }

    function onPriceChange(price) {
        if (validation.price(price)) {
            dishesStore.setDishProperty({
                dishId: props.dishId,
                propertyName: 'price',
                value: price
            })
        }
        emit('onChange')
    }

    function onCategorySelect(option) {
        if (validation.category(option.categoryId)) {
            dishesStore.setDishProperty({
                dishId: props.dishId,
                propertyName: 'category',
                value: option.categoryId
            })
        }
        emit('onChange')
    }

    function onAvailabilityChange(selectedValues) {
        if (validation.availability(selectedValues)) {
            dishesStore.setDishProperty({
                dishId: props.dishId,
                propertyName: 'availability',
                value: selectedValues
            })
        }
        emit('onChange')
    }

    function onActivitySelection(isActive) {
        dishesStore.setDishProperty({
            dishId: props.dishId,
            propertyName: 'isActive',
            value: isActive
        })
        emit('onChange')
    }

    function onWaitingTimeSelect(option) {
        if (validation.waitingTime(option.waitingTimeId)) {
            dishesStore.setDishProperty({
                dishId: props.dishId,
                propertyName: 'waitingTime',
                value: option.waitingTimeId
            })
        }
        emit('onChange')
    }

    function validateAll() {
        Object.keys(validation).forEach(field => {
            validation[field](dishesStore.getDishEditValue(props.dishId, field))
        })
    }

    function onSubmit() {
        validateAll()
        emit('onChange')
        if (Object.keys(errors).length === 0) {
            emit('onSubmit')
            dishesStore.saveDish({ dishId: props.dishId })
                .then(() => {
                    emit('onSaved')
                })
        }
    }

    function discardChanges() {
        emit('onDiscard')
        Object.keys(errors).forEach(errorKey => {
            delete errors[errorKey]
        })
    }

    function onDelete() {
        dishesStore.deleteDish({ dishId: props.dishId })
            .then(() => {
                emit('onDeleted')
            })
    }

    function getDishesTableConfigColumn(name) {
        let allColumns = []
        dishItemConfig.itemRows.forEach(itemRow => {
            allColumns = allColumns.concat(itemRow.columns)
        })
        return allColumns.find(item => item.name === name)
    }
</script>

<template>
    <form class="dish-form">
        <div class="input-box">
            <InputWrap
                class="form-element"
                :style="getDishesTableConfigColumn('name').style"
                :title="'name'"
                :type="'text'"
                :value="dishesStore.getDishEditValue(props.dishId, 'name')"
                @on-change="onNameChange"
                :noTitle="props.hideLabels"
            />
            <InputWrap
                class="form-element"
                :style="getDishesTableConfigColumn('price').style"
                :title="'price'"
                :type="'number'"
                :value="dishesStore.getDishEditValue(props.dishId, 'price')"
                @on-change="onPriceChange"
                :noTitle="props.hideLabels"
            />
            <DropdownWrap
                class="form-element"
                :style="getDishesTableConfigColumn('category').style"
                :title="'category'"
                :options="dishesCategories"
                :idProperty="'categoryId'"
                :value="dishesStore.getDishEditValue(props.dishId, 'category')"
                @on-select="onCategorySelect"
                :noTitle="props.hideLabels"
            />
            <InputWrap
                class="form-element"
                :style="getDishesTableConfigColumn('isActive').style"
                :title="'isActive'"
                :type="'checkbox'"
                :value="dishesStore.getDishEditValue(props.dishId, 'isActive')"
                :name="'is active'"
                @on-change="onActivitySelection"
                :noTitle="props.hideLabels"
            />
            <DropdownWrap
                class="form-element"
                :style="getDishesTableConfigColumn('waitingTime').style"
                :title="'waitingTime'"
                :options="waitingTimeOptions"
                :idProperty="'waitingTimeId'"
                :value="dishesStore.getDishEditValue(props.dishId, 'waitingTime')"
                @on-select="onWaitingTimeSelect"
                :noTitle="props.hideLabels"
            />
        </div>
        <div class="input-box">
            <InputWrap
                class="form-element"
                :style="getDishesTableConfigColumn('description').style"
                :title="'description'"
                :type="'text'"
                :value="dishesStore.getDishEditValue(props.dishId, 'description')"
                @on-change="onDescriptionChange"
                :noTitle="props.hideLabels"
            />
        </div>
        <div class="input-box">
            <MultiSelect
                class="form-element"
                :style="getDishesTableConfigColumn('availability').style"
                :title="'availability'"
                :options="availabilityOptions"
                :idProperty="'availabilityId'"
                :values="dishesStore.getDishEditValue(props.dishId, 'availability')"
                @on-change="onAvailabilityChange"
                :noTitle="props.hideLabels"
            />
        </div>
        <div class="errors form-element">
            <div v-for="error in errors"
                :key="error.message"
                class="error"
            >
                {{ error.message }}
            </div>
        </div>
        <div class="actions"
            :class="{
                ['s-size']: props.buttonSize === 's'
            }"
        >
            <StandardButton
                class="action"
                :text="'save'"
                :size="props.buttonSize"
                @on-click="onSubmit"
            />
            <StandardButton
                class="action"
                :text="'cancel'"
                :size="props.buttonSize"
                @on-click="discardChanges"
            />
            <StandardButton
                v-if="props.showDeleteOption"
                class="action"
                :text="'delete'"
                :size="props.buttonSize"
                @on-click="onDelete"
            />
        </div>
        <div v-if="dishesStore.getDishIsServerActive(props.dishId) || dishesStore.getDishIsServerError(props.dishId)"
            class="server-action-hint"
        >
            <div class="background">
            </div>
            <div class="message">
                {{ dishesStore.getDishServerMessage(props.dishId) }}
            </div>
            <div v-if="dishesStore.getDishIsServerError(props.dishId)"
                class="server-error-reset bordered clickable"
                @click="dishesStore.resetDishServerError({ dishId: props.dishId })"
            >
                reset error
            </div>
        </div>
    </form>
</template>

<style scoped lang="scss">
    .dish-form {
        .input-box {
            display: flex;

            .form-element {
                flex-grow: 1;
            }
        }
        .form-element {
            margin-bottom: var(--margin-xs);
        }

        .errors {
            color: var(--warn);
        }

        .actions {
            width: 100%;
            display: flex;
            justify-content: flex-end;

            .action {
                width: var(--action-button-m);
                margin-left: var(--margin-m);

                &:last-child {
                    margin-right: 6px;
                }
            }

            &.s-size {
                .action {
                    margin-left: var(--margin-s);
                }
            }
        }

        .server-action-hint {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .background {
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: var(--white);
                opacity: var(--opacity-hidden);
            }

            .message {
                z-index: var(--z-index-hint);
            }
        }
    }
</style>
