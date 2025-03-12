import {FamousHotelRating, FamousHotelRatingDB} from "./domain";
import {connection} from "../repository";

const getAllHotelRatingsByHotelIdMap = async (ids: number[]): Promise<Map<number, FamousHotelRating[]>> => {
    const [results] = await connection.query<FamousHotelRatingDB[]>(`SELECT * FROM famous_hotels_rating WHERE hotel_id IN (${ids.join(',')})`);

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
