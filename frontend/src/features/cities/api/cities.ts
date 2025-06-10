import type {City, CityCreate} from "@/features/cities/city";
import axiosInstance from "@/utils/axios.ts";

const getAllCities = async (): Promise<City[]> => {
    try {
        const res = await axiosInstance.get("/cities");

        return res.data
    } catch (err: any) {
        return err.message
    }
}

const createCity = async (countryId: number, name: string, imageUrl: string): Promise<CityCreate> => {
    try {
        const res = await axiosInstance.post(`/cities`, {
            countryId,
            name,
            imageUrl,
        })

        return res.data
    } catch (err: any) {
        return err.message;
    }
}

const updateCityById = async (cityId: number, countryId: number, name: string, imageUrl: string): Promise<City> => {
    try {
        const res = await axiosInstance.put(`/cities`, {
            cityId,
            countryId,
            name,
            imageUrl
        })

        return res.data
    } catch (err: any) {
        return err.message;
    }
}

const deleteCityById = async (cityId: number) => {
    try {
        const res = await axiosInstance.delete(`/cities`, {
            data: {
                cityId
            }
        })

        return res.data
    } catch (err: any) {
        return err.message
    }
}

export const CityService = {
    getAllCities,
    createCity,
    updateCityById,
    deleteCityById
}
