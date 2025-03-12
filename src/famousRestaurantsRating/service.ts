import famousRestaurantRatingRepository from '../famousRestaurantsRating/repository';
import {calculateAverageRating} from "../utils/calculateAverageRating";

export const getRatingsByRestaurantIdsMap = async (ids: number[]) => {
    const ratings = await famousRestaurantRatingRepository.getAllRestaurantRatingsByRestaurantIdsMap(ids)

    return calculateAverageRating({ids, ratings})
}
