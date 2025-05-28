import type {RowDataPacket} from "mysql2";

export type RestaurantRating = {
    ratingId: number,
    restaurantId: number,
    rating: number,
}

export type RestaurantRatingDb = RowDataPacket & {
    rating_id: number,
    restaurant_id: number,
    rating: number,
}
