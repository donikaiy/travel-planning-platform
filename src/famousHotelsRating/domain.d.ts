import {RowDataPacket} from "mysql2";

export type FamousHotelRating = {
    ratingId: number,
    hotelId: number,
    rating: number,
}

export type FamousHotelRatingDB = RowDataPacket & {
    rating_id: number,
    hotel_id: number,
    rating: number,
}
