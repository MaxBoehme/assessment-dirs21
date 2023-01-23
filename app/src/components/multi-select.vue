<script setup>
    import { ref, defineProps, defineEmits } from 'vue'
    import InputWrap from '@/components/input-wrap.vue'

    const props = defineProps(['options', 'title', 'values', 'idProperty', 'name', 'noTitle'])
    const emit = defineEmits(['onChange'])

    function onSelect(option) {
        const selectedOptionIndex = props.values.findIndex(item => item === option[props.idProperty])
        if (selectedOptionIndex > -1) {
            const newValues = props.values.filter(item => item !== option[props.idProperty])
            emit('onChange', newValues)
        }
        else {
            const newValues = props.values.concat([option[props.idProperty]])
            emit('onChange', newValues)
        }
    }
</script>

<template>
    <div class="multi-select">
        <div v-if="!props.noTitle"
            class="title"
        >
            {{ props.title }}
        </div>
        <div class="select-box">
            <InputWrap
                v-for="option in options"
                class="select-option"
                :title="option.text"
                :type="'checkbox'"
                :value="props.values && props.values.includes(option[props.idProperty])"
                :name="option.text"
                @on-change="() => onSelect(option)"
                :noTitle="true"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .select-box {
        display: flex;

        .select-option {
            width: auto;
            margin-right: var(--margin-m);
        }
    }
</style>
