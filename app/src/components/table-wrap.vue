<script setup>
    import { defineProps } from 'vue'

    const props = defineProps(['tableConfig'])

    function sortColumn(column) {
        if (props.tableConfig.sortable && props.tableConfig.sortFunction) {
            props.tableConfig.sortFunction(column)
        }
    }
</script>

<template>
    <div class="table-wrap"
    >
        <div class="table-head"
        >
            <div v-for="column in props.tableConfig.itemRows[0].columns"
                class="column"
                :class="{
                    sortable: props.tableConfig.sortable
                }"
                :style="column.style"
                @click="() => sortColumn(column)"
            >
                {{ column.name }}
            </div>
        </div>
        <div class="table-body"
        >
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .table-wrap {
        width: 100%;
        display: flex;
        flex-direction: column;

        .table-head {
            display: flex;
            line-height: var(--font-size-l);
            border-bottom: var(--border-width-m) solid var(--primary);
        }

        .table-body {
            display: flex;
            flex-direction: column;
        }

        .column {
            flex-grow: 1;

            &.sortable {
                cursor: pointer;

                &:hover {
                    background-color: var(--secondary);
                }
            }
        }
    }
</style>
