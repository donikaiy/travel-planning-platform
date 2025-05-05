import tourRatingRepository from './/repository';
import {calculateAverageRating} from "../utils/calculateAverageRating";

export const getAllRatingsByTourIdsMap = async (ids: number[]) => {
    const ratings = await tourRatingRepository.getAllToursRatingsByTourIdsMap(ids);

    return calculateAverageRating(ids, ratings)
}
