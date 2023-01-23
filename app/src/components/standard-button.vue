<script setup>
    import { defineProps, defineEmits } from 'vue'

    const props = defineProps(['text', 'size'])
    const emit = defineEmits(['onClick'])
 
    function onClick() {
        emit('onClick')
    }
</script>

<template>
    <div class="standard-button bordered clickable"
        :class="{
            ['s-size']: props.size === 's'
        }"
        @click="onClick"
    >
        {{ props.text }}
    </div>
</template>

<style scoped lang="scss">
    .standard-button {
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        padding-left: var(--padding-m);
        padding-right: var(--padding-m);
        background-color: var(--white);

        &.s-size {
            padding-left: var(--padding-s);
            padding-right: var(--padding-s);
            font-size: var(--font-size-s);
        }

        &:hover {
            background-color: var(--secondary);
        }
    }
</style>
