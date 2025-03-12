import famousHotelRatingRepository from '../famousHotelsRating/repository';
import {calculateAverageRating} from "../utils/calculateAverageRating";

export const getRatingByHotelId = async (ids: number[]) => {
    const ratings = await famousHotelRatingRepository.getAllHotelRatingsByHotelIdMap(ids)

    return calculateAverageRating({ids, ratings})
}
