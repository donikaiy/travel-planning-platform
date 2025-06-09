import cityRepository from "../cities/repository.ts";
import {getAttractionsByCityIdsMap} from "../attractions/service.ts";
import type {CityWithExtras} from "./domain.d.ts";

export const getAllCities = async ({includeAttractions = false}): Promise<CityWithExtras[]> => {
    const cities:CityWithExtras[] = await cityRepository.getAllCities();

    if (includeAttractions) {
        const cityIds = cities.map((city) => city.cityId);
        const attractionsMap = await getAttractionsByCityIdsMap(cityIds);

        cities.forEach((city) => {
            city.attractions = attractionsMap.get(city.cityId) || [];
        });
    }

    return cities;
}

export const getCityById = async (cityId: number) => {
    return cityRepository.getCityById(cityId)
}

export const checkCityExists = async (name: string) => {
    return cityRepository.checkCityExists(name)
}

export const createCity = async (countryId: number, name: string, imageUrl: string) => {
    return cityRepository.createCity(countryId, name, imageUrl)
}

export const getAllCitiesByCountryId = async (countryId: number) => {
    const countryCities = await cityRepository.getAllCitiesByCountryId(countryId)

    const cityIds: number[] = countryCities.map(countryCity => countryCity.cityId)

    return getCitiesByIds(cityIds)
}

export const getCitiesByIds = async (ids: number[]) => {
    return cityRepository.getCitiesByIds(ids)
}

export const getCitiesByCountryIdsMap = async (ids: number[]) => {
    return cityRepository.getCitiesByCountryIdsMap(ids)
}

export const deleteCityById = async (cityId: number) => {
    return cityRepository.deleteCityById(cityId)
}

export const updateCityById = async (cityId: number, countryId: number, name: string, imageUrl: string) => {
    return cityRepository.updateCityById(cityId, countryId, name, imageUrl)
}
