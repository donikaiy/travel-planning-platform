import {FamousHotelRating, FamousHotelRatingDB} from "./domain";
import {connection} from "../repository";

const getAllHotelRatingsByHotelId = async (hotelId: number): Promise<FamousHotelRating[]> => {
    const [results] = await connection.query<FamousHotelRatingDB[]>('SELECT * FROM famous_hotels_rating WHERE hotel_id = ?', [hotelId]);
    return results.map(ratingDB => {
        const rating: FamousHotelRating = {
            ratingId: ratingDB.rating_id,
            hotelId: ratingDB.hotel_id,
            rating: ratingDB.rating,
        }

        return rating
    })
}

export default {getAllHotelRatingsByHotelId}
