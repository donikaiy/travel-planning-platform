import countryRepository from '../countries/repository';
import {getAllCuisinesByCountryId} from "../cuisine/service";
import {getAllCitiesByCountryId} from "../countryCities/service";
import {getCitiesByCountryIdsMap} from "../cities/service";

export const getAllCountries = async () => {
    const countries = await countryRepository.getAllCountries()

    const countryIds = countries.map(country => country.countryId)

    const citiesMap = await getCitiesByCountryIdsMap(countryIds);

    return countries.map(country => {
        return {
            ...country,
            cities: citiesMap.get(country.countryId) || []
        }
    })
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
