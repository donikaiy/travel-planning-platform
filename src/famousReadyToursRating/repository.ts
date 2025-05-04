import {connection} from "../repository";
import {FamousReadyTourRating, FamousReadyTourRatingDB} from "./domain";
import {placeholderIds} from "../utils/database";

const getAllReadyToursRatingsByReadyTourIdsMap = async (ids: number[]): Promise<Map<number, FamousReadyTourRating[]>> => {
    const [results] = await connection.execute<FamousReadyTourRatingDB[]>(`SELECT * FROM famous_ready_tours_rating WHERE ready_tour_id IN (${placeholderIds(ids)})`, ids);

    const ratingsMap = new Map<number, FamousReadyTourRating[]>();

    results.forEach(ratingDB => {
        const rating: FamousReadyTourRating = {
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

export default {getAllReadyToursRatingsByReadyTourIdsMap}
