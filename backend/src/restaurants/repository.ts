import type {Restaurant, RestaurantDb} from "./domain.d.ts";
import {connection} from "../repository.ts";
import type {QueryResult, ResultSetHeader} from "mysql2";

export type Filters = {
    cityId?: number,
}

const getAllRestaurants = async (filters: Filters = {}): Promise<Restaurant[]> => {
    let query = 'SELECT * FROM restaurants WHERE 1=1';
    const params: any[] = [];

    if(filters.cityId !== undefined) {
        query += ' AND city_id = ?';
        params.push(filters.cityId);
    }

    const [results] = await connection.query<RestaurantDb[]>(query, params);

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

const checkRestaurantExists = async (name: string, cityId: number): Promise<any> => {
    const [result] = await connection.execute('SELECT EXISTS(SELECT * FROM restaurants WHERE name = ? AND city_id = ?) AS restaurantExists', [name, cityId]);

    return result
}

const createRestaurant = async (cityId: number, name: string, location: string, imageUrl: string, priceSymbols: string): Promise<Restaurant> => {
    const [result] = await connection.execute<ResultSetHeader>('INSERT INTO restaurants (city_id, name, location, image_url, price_symbols) VALUES (?, ?, ?, ?, ?)', [cityId, name, location, imageUrl, priceSymbols]);

    return {
        restaurantId: result.insertId,
        cityId,
        name,
        location,
        imageUrl,
        priceSymbols,
    }
}

const deleteRestaurantById = async (restaurantId: number): Promise<QueryResult> => {
    const [result] = await connection.execute('DELETE FROM restaurants WHERE restaurant_id = ?', [restaurantId]);

    return result
}

const updateRestaurantById = async (restaurantId: number, cityId: number, name: string, location: string, imageUrl: string, priceSymbols: string): Promise<QueryResult> => {
    const [result] = await connection.execute('UPDATE restaurants SET city_id = ?, name = ?, location = ?, image_url = ?, price_symbols = ? WHERE restaurant_id = ?', [cityId, name, location, imageUrl, priceSymbols, restaurantId]);

    return result
}

export default {getAllRestaurants, getRestaurantsByCityId, checkRestaurantExists, createRestaurant, deleteRestaurantById, updateRestaurantById}
