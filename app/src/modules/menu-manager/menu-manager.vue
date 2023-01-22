<script setup>
    import { onMounted } from 'vue'
    import { storeToRefs } from 'pinia'
    import { useDishesStore } from '@/stores/dishes.store'

    const dishesStore = useDishesStore()

    const { dishes } = storeToRefs(dishesStore)

    onMounted(() => {
        dishesStore.loadDishes()
    })
</script>

<template>
    <div>
        {{ dishes }}
    </div>
</template>

<style scoped lang="scss">

</style>
