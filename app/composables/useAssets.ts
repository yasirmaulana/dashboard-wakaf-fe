export const useAssets = () => {
    const assets = ref([
        {
            id: '01.01.01.01.001',
            name: 'Kawasaki KLX 150',
            wakif: 'Zaidul Akbar',
            category: 'Kendaraan',
            status: 'Berfungsi',
            value: 35000000,
            condition: 'Baik',
            location: 'Depok',
            lastUpdate: '2024-01-20'
        },
        {
            id: '01.01.01.01.003',
            name: 'Samsung Tablet S6',
            wakif: 'Kolektif',
            category: 'Elektronik',
            status: 'Berfungsi',
            value: 8000000,
            condition: 'Baik',
            location: 'Situdaun',
            lastUpdate: '2024-01-22'
        },
        {
            id: '01.01.02.01.010',
            name: 'Mitsubishi Pajero',
            wakif: 'Dundi',
            category: 'Kendaraan',
            status: 'Dirawat',
            value: 550000000,
            condition: 'Cukup',
            location: 'Depok',
            lastUpdate: '2024-01-25'
        },
        {
            id: '02.01.01.01.005',
            name: 'Tanah Wakaf Situdaun',
            wakif: 'Hj. Syarifah',
            category: 'Properti',
            status: 'Berfungsi',
            value: 2500000000,
            condition: 'Baik',
            location: 'Situdaun',
            lastUpdate: '2023-12-15'
        }
    ])

    const stats = computed(() => {
        const totalValue = assets.value.reduce((acc, curr) => acc + curr.value, 0)
        const totalAssets = assets.value.length
        const goodConditionCount = assets.value.filter(a => a.status === 'Berfungsi').length
        const goodConditionPercent = Math.round((goodConditionCount / totalAssets) * 100)
        const activeWakifCount = new Set(assets.value.map(a => a.wakif)).size

        return {
            totalValue,
            totalAssets,
            goodConditionPercent,
            activeWakifCount
        }
    })

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value)
    }

    return {
        assets,
        stats,
        formatCurrency
    }
}
