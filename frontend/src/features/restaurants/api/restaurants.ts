import axiosInstance from "@/utils/axios";
import type { RestaurantParamsProps } from "./useRestaurants";
import type {Restaurant, RestaurantCreate, RestaurantWithRating} from "@/features/restaurants/restaurant";


const getAllRestaurants = async (params?: RestaurantParamsProps): Promise<RestaurantWithRating[]> => {
    try {
        const res = await axiosInstance.get('/restaurants', {params});

        return res.data
    } catch (err: any) {
        return err.message;
    }
}

const createRestaurant = async (cityId: number, name: string, location: string, imageUrl: string, priceSymbols: string): Promise<RestaurantCreate> => {
    try {
        const res = await axiosInstance.post(`/restaurants`, {
            cityId,
            name,
            location,
            imageUrl,
            priceSymbols
        })

        return res.data
    } catch (err: any) {
        return err.message;
    }
}

const updateRestaurantById = async (restaurantId: number, cityId: number, name: string, location: string, imageUrl: string, priceSymbols: string): Promise<Restaurant> => {
    try {
        const res = await axiosInstance.put(`/restaurants`, {
            restaurantId,
            cityId,
            name,
            location,
            imageUrl,
            priceSymbols
        })

        return res.data
    } catch (err: any) {
        return err.message;
    }
}

const deleteRestaurantById = async (restaurantId: number) => {
    try {
        const res = await axiosInstance.delete(`/restaurants`, {
            data: {
                restaurantId
            }
        });

        return res.data
    } catch (err: any) {
        return err.message;
    }
}

export const RestaurantService = {
    getAllRestaurants,
    createRestaurant,
    updateRestaurantById,
    deleteRestaurantById
}
