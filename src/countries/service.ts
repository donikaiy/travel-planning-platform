import countryRepository from '../countries/repository';
import {getAllCuisinesByCountryId} from "../cuisine/service";
import {getAllCitiesByCountryId} from "../countryCities/service";

export const getAllCountries = async () => {
    return await countryRepository.getAllCountries()
}

export const getCountryById = async (countryId: number) => {
    const country = await countryRepository.getCountryById(countryId)
    const cuisine = await getAllCuisinesByCountryId(countryId)
    const cities = await getAllCitiesByCountryId(countryId)

    return {country: country, cuisine: cuisine, cities: cities}
}

export const checkCountryExists = async (name: string) => {
    return await countryRepository.checkCountryExists(name)
}

export const createCountry = async (continentId: number, name: string, galleryId: number, history: string) => {
    return await countryRepository.createCountry(continentId, name, galleryId, history)
}
