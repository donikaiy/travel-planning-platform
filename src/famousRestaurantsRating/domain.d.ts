import {RowDataPacket} from "mysql2";

export type FamousRestaurantRating = {
    ratingId: number,
    restaurantId: number,
    rating: number,
}

export type FamousRestaurantRatingDb = RowDataPacket & {
    rating_id: number,
    restaurant_id: number,
    rating: number,
}
