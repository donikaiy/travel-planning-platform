import {RowDataPacket} from "mysql2";

export type TourRating = {
    ratingId: number,
    tourId: number,
    rating: number,
}

export type TourRatingDb = RowDataPacket & {
    rating_id: number,
    tour_id: number,
    rating: number,
}
