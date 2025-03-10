import restaurantRepository from '../restaurants/repository';
import {getRatingByRestaurantId} from "../famousRestaurantsRating/service";

export const getAllRestaurants = async () => {
    const restaurants = await restaurantRepository.getAllRestaurants()

    return await Promise.all((restaurants.map(async (restaurant) => {
        const rating = await getRatingByRestaurantId(restaurant.restaurantId)

        return {
            ...restaurant,
            rating: rating
        }
    })))
}
