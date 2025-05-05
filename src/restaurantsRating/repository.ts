import {connection} from "../repository";
import {RestaurantRating, RestaurantRatingDb} from "./domain";
import {placeholderIds} from "../utils/database";

const getAllRestaurantRatingsByRestaurantIdsMap = async (ids: number[]): Promise<Map<number, RestaurantRating[]>> => {
    const [results] = await connection.execute<RestaurantRatingDb[]>(`SELECT *
                                                                          FROM restaurants_rating
                                                                          WHERE restaurant_id IN (${placeholderIds(ids)})`, ids);

    const ratingsMap = new Map<number, RestaurantRating[]>();

    results.forEach(ratingDb => {
        const rating: RestaurantRating = {
            ratingId: ratingDb.rating_id,
            restaurantId: ratingDb.restaurant_id,
            rating: ratingDb.rating,
        }

        if (ratingsMap.has(rating.restaurantId)) {
            ratingsMap.get(rating.restaurantId)!.push(rating)
        } else {
            ratingsMap.set(rating.restaurantId, [rating])
        }
    })

    return ratingsMap
}

export default {getAllRestaurantRatingsByRestaurantIdsMap}
