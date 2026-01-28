export const useAssetCode = () => {
    const generateCode = (category: string, subCategory: string, index: number, year: number) => {
        const cat = category.padStart(2, '0')
        const sub = subCategory.padStart(2, '0')
        const idx = index.toString().padStart(3, '0')
        const yr = year.toString().slice(-2)

        return `${cat}.${sub}.01.01.${idx}/${yr}/01`
    }

    return {
        generateCode
    }
}
