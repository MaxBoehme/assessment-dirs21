<script setup>
    import { defineProps, defineEmits } from 'vue'

    const props = defineProps(['title', 'options', 'idProperty', 'value', 'noTitle'])
    const emit = defineEmits(['onSelect'])

    function onSelect(event) {
        emit('onSelect', props.options.find(item => {
            return item.text === event?.target?.value
        }))
    }

    function isSelectedOption(option) {
        return option[props.idProperty] === props.value
    }
</script>

<template>
    <div class="dropdown-wrap">
        <div v-if="!props.noTitle"
            class="title"
        >
            {{ props.title }}
        </div>
        <div class="dropdown-box">
            <select @change="onSelect">
                <option
                    value=""
                    :selected="props.value === null"
                    disabled
                    hidden
                >
                    Choose here
                </option>
                <option v-for="option in props.options"
                    :key="option.text"
                    :value="option.text"
                    :selected="isSelectedOption(option)"
                >
                    {{ option.text }}
                </option>
            </select>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .dropdown-wrap {
        width: 100%;
        
        .dropdown-box {
            width: 100%;
            
            select {
                width: 100%;
            }
        }
    }
</style>
