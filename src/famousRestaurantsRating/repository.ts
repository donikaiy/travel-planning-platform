import {connection} from "../repository";
import {FamousRestaurantRating, FamousRestaurantRatingDb} from "./domain";
import {placeholderIds} from "../utils/database";

const getAllRestaurantRatingsByRestaurantIdsMap = async (ids: number[]): Promise<Map<number, FamousRestaurantRating[]>> => {
    const [results] = await connection.execute<FamousRestaurantRatingDb[]>(`SELECT *
                                                                          FROM famous_restaurants_rating
                                                                          WHERE restaurant_id IN (${placeholderIds(ids)})`, ids);

    const ratingsMap = new Map<number, FamousRestaurantRating[]>();

    results.forEach(ratingDb => {
        const rating: FamousRestaurantRating = {
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
