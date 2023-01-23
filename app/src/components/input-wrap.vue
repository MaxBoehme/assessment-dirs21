<script setup>
    import { ref, defineProps, defineEmits } from 'vue'

    const props = defineProps(['title', 'type', 'value', 'name', 'noTitle'])
    const emit = defineEmits(['onChange'])
    const inputRef= ref(null)

    function onChange() {
        const inputElement = inputRef.value || { value: '', checked: false }
        if (props.type === 'checkbox') {
            emit('onChange', inputElement.checked)
        }
        else {
            emit('onChange', inputElement.value)
        }
    }
</script>

<template>
    <div class="input-wrap">
        <div v-if="!props.noTitle"
            class="title"
        >
            {{ props.title }}
        </div>
        <div class="input-box">
            <input
                :type="props.type"
                :value="props.value"
                :name="props.name"
                :checked="props.value === true"
                ref="inputRef"
                @keyup="onChange"
                @change="onChange"
                :class="{
                    fill: ['text', 'number'].includes(props.type),
                    checkbox: props.type === 'checkbox'
                }"
            />
            <div v-if="['checkbox'].includes(props.type)"
                class="input-name"
            >
                {{ props.name }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .input-wrap {
        width: 100%;
        .input-box {
            width: 100%;
            display: flex;

            input {
                &:not(.checkbox) {
                    width: 100%;
                }
                &.fill {
                    flex-grow: 1;
                }
            }

            .input-name {
                white-space: nowrap;
            }
        }
    }
</style>
