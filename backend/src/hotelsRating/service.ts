import hotelRatingRepository from './repository.ts';
import {calculateAverageRating} from "../utils/calculateAverageRating.ts";

export const getAllHotelRatingsByHotelIdMap = async (ids: number[]) => {
    const ratings = await hotelRatingRepository.getAllHotelRatingsByHotelIdMap(ids)

    return calculateAverageRating(ids, ratings)
}
