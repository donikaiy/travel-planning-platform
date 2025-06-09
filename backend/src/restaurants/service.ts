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

export const checkRestaurantExists = async (name: string, cityId: number) => {
    return restaurantRepository.checkRestaurantExists(name, cityId)
}

export const createRestaurant = async (cityId: number, name: string, location: string, imageUrl: string, priceSymbols: string) => {
    return restaurantRepository.createRestaurant(cityId, name, location, imageUrl, priceSymbols)
}

export const deleteRestaurantById = async (restaurantId: number) => {
    return restaurantRepository.deleteRestaurantById(restaurantId)
}

export const updateRestaurantById = async (restaurantId: number, cityId: number, name: string, location: string, imageUrl: string, priceSymbols: string) => {
    return restaurantRepository.updateRestaurantById(restaurantId, cityId, name, location, imageUrl, priceSymbols)
}
