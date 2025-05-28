import {connection} from "../repository.ts";
import {placeholderIds} from "../utils/database.ts";
import type {TourRating, TourRatingDb} from "./domain.d.ts";

const getAllToursRatingsByTourIdsMap = async (ids: number[]): Promise<Map<number, TourRating[]>> => {
    const [results] = await connection.execute<TourRatingDb[]>(`SELECT * FROM tours_rating WHERE tour_id IN (${placeholderIds(ids)})`, ids);

    const ratingsMap = new Map<number, TourRating[]>();

    results.forEach(ratingDb => {
        const rating: TourRating = {
            ratingId: ratingDb.rating_id,
            tourId: ratingDb.tour_id,
            rating: ratingDb.rating,
        }

        if (ratingsMap.has(rating.tourId)) {
            ratingsMap.get(rating.tourId)!.push(rating)
        } else {
            ratingsMap.set(rating.tourId, [rating])
        }
    })

    return ratingsMap
}

export default {getAllToursRatingsByTourIdsMap}
