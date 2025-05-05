import {FamousHotelRating, FamousHotelRatingDb} from "./domain";
import {connection} from "../repository";
import {placeholderIds} from "../utils/database";

const getAllHotelRatingsByHotelIdMap = async (ids: number[]): Promise<Map<number, FamousHotelRating[]>> => {
    const [results] = await connection.execute<FamousHotelRatingDb[]>(`SELECT * FROM famous_hotels_rating WHERE hotel_id IN (${placeholderIds(ids)})`, ids);

    const ratingsMap = new Map<number, FamousHotelRating[]>();

    results.forEach(ratingDb => {
        const rating: FamousHotelRating = {
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
