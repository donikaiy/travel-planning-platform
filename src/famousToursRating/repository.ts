import {connection} from "../repository";
import {placeholderIds} from "../utils/database";
import {FamousTourRating, FamousTourRatingDB} from "./domain";

const getAllToursRatingsByTourIdsMap = async (ids: number[]): Promise<Map<number, FamousTourRating[]>> => {
    const [results] = await connection.execute<FamousTourRatingDB[]>(`SELECT * FROM famous_tours_rating WHERE tour_id IN (${placeholderIds(ids)})`, ids);

    const ratingsMap = new Map<number, FamousTourRating[]>();

    results.forEach(ratingDB => {
        const rating: FamousTourRating = {
            ratingId: ratingDB.rating_id,
            tourId: ratingDB.tour_id,
            rating: ratingDB.rating,
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
