import {RowDataPacket} from "mysql2";

export type FamousTourRating = {
    ratingId: number,
    tourId: number,
    rating: number,
}

export type FamousTourRatingDb = RowDataPacket & {
    rating_id: number,
    tour_id: number,
    rating: number,
}
