import hotelRatingRepository from './/repository';
import {calculateAverageRating} from "../utils/calculateAverageRating";

export const getAllHotelRatingsByHotelIdMap = async (ids: number[]) => {
    const ratings = await hotelRatingRepository.getAllHotelRatingsByHotelIdMap(ids)

    return calculateAverageRating(ids, ratings)
}
