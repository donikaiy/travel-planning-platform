import {connection} from "../repository";
import {FamousRestaurantRating, FamousRestaurantRatingDB} from "./domain";

const getAllRestaurantRatingsByRestaurantId = async (restaurantId: number): Promise<FamousRestaurantRating[]> => {
    const [results] = await connection.query<FamousRestaurantRatingDB[]>(`SELECT * FROM famous_restaurants_rating WHERE restaurant_id = ?`, [restaurantId]);
    return results.map(ratingDB => {
        const rating: FamousRestaurantRating = {
            ratingId: ratingDB.rating_id,
            restaurantId: ratingDB.restaurant_id,
            rating: ratingDB.rating,
        }

        return rating
    })
}

export default {getAllRestaurantRatingsByRestaurantId}
