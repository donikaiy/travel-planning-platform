import {connection} from "../repository";
import {FamousRestaurantRating, FamousRestaurantRatingDB} from "./domain";

const getAllRestaurantRatingsByRestaurantIdsMap = async (ids: number[]): Promise<Map<number, FamousRestaurantRating[]>> => {
    const [results] = await connection.query<FamousRestaurantRatingDB[]>(`SELECT *
                                                                          FROM famous_restaurants_rating                                                              WHERE restaurant_id IN (${ids.join(',')})`);

    const ratingsMap = new Map<number, FamousRestaurantRating[]>();

    results.forEach(ratingDB => {
        const rating: FamousRestaurantRating = {
            ratingId: ratingDB.rating_id,
            restaurantId: ratingDB.restaurant_id,
            rating: ratingDB.rating,
        }

        if(ratingsMap.has(rating.restaurantId)) {
            ratingsMap.get(rating.restaurantId)!.push(rating)
        } else {
            ratingsMap.set(rating.restaurantId, [rating])
        }
    })

    return ratingsMap
}

export default {getAllRestaurantRatingsByRestaurantIdsMap}
