import restaurantRepository from '../restaurants/repository';
import {getRatingsByRestaurantIdsMap} from "../famousRestaurantsRating/service";

export const getAllRestaurants = async () => {
    const restaurants = await restaurantRepository.getAllRestaurants()

    const restaurantIds = restaurants.map(restaurant => restaurant.restaurantId)

    const rating = await getRatingsByRestaurantIdsMap(restaurantIds)

    return restaurants.map(restaurant => {
        return {
            ...restaurant,
            rating: rating.get(restaurant.restaurantId) || []
        }
    })
}

export const getRestaurantsByCityId = async (cityId: number) => {
    return restaurantRepository.getRestaurantsByCityId(cityId)
}
