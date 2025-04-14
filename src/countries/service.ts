import countryRepository from '../countries/repository';
import {getAllCuisinesByCountryId} from "../cuisine/service";
import {getAllCitiesByCountryId, getCitiesByCountryIdsMap} from "../cities/service";
import {getGalleryImagesByGalleryId} from "../gallery/service";

export const getAllCountries = async () => {
    return countryRepository.getAllCountries()
}

export const getAllCountriesWithCities = async () => {
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
    const [country, cuisines, cities] = await Promise.all([
        countryRepository.getCountryById(countryId),
        getAllCuisinesByCountryId(countryId),
        getAllCitiesByCountryId(countryId)
    ])

    const galleryImages = await getGalleryImagesByGalleryId(country.galleryId);

    return {
        ...country,
        gallery: galleryImages,
        cuisines: cuisines,
        cities: cities,
    };
}

export const checkCountryExists = async (name: string) => {
    return countryRepository.checkCountryExists(name)
}

export const createCountry = async (continentId: number, name: string, galleryId: number, history: string) => {
    return countryRepository.createCountry(continentId, name, galleryId, history)
}
