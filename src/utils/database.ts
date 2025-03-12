export const placeholderSingle = '?'

export const placeholderIds= (ids: number[]) => {
    return ids.map(() => '?').join(',');
}
