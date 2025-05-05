import restaurantRatingRepository from './/repository';
import {calculateAverageRating} from "../utils/calculateAverageRating";

export const getAllRatingsByRestaurantIdsMap = async (ids: number[]) => {
    const ratings = await restaurantRatingRepository.getAllRestaurantRatingsByRestaurantIdsMap(ids)

    return calculateAverageRating(ids, ratings)
}
