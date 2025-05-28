import restaurantRatingRepository from './repository.ts';
import {calculateAverageRating} from "../utils/calculateAverageRating.ts";

export const getAllRatingsByRestaurantIdsMap = async (ids: number[]) => {
    const ratings = await restaurantRatingRepository.getAllRestaurantRatingsByRestaurantIdsMap(ids)

    return calculateAverageRating(ids, ratings)
}
