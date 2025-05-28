import type {Rating} from "../types/rating.d.ts";

export const calculateAverageRating = (ids: number[], ratings: Map<number, Rating[]>)  => {
    const ratingsMap = new Map<number, number>();

    ids.forEach(id => {
        const ratingsList = ratings.get(id) ?? [];
        const totalRating = ratingsList.reduce((sum, rating) => sum + rating.rating, 0);
        const average = ratingsList.length ? totalRating / ratingsList.length : 0;

        ratingsMap.set(id, average)
    })

    return ratingsMap
}
