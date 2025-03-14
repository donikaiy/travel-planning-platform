import {FamousHotelRating, FamousHotelRatingDB} from "./domain";
import {connection} from "../repository";
import {placeholderIds} from "../utils/database";

const getAllHotelRatingsByHotelIdMap = async (ids: number[]): Promise<Map<number, FamousHotelRating[]>> => {
    if (ids.length === 0) {
        console.error('No hotel IDs provided.');
        return new Map();
    }

    const [results] = await connection.execute<FamousHotelRatingDB[]>(`SELECT * FROM famous_hotels_rating WHERE hotel_id IN (${placeholderIds(ids)})`, ids);

    const ratingsMap = new Map<number, FamousHotelRating[]>();

    results.forEach(ratingDB => {
        const rating: FamousHotelRating = {
            ratingId: ratingDB.rating_id,
            hotelId: ratingDB.hotel_id,
            rating: ratingDB.rating,
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
