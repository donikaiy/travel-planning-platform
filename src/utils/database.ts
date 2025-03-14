export const placeholderIds= (ids: number[]) => {
    if (ids.length === 0) {
        return null
    }

    return ids.map(() => '?').join(',');
}
