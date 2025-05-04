import {Restaurant, RestaurantDB} from "./domain";
import {connection} from "../repository";

const getAllRestaurants = async (): Promise<Restaurant[]> => {
    const [results] = await connection.query<RestaurantDB[]>('SELECT * FROM restaurants');
    return results.map(restaurantDB => {
        const restaurant: Restaurant = {
            restaurantId: restaurantDB.restaurant_id,
            cityId: restaurantDB.city_id,
            name: restaurantDB.name,
            location: restaurantDB.location,
            imageUrl: restaurantDB.image_url,
            priceSymbols: restaurantDB.price_symbols,
        }

        return restaurant
    })
}

const getRestaurantsByCityId = async (cityId: number): Promise<Restaurant[]> => {
    const [results] = await connection.execute<RestaurantDB[]>('SELECT * FROM restaurants WHERE city_id = ?', [cityId]);
    return results.map(restaurantDB => {
        const restaurant: Restaurant = {
            restaurantId: restaurantDB.restaurant_id,
            cityId: restaurantDB.city_id,
            name: restaurantDB.name,
            location: restaurantDB.location,
            imageUrl: restaurantDB.image_url,
            priceSymbols: restaurantDB.price_symbols,
        }

        return restaurant
    })
}

export default {getAllRestaurants, getRestaurantsByCityId}
