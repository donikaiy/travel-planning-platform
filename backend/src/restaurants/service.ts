import restaurantRepository from './repository.ts';
import type {Filters} from './repository.js';
import {getAllRatingsByRestaurantIdsMap} from "../restaurantsRating/service.ts";

export const getAllRestaurants = async (filters: Filters) => {
    const restaurants = await restaurantRepository.getAllRestaurants(filters)

    const restaurantIds = restaurants.map(restaurant => restaurant.restaurantId)

    const rating = await getAllRatingsByRestaurantIdsMap(restaurantIds)

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
