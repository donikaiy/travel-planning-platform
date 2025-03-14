import countryRepository from '../countries/repository';
import {getAllCuisinesByCountryId} from "../cuisine/service";
import {getAllCitiesByCountryId} from "../countryCities/service";

export const getAllCountries = async () => {
    return countryRepository.getAllCountries()
}

export const getCountriesByContinentIdsMap = async (ids: number[]) => {
    return countryRepository.getCountriesByContinentIdsMap(ids)
}

export const getCountryById = async (countryId: number) => {
    const [country, cuisine, cities] = await Promise.all([
        countryRepository.getCountryById(countryId),
        getAllCuisinesByCountryId(countryId),
        getAllCitiesByCountryId(countryId)
    ])

    return {country: country, cuisine: cuisine, cities: cities}
}

export const checkCountryExists = async (name: string) => {
    return countryRepository.checkCountryExists(name)
}

export const createCountry = async (continentId: number, name: string, galleryId: number, history: string) => {
    return countryRepository.createCountry(continentId, name, galleryId, history)
}
