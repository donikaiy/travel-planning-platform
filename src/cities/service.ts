import cityRepository from "../cities/repository";

export const getAllCities = async () => {
    return cityRepository.getAllCities()
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
