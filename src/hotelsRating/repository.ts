import {hotelRating, hotelRatingDb} from "./domain";
import {connection} from "../repository";
import {placeholderIds} from "../utils/database";

const getAllHotelRatingsByHotelIdMap = async (ids: number[]): Promise<Map<number, hotelRating[]>> => {
    const [results] = await connection.execute<hotelRatingDb[]>(`SELECT * FROM hotels_rating WHERE hotel_id IN (${placeholderIds(ids)})`, ids);

    const ratingsMap = new Map<number, hotelRating[]>();

    results.forEach(ratingDb => {
        const rating: hotelRating = {
            ratingId: ratingDb.rating_id,
            hotelId: ratingDb.hotel_id,
            rating: ratingDb.rating,
        }

        if (ratingsMap.has(rating.hotelId)) {
            ratingsMap.get(rating.hotelId)!.push(rating)
        } else {
            ratingsMap.set(rating.hotelId, [rating])
        }
    })

    return ratingsMap;
}

export default {getAllHotelRatingsByHotelIdMap}
