import famousTourRatingRepository from './/repository';
import {calculateAverageRating} from "../utils/calculateAverageRating";

export const getAllRatingsByTourIdsMap = async (ids: number[]) => {
    const ratings = await famousTourRatingRepository.getAllToursRatingsByTourIdsMap(ids);

    return calculateAverageRating(ids, ratings)
}
