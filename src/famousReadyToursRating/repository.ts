import {connection} from "../repository";
import {FamousReadyTourRating, FamousReadyTourRatingDB} from "./domain";
import {placeholderSingle} from "../utils/database";

const getAllReadyToursRatingByReadyTourId = async (readyTourId: number): Promise<FamousReadyTourRating[]> => {
    const [results] = await connection.execute<FamousReadyTourRatingDB[]>(`SELECT * FROM famous_ready_tours_rating WHERE ready_tour_id = (${placeholderSingle})`, [readyTourId]);
    return results.map(ratingDB => {
        const rating: FamousReadyTourRating = {
            ratingId: ratingDB.rating_id,
            readyTourId: ratingDB.ready_tour_id,
            rating: ratingDB.rating,
        }

        return rating
    })
}

export default {getAllReadyToursRatingByReadyTourId}
