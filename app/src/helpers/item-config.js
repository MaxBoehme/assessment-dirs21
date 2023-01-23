function enrichItemConfig(config, field, addition) {
    config.itemRows.forEach((itemRow, itemRowIndex) => {
        itemRow.columns.forEach((rowColumn, rowColumnIndex) => {
            if (rowColumn.field === field) {
                config.itemRows[itemRowIndex].columns[rowColumnIndex] = {
                    ...rowColumn,
                    ...addition
                }
            }
        })
    })
    return config
}

export {
    enrichItemConfig
}