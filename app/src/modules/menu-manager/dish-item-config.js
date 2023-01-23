const dishItemConfig = {
    itemRows: [
        {
            columns: [
                {
                    name: 'name',
                    field: 'name',
                    style: {
                        width: '250px',
                        ['padding-left']: '6px',
                        ['margin-right']: '10px'
                    }
                },
                {
                    name: 'price',
                    field: 'price',
                    style: {
                        width: '40px',
                        ['text-align']: 'right',
                        ['margin-right']: '10px'
                    }
                },
                {
                    name: 'category',
                    field: 'category',
                    style: {
                        width: '70px',
                        ['margin-right']: '10px'
                    }
                },
                {
                    name: 'isActive',
                    field: 'isActive',
                    style: {
                        width: '60px'
                    }
                },
                {
                    name: 'waitingTime',
                    field: 'waitingTime',
                    style: {
                        width: '70px',
                        ['padding-right']: '6px'
                    }
                }
            ]
        },
        {
            columns: [
                {
                    name: 'description',
                    field: 'description',
                    style: {
                        width: '100%',
                        ['padding-left']: '6px',
                        ['padding-right']: '6px'
                    }
                }
            ]
        },
        {
            columns: [
                {
                    name: 'availability',
                    field: 'availability',
                    style: {
                        ['padding-left']: '6px'
                    }
                }
            ]
        }
    ]
}

export {
    dishItemConfig
}