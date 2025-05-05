import {RowDataPacket} from "mysql2";

export type FamousTourRating = {
    ratingId: number,
    readyTourId: number,
    rating: number,
}

export type FamousTourRatingDB = RowDataPacket & {
    rating_id: number,
    ready_tour_id: number,
    rating: number,
}
