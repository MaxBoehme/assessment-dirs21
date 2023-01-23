<script setup>
</script>

<template>
    <div class="center-box"
    >
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
    .center-box {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: var(--padding-xl);
    }
</style>
