import type {RowDataPacket} from "mysql2";

export type HotelRating = {
    ratingId: number,
    hotelId: number,
    rating: number,
}

export type HotelRatingDb = RowDataPacket & {
    rating_id: number,
    hotel_id: number,
    rating: number,
}
