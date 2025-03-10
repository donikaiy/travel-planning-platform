import cityRepository from "../cities/repository";

export const getAllCities = async () => {
    return await cityRepository.getAllCities()
}

export const getCityById = async (cityId: number) => {
    return await cityRepository.getCityById(cityId)
}

export const checkCityExists = async (name: string) => {
    return await cityRepository.checkCityExists(name)
}

export const createCity = async (countryId: number, name: string) => {
    return await cityRepository.createCity(countryId, name)
}

export const getCitiesByIds = async (ids: number[]) => {
    return await cityRepository.getCitiesByIds(ids)
}
