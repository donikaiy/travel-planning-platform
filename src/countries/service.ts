import countryRepository from '../countries/repository';
import {getAllCuisinesByCountryId} from "../cuisine/service";
import {getAllCitiesByCountryId, getCitiesByCountryIdsMap} from "../cities/service";
import {getGalleryImagesByGalleryId} from "../gallery/service";
import {CountryWithExtras} from "./domain";

export const getAllCountries = async ({includeCities = false}): Promise<CountryWithExtras[]> => {
    const countries: CountryWithExtras[] = await countryRepository.getAllCountries()

    if (includeCities) {
        const countryIds = countries.map(country => country.countryId)

        const citiesMap = await getCitiesByCountryIdsMap(countryIds);

        countries.forEach(country => {
            country.cities = citiesMap.get(country.countryId) || []
        })
    }

    return countries
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
