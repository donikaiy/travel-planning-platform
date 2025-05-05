import {Restaurant, RestaurantDb} from "./domain";
import {connection} from "../repository";

const getAllRestaurants = async (): Promise<Restaurant[]> => {
    const [results] = await connection.query<RestaurantDb[]>('SELECT * FROM restaurants');

    return results.map(restaurantDb => {
        const restaurant: Restaurant = {
            restaurantId: restaurantDb.restaurant_id,
            cityId: restaurantDb.city_id,
            name: restaurantDb.name,
            location: restaurantDb.location,
            imageUrl: restaurantDb.image_url,
            priceSymbols: restaurantDb.price_symbols,
        }

        return restaurant
    })
}

const getRestaurantsByCityId = async (cityId: number): Promise<Restaurant[]> => {
    const [results] = await connection.execute<RestaurantDb[]>('SELECT * FROM restaurants WHERE city_id = ?', [cityId]);

    return results.map(restaurantDb => {
        const restaurant: Restaurant = {
            restaurantId: restaurantDb.restaurant_id,
            cityId: restaurantDb.city_id,
            name: restaurantDb.name,
            location: restaurantDb.location,
            imageUrl: restaurantDb.image_url,
            priceSymbols: restaurantDb.price_symbols,
        }

        return restaurant
    })
}

export default {getAllRestaurants, getRestaurantsByCityId}
