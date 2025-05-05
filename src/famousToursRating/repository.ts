import {connection} from "../repository";
import {placeholderIds} from "../utils/database";
import {FamousTourRating, FamousTourRatingDB} from "./domain";

const getAllToursRatingsByTourIdsMap = async (ids: number[]): Promise<Map<number, FamousTourRating[]>> => {
    const [results] = await connection.execute<FamousTourRatingDB[]>(`SELECT * FROM famous_ready_tours_rating WHERE ready_tour_id IN (${placeholderIds(ids)})`, ids);

    const ratingsMap = new Map<number, FamousTourRating[]>();

    results.forEach(ratingDB => {
        const rating: FamousTourRating = {
            ratingId: ratingDB.rating_id,
            readyTourId: ratingDB.ready_tour_id,
            rating: ratingDB.rating,
        }

        if (ratingsMap.has(rating.readyTourId)) {
            ratingsMap.get(rating.readyTourId)!.push(rating)
        } else {
            ratingsMap.set(rating.readyTourId, [rating])
        }
    })

    return ratingsMap
}

export default {getAllToursRatingsByTourIdsMap}
