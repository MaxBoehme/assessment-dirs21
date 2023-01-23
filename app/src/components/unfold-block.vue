<script setup>
    import { ref, defineProps, watch, nextTick } from 'vue'

    const props = defineProps(['isOpen', 'openHeight', 'update'])

    const slotBoxRef = ref(null)
    const recentHeight = ref('0px')

    watch(() => props.isOpen, (newIsOpen) => {
        if (newIsOpen) {
            const fullHeight = slotBoxRef.value.offsetHeight + 'px'
            recentHeight.value = fullHeight
        }
        else {
            recentHeight.value = '0px'
        }
    })

    watch(() => props.update, async (newUpdate, oldUpdate) => {
        if (newUpdate !== oldUpdate) {
            await nextTick()
            let fullHeight = slotBoxRef.value.offsetHeight + 'px'
            recentHeight.value = fullHeight
        }
    })
</script>

<template>
    <div class="unfold-block"
        :class="{
            open: props.isOpen
        }"
        :style="{
            ['height']: recentHeight
        }"
    >
        <div ref="slotBoxRef"
        >
            <slot></slot>
        </div>
        <div
            class="hider"
        >
        </div>
    </div>
</template>

<style scoped lang="scss">
    .unfold-block {
        overflow: hidden;
        transition: height var(--transition-delay);
        .hider {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: var(--white);
            opacity: 1;
            transition: opacity var(--transition-delay);
            pointer-events: none;
        }

        &.open {
            .hider {
                opacity: 0;
            }
        }
    }
</style>
