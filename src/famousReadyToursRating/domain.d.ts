import {RowDataPacket} from "mysql2";

export type FamousReadyTourRating = {
    ratingId: number,
    readyTourId: number,
    rating: number,
}

export type FamousReadyTourRatingDB = RowDataPacket & {
    rating_id: number,
    ready_tour_id: number,
    rating: number,
}
