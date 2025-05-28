import tourRatingRepository from './repository.ts';
import {calculateAverageRating} from "../utils/calculateAverageRating.ts";

export const getAllRatingsByTourIdsMap = async (ids: number[]) => {
    const ratings = await tourRatingRepository.getAllToursRatingsByTourIdsMap(ids);

    return calculateAverageRating(ids, ratings)
}
