import famousReadyTourRatingRepository from '../famousReadyToursRating/repository';
import {calculateAverageRating} from "../utils/calculateAverageRating";

export const getAllRatingsByReadyTourIdsMap = async (ids: number[]) => {
    const ratings = await famousReadyTourRatingRepository.getAllReadyToursRatingsByReadyTourIdsMap(ids);

    return calculateAverageRating(ids, ratings)
}
