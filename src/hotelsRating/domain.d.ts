import {RowDataPacket} from "mysql2";

export type hotelRating = {
    ratingId: number,
    hotelId: number,
    rating: number,
}

export type hotelRatingDb = RowDataPacket & {
    rating_id: number,
    hotel_id: number,
    rating: number,
}
