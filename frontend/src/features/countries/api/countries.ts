import axiosInstance from "@/utils/axios.ts";
import type {Country, CountryById, CountryWithCities} from "@/features/countries/country";

const getAllCountries = async (): Promise<Country[]> => {
    try {
        const res = await axiosInstance.get(`/countries?include_cities=false`);

        return res.data
    } catch (err: any) {
        return err.message;
    }
}

const getAllCountriesWithCities = async (): Promise<CountryWithCities[]> => {
    try {
        const res = await axiosInstance.get(`/countries?include_cities=true`);

        return res.data
    } catch (err: any) {
        return err.message;
    }
}

const getCountryById = async (countryId: number): Promise<CountryById> => {
    try {
        const res = await axiosInstance.get(`/countries/${countryId}`)

        return res.data
    } catch (err: any) {
        return err.message;
    }
}

export const CountyService = {
    getAllCountries,
    getAllCountriesWithCities,
    getCountryById,
}
