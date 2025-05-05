import {connection} from "../repository";
import {placeholderIds} from "../utils/database";
import {FamousTourRating, FamousTourRatingDb} from "./domain";

const getAllToursRatingsByTourIdsMap = async (ids: number[]): Promise<Map<number, FamousTourRating[]>> => {
    const [results] = await connection.execute<FamousTourRatingDb[]>(`SELECT * FROM famous_tours_rating WHERE tour_id IN (${placeholderIds(ids)})`, ids);

    const ratingsMap = new Map<number, FamousTourRating[]>();

    results.forEach(ratingDb => {
        const rating: FamousTourRating = {
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
